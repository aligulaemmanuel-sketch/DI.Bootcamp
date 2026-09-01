-- Enums for roles and status
CREATE TYPE user_role AS ENUM (
    'Admin', 'Investor', 'Manager', 'Coach', 'Community & Fans'
);

CREATE TYPE approval_status AS ENUM ('Pending', 'Approved', 'Rejected');

-- 1. Users & Profiles
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'Community & Fans',
    lane VARCHAR(50) NOT NULL DEFAULT 'All',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Groups (e.g., Teams, Event Groups)
CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Group Approvals (Pending Member Requests)
CREATE TABLE group_approvals (
    approval_id SERIAL PRIMARY KEY,
    group_id INT REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    status approval_status DEFAULT 'Pending',
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Attendance Tracking (For Live Overview Metrics)
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    group_id INT REFERENCES groups(group_id) ON DELETE CASCADE,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_present BOOLEAN NOT NULL DEFAULT FALSE
);

-- 5. Notices (Group & Public)
CREATE TABLE notices (
    notice_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    group_id INT REFERENCES groups(group_id) ON DELETE CASCADE,
    author_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Media & Galleries (Photo & Group Galleries)
CREATE TABLE media_gallery (
    media_id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    file_url TEXT NOT NULL,
    group_id INT REFERENCES groups(group_id) ON DELETE CASCADE,
    uploaded_by INT REFERENCES users(user_id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
