require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const roleMap = {
  admin: 'Admin',
  investor: 'Investor',
  manager: 'Manager',
  coach: 'Coach',
  fans: 'CommunityFans'
};

function publicUser(user) {
  return {
    name: user.fullName,
    email: user.email,
    role: Object.keys(roleMap).find((key) => roleMap[key] === user.role) || 'fans',
    lane: user.lane,
    status: user.isVerified ? 'approved' : 'pending'
  };
}

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'fans', lane = 'All' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required.' });
    if (!roleMap[role] || role === 'admin' || role === 'investor') return res.status(403).json({ error: 'That role cannot be created from public signup.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { fullName: name.trim(), email: email.trim().toLowerCase(), passwordHash, role: roleMap[role], lane, isVerified: true }
    });
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 'P2002') return res.status(409).json({ error: 'An account with that email already exists.' });
    console.error(error);
    res.status(500).json({ error: 'Unable to create account.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Invalid email or password.' });
    if (!user.isVerified) return res.status(403).json({ error: 'This account is awaiting approval.' });
    res.json({ user: publicUser(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to sign in.' });
  }
});

app.use((req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => console.log(`RYSA server running at http://localhost:${port}`));
