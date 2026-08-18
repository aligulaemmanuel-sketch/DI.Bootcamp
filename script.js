const appState = {
  role: 'admin',
  managerStation: 'Education',
  galleryGroup: 'Education',
  loggedIn: false,
  authMode: 'signin',
  currentUser: null,
  currentSection: 'dashboard',
  showLanding: true
};

const groupNotifications = {
  Education: {
    title: 'Education Group',
    header: 'Learning and mentoring schedule',
    items: [
      { action: 'Mentor training', date: '2026-08-25', note: 'Volunteer tutor onboarding at Huruma hub' },
      { action: 'School support day', date: '2026-08-29', note: 'Reading and homework support for 60 youth' },
      { action: 'Parent engagement', date: '2026-09-02', note: 'Progress review and family workshop' }
    ]
  },
  Sports: {
    title: 'Sports Group',
    header: 'Games and fitness updates',
    items: [
      { action: 'Training session', date: '2026-08-23', note: 'Football drills and team conditioning' },
      { action: 'Mini tournament', date: '2026-08-30', note: 'Inter-village friendly match at Kware field' },
      { action: 'Equipment check', date: '2026-09-04', note: 'Kits and safety review before weekend matches' }
    ]
  },
  Community: {
    title: 'Community Group',
    header: 'Volunteer and outreach activities',
    items: [
      { action: 'Cleanup drive', date: '2026-08-26', note: 'Neighborhood sanitation and youth engagement' },
      { action: 'Volunteer induction', date: '2026-08-28', note: 'Orientation for new community leaders' },
      { action: 'Outreach day', date: '2026-09-01', note: 'Parent and caregiver meeting in three villages' }
    ]
  },
  Psychology: {
    title: 'Psychology Group',
    header: 'Wellbeing support schedule',
    items: [
      { action: 'Support check-in', date: '2026-08-24', note: 'Case review and counseling session follow-up' },
      { action: 'School referral clinic', date: '2026-08-31', note: 'Behavior and emotional health consultation' },
      { action: 'Caregiver workshop', date: '2026-09-05', note: 'Family support and trauma response briefing' }
    ]
  }
};

const publicNotifications = [
  { title: 'Community open day', date: '2026-08-27', detail: 'RYSA will host an open day for parents, partners, and local leaders to review youth progress.' },
  { title: 'Volunteer call', date: '2026-08-30', detail: 'We are inviting volunteers to support sports, education, and wellbeing outreach activities.' },
  { title: 'Youth leadership forum', date: '2026-09-07', detail: 'Young leaders will share feedback, success stories, and community action ideas.' },
  { title: 'Fundraiser drive', date: '2026-09-10', detail: 'A public fundraising campaign will help expand equipment, mentoring, and school-support programs.' }
];

const investorSecurity = {
  overview: {
    funded: 'KSh 18.4M',
    pipeline: 'KSh 5.2M',
    compliance: 'Fully reviewed',
    reports: 'Quarterly-ready'
  },
  items: [
    { title: 'Identity verification', detail: 'Sponsor identity and KYC checks completed before access to investor portal.', status: 'Verified' },
    { title: 'Funding controls', detail: 'Approval flows require dual authorization for large transfers and program funds.', status: 'Protected' },
    { title: 'Document security', detail: 'Financial reports and signed agreements are encrypted and role-restricted.', status: 'Encrypted' },
    { title: 'Compliance check', detail: 'Reports are aligned with donor, audit, and governance requirements.', status: 'Current' }
  ],
  contacts: [
    { name: 'Investor relations', value: 'investors@rysa.org' },
    { name: 'Security desk', value: '+254 712 442 337' },
    { name: 'Board approval', value: 'Quarterly review • next: 2026-09-15' }
  ]
};

const USERS_KEY = 'rysa-users';
const REMEMBERED_MEMBER_KEY = 'rysa-remembered-member';
const GROUP_MEMBERS_KEY = 'rysa-group-members';
const GROUP_EVENTS_KEY = 'rysa-group-events';
const GROUP_PHOTOS_KEY = 'rysa-group-photos';
const REPORTS_KEY = 'rysa-reports';
const DRIVE_PHOTOS_KEY = 'rysa-drive-photos';
const ARCHIVES_KEY = 'rysa-archives';
const GROUP_NAMES = ['Education', 'Sports', 'Community', 'Psychology', 'Event Group'];

const landingScreen = document.getElementById('landing-screen');
const loginScreen = document.getElementById('login-screen');
const appShell = document.getElementById('app-shell');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupRole = document.getElementById('signup-role');
const signupLane = document.getElementById('signup-lane');
const signupPassword = document.getElementById('signup-password');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const rememberMemberCheckbox = document.getElementById('remember-member');
const logoutButton = document.getElementById('logout-button');
const signinPanel = document.getElementById('signin-panel');
const signupPanel = document.getElementById('signup-panel');
const authTabs = document.querySelectorAll('.auth-tab');
const socialButtons = document.querySelectorAll('.social-button');
const resetpwEmailForm = document.getElementById('resetpw-email-form');
const resetpwForm = document.getElementById('resetpw-form');
const resetpwEmail = document.getElementById('resetpw-email');
const resetpwNewPassword = document.getElementById('resetpw-new-password');
const resetpwConfirmPassword = document.getElementById('resetpw-confirm-password');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToSigninLink = document.getElementById('back-to-signin-link');

const data = {
  admin: {
    title: 'RYSA Executive Dashboard',
    user: 'Program Administrator',
    stats: [
      { label: 'Active youth', value: '640', trend: '+12% vs last term' },
      { label: 'Avg. attendance', value: '82%', trend: '+4% vs baseline' },
      { label: 'Open alerts', value: '07', trend: '3 require review' },
      { label: 'Programs running', value: '18', trend: '2 new this month' }
    ],
    alert: {
      title: 'Education attendance drop in Huruma',
      text: 'Huruma is trending 6% below the expected attendance baseline. This is the clearest operational risk for the current term.',
      action: 'Review detail'
    },
    stations: [
      { name: 'Education', youth: 210, attendance: 79, progress: 79 },
      { name: 'Sports', youth: 178, attendance: 88, progress: 88 },
      { name: 'Community', youth: 132, attendance: 84, progress: 84 },
      { name: 'Psychology', youth: 120, attendance: 81, progress: 81 }
    ],
    issues: [
      { item: 'Huruma Tutor gap', detail: '1 tutor missing for two sessions', tag: 'warning' },
      { item: 'Equipment check', detail: '3 sports kits below minimum', tag: 'neutral' },
      { item: 'Mentoring follow-up', detail: '12 youth need case review', tag: 'success' }
    ],
    chart: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [62, 69, 67, 74, 80, 82] }
  },
  manager: {
    title: 'Station Manager Dashboard',
    user: 'Program Manager',
    stations: ['Education', 'Sports', 'Community', 'Psychology'],
    profiles: {
      Education: {
        title: 'Education Station',
        stats: [
          { label: 'Enrolled', value: '210', trend: '+18 this term' },
          { label: 'Attendance', value: '79%', trend: '-6% in Huruma' },
          { label: 'Tutors', value: '12', trend: '1 vacancy' },
          { label: 'Completion', value: '68%', trend: '+5% from last term' }
        ],
        alert: {
          title: 'Huruma education attendance decline',
          text: 'The Huruma cluster is below target for the last three monitoring periods. This needs a follow-up on tutor coverage and family engagement.',
          action: 'Open drilldown'
        },
        chart: { labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], values: [88, 86, 80, 78, 74, 79] },
        highlights: [
          { label: 'Training hours', value: '186h' },
          { label: 'Village reach', value: '8 villages' },
          { label: 'At-risk youth', value: '17' }
        ]
      },
      Sports: {
        title: 'Sports Station',
        stats: [
          { label: 'Players', value: '178', trend: '+9 this term' },
          { label: 'Attendance', value: '88%', trend: '+3% this month' },
          { label: 'Training slots', value: '24', trend: '2 booked' },
          { label: 'Equipment health', value: '92%', trend: 'working order' }
        ],
        alert: {
          title: 'Equipment review due',
          text: 'Three balls and two sets of cones need replacement before the next weekend session.',
          action: 'Review stock'
        },
        chart: { labels: ['M', 'T', 'W', 'T', 'F', 'S'], values: [70, 82, 79, 88, 91, 93] },
        highlights: [
          { label: 'Matches held', value: '09' },
          { label: 'New signups', value: '21' },
          { label: 'Sessions missed', value: '04' }
        ]
      },
      Community: {
        title: 'Community Station',
        stats: [
          { label: 'Participants', value: '132', trend: '+14 this quarter' },
          { label: 'Engagement', value: '84%', trend: '+5% in outreach' },
          { label: 'Events', value: '11', trend: '3 upcoming' },
          { label: 'Volunteer hours', value: '146h', trend: 'steady' }
        ],
        alert: {
          title: 'Volunteer coordination needed',
          text: 'Two planned community sessions are waiting on final volunteer coverage and transport.',
          action: 'Assign volunteers'
        },
        chart: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [60, 68, 71, 79, 82, 84] },
        highlights: [
          { label: 'Villages reached', value: '12' },
          { label: 'Parent meetings', value: '07' },
          { label: 'Events planned', value: '03' }
        ]
      },
      Psychology: {
        title: 'Psychology Station',
        stats: [
          { label: 'Students seen', value: '120', trend: '+16 new cases' },
          { label: 'Session uptake', value: '81%', trend: 'stable' },
          { label: 'Follow-ups', value: '34', trend: '8 urgent' },
          { label: 'Referral rate', value: '22%', trend: 'on track' }
        ],
        alert: {
          title: 'Support case queue rising',
          text: 'The case load is increasing in Huruma, so the team needs two additional check-in slots next week.',
          action: 'Open referral queue'
        },
        chart: { labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], values: [61, 66, 70, 74, 77, 81] },
        highlights: [
          { label: 'Urgent reviews', value: '08' },
          { label: 'Sessions this month', value: '64' },
          { label: 'School referrals', value: '12' }
        ]
      }
    }
  },
  coach: {
    title: 'Sports Coach Dashboard',
    user: 'Sports Coach',
    stats: [
      { label: 'Roster size', value: '22', trend: '4 new signups' },
      { label: 'Attendance', value: '86%', trend: '+7% this month' },
      { label: 'Sessions left', value: '08', trend: '3 upcoming' },
      { label: 'Participation rate', value: '92%', trend: 'strong consistency' }
    ],
    roster: [
      { name: 'Asha M.', status: 'Present', reason: 'Full session' },
      { name: 'Brian K.', status: 'Present', reason: 'Completed warm-up' },
      { name: 'Lucy N.', status: 'Absent', reason: 'School exam' },
      { name: 'Moses T.', status: 'Present', reason: 'Healthy' },
      { name: 'Joy O.', status: 'Present', reason: 'On time' },
      { name: 'Samwel R.', status: 'Absent', reason: 'Family commitment' }
    ]
  },
  investor: {
    title: 'RYSA Investor & Sponsor Portal',
    user: 'Sponsor/Investor',
    stats: [
      { label: 'Funds raised', value: 'KSh 18.4M', trend: 'on track' },
      { label: 'Open pipeline', value: 'KSh 5.2M', trend: 'in review' },
      { label: 'Compliance', value: 'Fully reviewed', trend: 'current' },
      { label: 'Quarterly reports', value: '4', trend: 'submitted' }
    ],
    highlights: [
      { label: 'Active projects', value: '8' },
      { label: 'Impact reach', value: '640 youth' },
      { label: 'ROI tracking', value: '95% complete' }
    ],
    updates: [
      { name: 'Sports Excellence Program', detail: 'All 4 training hubs running with 88% player retention', tag: 'success' },
      { name: 'Education Hub Expansion', detail: '210+ students reaching 79% attendance in learning centers', tag: 'success' },
      { name: 'Community Youth Development', detail: 'Mentorship and leadership programs active in 12+ villages', tag: 'success' }
    ]
  },
  fans: {
    title: 'RYSA: Sports • Education • Community • Youth',
    user: 'Community & Fans',
    stats: [
      { label: 'Youth Active', value: '640', trend: 'across 4 stations' },
      { label: 'Attendance Rate', value: '82%', trend: 'consistently strong' },
      { label: 'Program Stations', value: '4', trend: 'Sports, Education, Community, Wellbeing' },
      { label: 'Community Impact', value: '12+', trend: 'villages reached' }
    ],
    highlights: [
      { label: 'Sports Excellence', value: '88% retention' },
      { label: 'Education Quality', value: '79% attendance' },
      { label: 'Community Reach', value: '12 villages' }
    ],
    updates: [
      { name: 'Huruma learning hub', detail: '6 new mentors onboarded', tag: 'success' },
      { name: 'Community outreach', detail: '2 more villages engaged', tag: 'neutral' },
      { name: 'Support tracking', detail: 'Case review backlog reduced by 18%', tag: 'success' }
    ]
  }
};

const dashboardRoot = document.getElementById('dashboard-content');
const pageTitle = document.getElementById('page-title');
const userLabel = document.getElementById('user-label');

function renderVerification() {
  const pendingApprovals = getPendingApprovals();

  return `
    <div style="margin-bottom: 20px;">
      <h2>${pendingApprovals.length} Pending Approvals</h2>
      <p style="color: var(--muted); margin-bottom: 16px;">Review and approve new member requests</p>
    </div>

    <div style="background: white; border: 1px solid var(--line); border-radius: 20px; overflow: hidden;">
      ${
        pendingApprovals.length
          ? `
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
                <thead>
                  <tr style="background: var(--blue-soft); border-bottom: 1px solid var(--line);">
                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: var(--ink);">Name</th>
                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: var(--ink);">Email</th>
                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: var(--ink);">Requested Role</th>
                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: var(--ink);">Lane</th>
                    <th style="padding: 16px 20px; text-align: center; font-weight: 600; color: var(--ink);">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${pendingApprovals
                    .map(
                      (user, idx) => `
                        <tr style="border-bottom: 1px solid var(--line); ${idx % 2 === 0 ? 'background: #f9f9f9;' : ''}">
                          <td style="padding: 16px 20px;"><strong>${user.name}</strong></td>
                          <td style="padding: 16px 20px; color: var(--muted);">${user.email}</td>
                          <td style="padding: 16px 20px;"><span style="background: var(--yellow-soft); color: var(--blue-deep); padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">${user.requestedRole}</span></td>
                          <td style="padding: 16px 20px;"><span style="color: var(--muted);">${user.lane}</span></td>
                          <td style="padding: 16px 20px; text-align: center;">
                            <div style="display: flex; gap: 8px; justify-content: center;">
                              <button class="approve" data-approve-email="${user.email}" style="padding: 8px 14px; background: var(--success); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Approve</button>
                              <button class="deny" data-deny-email="${user.email}" style="padding: 8px 14px; background: var(--danger); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Deny</button>
                            </div>
                          </td>
                        </tr>
                      `
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
          `
          : '<div style="padding: 40px 20px; text-align: center; color: var(--muted);"><p style="font-size: 1.1rem;">No pending approvals</p><p>All members have been verified.</p></div>'
      }
    </div>
  `;
}

function renderStats(stats) {
  return `
    <div class="summary-row">
      ${stats
        .map(
          (stat) => `
            <article class="stat-card">
              <span class="label">${stat.label}</span>
              <strong>${stat.value}</strong>
              <span class="trend">${stat.trend}</span>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderAlert(alert) {
  if (!alert) return '';
  return `
    <div class="alert-box">
      <div>
        <div class="title"><span class="dot"></span> ${alert.title}</div>
        <p>${alert.text}</p>
      </div>
      <button>${alert.action}</button>
    </div>
  `;
}

function renderBarChart(labels, values) {
  return `
    <div class="bar-chart">
      ${values
        .map(
          (value, index) => `
            <div class="bar" data-label="${labels[index]}" style="height: ${value}%"></div>
          `
        )
        .join('')}
    </div>
  `;
}

function renderAdmin() {
  const current = data.admin;
  const pendingApprovals = getPendingApprovals();
  const canApprove = isUserApprover(appState.currentUser?.email);

  return `
    ${renderStats(current.stats)}
    ${renderAlert(current.alert)}
    <div class="two-col" style="margin-top: 20px;">
      <div class="panel">
        <div class="panel-header">
          <h3>Station summary</h3>
          <span class="pill">Across all locations</span>
        </div>
        <div class="station-grid">
          ${current.stations
            .map(
              (station) => `
                <div class="station-card">
                  <h4>${station.name}</h4>
                  <div class="station-metrics">
                    <span>Youth</span>
                    <strong>${station.youth}</strong>
                  </div>
                  <div class="station-metrics">
                    <span>Attendance</span>
                    <strong>${station.attendance}%</strong>
                  </div>
                  <div class="progress"><span style="width: ${station.progress}%"></span></div>
                </div>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="list-card">
        <div class="card-header">
          <h3>Priority issues</h3>
          <span class="pill">Needs attention</span>
        </div>
        <ul class="list">
          ${current.issues
            .map(
              (issue) => `
                <li>
                  <div>
                    <strong>${issue.item}</strong><br />
                    <small>${issue.detail}</small>
                  </div>
                  <span class="tag ${issue.tag}">${issue.tag === 'warning' ? 'Check' : issue.tag === 'success' ? 'Good' : 'Info'}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    </div>

    <div class="two-col" style="margin-top: 20px;">
      <div class="chart-card">
        <div class="card-header">
          <h3>Attendance trend</h3>
          <span class="pill">Last 6 months</span>
        </div>
        ${renderBarChart(current.chart.labels, current.chart.values)}
      </div>

      <div class="list-card">
        <div class="card-header">
          <h3>Role approvals</h3>
          <span class="pill">${pendingApprovals.length} pending</span>
        </div>
        ${
          canApprove
            ? pendingApprovals.length
              ? pendingApprovals
                  .map(
                    (user) => `
                      <div class="pending-request" data-user-email="${user.email}">
                        <div class="pending-meta">
                          <strong>${user.name}</strong>
                          <small>${user.email}</small>
                          <span class="lane-pill">${user.role} • ${user.lane}</span>
                        </div>
                        <div class="pending-actions">
                          <button class="approve" data-approve-email="${user.email}">Approve</button>
                          <button class="deny" data-deny-email="${user.email}">Deny</button>
                        </div>
                      </div>
                    `
                  )
                  .join('')
              : '<p class="auth-subtitle" style="margin-top: 8px;">No pending approvals.</p>'
            : '<p class="auth-subtitle" style="margin-top: 8px;">Only admins and authorized managers can approve requests.</p>'
        }
      </div>
    </div>

    <div class="panel" style="margin-top: 20px;">
      <div class="panel-header">
        <h3>Submitted reports</h3>
        <span class="pill">Manager & Coach reports</span>
      </div>
      ${
        (() => {
          const reports = getReports();
          const pendingReports = reports.filter((r) => r.status === 'pending');
          if (!pendingReports.length) {
            return '<p class="auth-subtitle" style="margin-top: 8px;">No pending reports.</p>';
          }
          return `
            <div class="list-card" style="margin-top: 10px;">
              <ul class="list">
                ${pendingReports
                  .map(
                    (report) => `
                      <li data-report-id="${report.id}">
                        <div>
                          <strong>${report.title}</strong><br>
                          <small>${report.type === 'manager' ? '📊 Manager Report' : '🏆 Coach Report'} • ${report.submitterName}</small><br>
                          <small>Date: ${report.date} | Submitted: ${new Date(report.submittedAt).toLocaleDateString()}</small><br>
                          <small style="display: block; margin-top: 8px; color: #5f6d85;">${report.content.substring(0, 100)}...</small>
                        </div>
                        <div style="display: flex; gap: 8px;">
                          <button class="view-report" data-report-id="${report.id}">View</button>
                          <button class="approve-report" data-report-id="${report.id}">Approve</button>
                          <button class="reject-report" data-report-id="${report.id}">Reject</button>
                        </div>
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            </div>
          `;
        })()
      }
    </div>

    <div class="panel" style="margin-top: 20px;">
      <div class="panel-header">
        <h3>Google Drive photos</h3>
        <span class="pill">Public gallery</span>
      </div>
      <form id="drive-photo-form" class="mini-form">
        <div class="form-grid">
          <input id="drive-photo-title" type="text" placeholder="Photo title" required />
          <select id="drive-photo-group">
            ${GROUP_NAMES.map((group) => `<option value="${group}">${group}</option>`).join('')}
          </select>
        </div>
        <input id="drive-photo-url" type="url" placeholder="Google Drive shared link (https://drive.google.com/...)" required />
        <button type="submit" class="login-button">Add photo to gallery</button>
      </form>

      <div style="margin-top: 20px;">
        <h4>Published photos</h4>
        ${
          (() => {
            const photos = getDrivePhotos();
            if (!photos.length) {
              return '<p class="auth-subtitle" style="margin-top: 8px;">No photos published yet.</p>';
            }
            return `
              <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-top: 12px;">
                ${photos
                  .map(
                    (photo) => `
                      <div class="gallery-item" style="border: 1px solid var(--line); border-radius: 8px; padding: 8px; text-align: center;">
                        <small style="color: var(--muted); display: block; margin-bottom: 4px;">${photo.group}</small>
                        <strong style="display: block; margin-bottom: 8px; font-size: 0.9rem;">${photo.title}</strong>
                        <a href="${photo.url}" target="_blank" class="link-button" style="font-size: 0.85rem;">View on Drive</a>
                        <button type="button" class="remove-drive-photo" data-photo-id="${photo.id}" style="display: block; width: 100%; margin-top: 6px; padding: 4px; background: #fee; border: 1px solid #fcc; color: #c33; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remove</button>
                      </div>
                    `
                  )
                  .join('')}
              </div>
            `;
          })()
        }
      </div>
    </div>

    <div class="panel" style="margin-top: 20px;">
      <div class="panel-header">
        <h3>RYSA Archives & Reference Library</h3>
        <span class="pill">Add to collection</span>
      </div>
      <form id="archive-item-form" class="mini-form">
        <div class="form-grid">
          <input id="archive-title" type="text" placeholder="Item title (e.g., 'Sports Tournament Photos 2026')" required />
          <select id="archive-type" required>
            <option value="">Select type...</option>
            <option value="photo">📸 Photo/Gallery</option>
            <option value="report">📊 Report/Analysis</option>
            <option value="document">📄 Document/File</option>
          </select>
          <select id="archive-category" required>
            <option value="">Select category...</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Community">Community</option>
            <option value="Psychology">Psychology</option>
            <option value="Events">Events</option>
            <option value="General">General</option>
          </select>
        </div>
        <input id="archive-link" type="url" placeholder="Google Drive link (https://drive.google.com/...)" required />
        <textarea id="archive-description" placeholder="Description (optional - brief details about the content)" rows="2"></textarea>
        <button type="submit" class="login-button">Add to archives</button>
      </form>

      <div style="margin-top: 20px;">
        <h4>Archived items (${getArchives().length})</h4>
        ${
          (() => {
            const archives = getArchives();
            if (!archives.length) {
              return '<p class="auth-subtitle" style="margin-top: 8px;">No items archived yet. Add photos, reports, and documents to build your reference library.</p>';
            }
            const typeEmojis = { photo: '📸', report: '📊', document: '📄' };
            return `
              <div style="display: grid; gap: 8px; margin-top: 12px;">
                ${archives
                  .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                  .slice(0, 10)
                  .map((item) => `
                    <div style="background: #f5f5f5; padding: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong>${typeEmojis[item.type]} ${item.title}</strong>
                        <small style="display: block; color: var(--muted); margin-top: 2px;">${item.category} • ${new Date(item.addedAt).toLocaleDateString()}</small>
                      </div>
                      <div style="display: flex; gap: 6px;">
                        <a href="${item.driveLink}" target="_blank" class="link-button" style="font-size: 0.85rem;">View</a>
                        <button type="button" class="remove-archive" data-archive-id="${item.id}" style="padding: 4px 8px; background: #fee; border: 1px solid #fcc; color: #c33; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Delete</button>
                      </div>
                    </div>
                  `).join('')}
                ${archives.length > 10 ? `<p style="text-align: center; color: var(--muted); margin-top: 8px; font-size: 0.9rem;">... and ${archives.length - 10} more items. View all in the Archives section.</p>` : ''}
              </div>
            `;
          })()
        }
      </div>
    </div>
  `;
}

function renderManager() {
  const current = data.manager;
  const details = current.profiles[appState.managerStation];
  const canApprove = isUserApprover(appState.currentUser?.email);
  const pendingApprovals = canApprove ? getPendingApprovals() : [];

  const stationButtons = current.stations
    .map(
      (station) => `
        <button class="${station === appState.managerStation ? 'active' : ''}" data-station="${station}">${station}</button>
      `
    )
    .join('');

  return `
    <div class="manager-controls">${stationButtons}</div>

    <div class="panel" style="margin-bottom: 20px;">
      <div class="panel-header">
        <h3>Submit station report</h3>
        <span class="pill">Manager report</span>
      </div>
      <form id="manager-report-form" class="mini-form">
        <div class="form-grid">
          <input id="report-title" type="text" placeholder="Report title" required />
          <input id="report-date" type="date" required />
          <select id="report-station">
            ${current.stations.map((station) => `<option value="${station}" ${station === appState.managerStation ? 'selected' : ''}>${station}</option>`).join('')}
          </select>
        </div>
        <textarea id="report-content" placeholder="Report details, observations, and recommendations..." required></textarea>
        <button type="submit" class="login-button">Submit report</button>
      </form>
    </div>

    ${renderStats(details.stats)}
    ${renderAlert(details.alert)}
    <div class="two-col" style="margin-top: 20px;">
      <div class="chart-card">
        <div class="card-header">
          <h3>${details.title} trend</h3>
          <span class="pill">Current cycle</span>
        </div>
        ${renderBarChart(details.chart.labels, details.chart.values)}
      </div>

      <div class="list-card">
        <div class="card-header">
          <h3>${canApprove ? 'Role approvals' : 'Highlights'}</h3>
          <span class="pill">${canApprove ? pendingApprovals.length + ' pending' : 'This month'}</span>
        </div>
        ${
          canApprove
            ? pendingApprovals.length
              ? pendingApprovals
                  .map(
                    (user) => `
                      <div class="pending-request" data-user-email="${user.email}">
                        <div class="pending-meta">
                          <strong>${user.name}</strong>
                          <small>${user.email}</small>
                          <span class="lane-pill">${user.role} • ${user.lane}</span>
                        </div>
                        <div class="pending-actions">
                          <button class="approve" data-approve-email="${user.email}">Approve</button>
                          <button class="deny" data-deny-email="${user.email}">Deny</button>
                        </div>
                      </div>
                    `
                  )
                  .join('')
              : '<p class="auth-subtitle" style="margin-top: 8px;">No pending approvals.</p>'
            : `<div class="highlights">
                  ${details.highlights
                    .map(
                      (item) => `
                        <div class="highlight-box">
                          <span>${item.label}</span>
                          <span class="value">${item.value}</span>
                        </div>
                      `
                    )
                    .join('')}
                </div>`
        }
      </div>
    </div>
  `;
}

function renderCoach() {
  const current = data.coach;
  return `
    <div class="panel" style="margin-bottom: 20px;">
      <div class="panel-header">
        <h3>Submit session report</h3>
        <span class="pill">Coach report</span>
      </div>
      <form id="coach-report-form" class="mini-form">
        <div class="form-grid">
          <input id="coach-report-title" type="text" placeholder="Session/report title" required />
          <input id="coach-report-date" type="date" required />
          <select id="coach-report-group">
            <option value="Sports">Sports</option>
          </select>
        </div>
        <textarea id="coach-report-content" placeholder="Session summary, player performance, challenges, and notes..." required></textarea>
        <button type="submit" class="login-button">Submit report</button>
      </form>
    </div>

    ${renderStats(current.stats)}
    <div class="two-col" style="margin-top: 20px;">
      <div class="roster-card">
        <div class="card-header">
          <h3>Team roster</h3>
          <span class="pill">Next session: Tue</span>
        </div>
        <table class="roster-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${current.roster
              .map(
                (player) => `
                  <tr>
                    <td>${player.name}</td>
                    <td><span class="badge ${player.status === 'Present' ? 'present' : 'absent'}">${player.status}</span></td>
                    <td>${player.reason}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="list-card">
        <div class="card-header">
          <h3>Coach actions</h3>
          <span class="pill">Today</span>
        </div>
        <ul class="list">
          <li><span>Warm-up drill</span><span class="tag success">Planned</span></li>
          <li><span>Attendance follow-up</span><span class="tag warning">2 pending</span></li>
          <li><span>Hydration checks</span><span class="tag neutral">Ready</span></li>
        </ul>
      </div>
    </div>
  `;
}

function renderInvestor() {
  const current = data.investor;
  return `
    ${renderStats(current.stats)}
    <div class="two-col" style="margin-top: 20px;">
      <div class="list-card">
        <div class="card-header">
          <h3>Investor highlights</h3>
          <span class="pill">Portfolio</span>
        </div>
        <div class="highlights">
          ${current.highlights
            .map(
              (item) => `
                <div class="highlight-box">
                  <span>${item.label}</span>
                  <span class="value">${item.value}</span>
                </div>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="list-card">
        <div class="card-header">
          <h3>Recent updates</h3>
          <span class="pill">Activity</span>
        </div>
        <ul class="list">
          ${current.updates
            .map(
              (item) => `
                <li>
                  <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.detail}</small>
                  </div>
                  <span class="tag ${item.tag}">${item.tag}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    </div>
  `;
}

function renderFans() {
  const current = data.fans;
  return `
    ${renderStats(current.stats)}
    <div class="two-col" style="margin-top: 20px;">
      <div class="chart-card">
        <div class="card-header">
          <h3>Program momentum</h3>
          <span class="pill">Public summary</span>
        </div>
        <div class="highlights">
          ${current.highlights
            .map(
              (item) => `
                <div class="highlight-box">
                  <span>${item.label}</span>
                  <span class="value">${item.value}</span>
                </div>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="list-card">
        <div class="card-header">
          <h3>Latest updates</h3>
          <span class="pill">Community</span>
        </div>
        <ul class="list">
          ${current.updates
            .map(
              (item) => `
                <li>
                  <div>
                    <strong>${item.name}</strong><br />
                    <small>${item.detail}</small>
                  </div>
                  <span class="tag ${item.tag}">${item.tag === 'success' ? 'Good' : 'Info'}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    </div>
  `;
}

function getGroupEvents() {
  const raw = localStorage.getItem(GROUP_EVENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveGroupEvents(events) {
  localStorage.setItem(GROUP_EVENTS_KEY, JSON.stringify(events));
}

function getGroupPhotos() {
  const raw = localStorage.getItem(GROUP_PHOTOS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveGroupPhotos(photos) {
  localStorage.setItem(GROUP_PHOTOS_KEY, JSON.stringify(photos));
}

function getReports() {
  const raw = localStorage.getItem(REPORTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveReports(reports) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

function getDrivePhotos() {
  const raw = localStorage.getItem(DRIVE_PHOTOS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveDrivePhotos(photos) {
  localStorage.setItem(DRIVE_PHOTOS_KEY, JSON.stringify(photos));
}

function getArchives() {
  const raw = localStorage.getItem(ARCHIVES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveArchives(archives) {
  localStorage.setItem(ARCHIVES_KEY, JSON.stringify(archives));
}

function buildInitialGroupEvents() {
  return [
    { id: 'event-edu-1', group: 'Education', title: 'Mentor training', date: '2026-08-25', note: 'Volunteer tutor onboarding at Huruma hub' },
    { id: 'event-edu-2', group: 'Education', title: 'School support day', date: '2026-08-29', note: 'Reading and homework support for 60 youth' },
    { id: 'event-sports-1', group: 'Sports', title: 'Training session', date: '2026-08-23', note: 'Football drills and team conditioning' },
    { id: 'event-sports-2', group: 'Sports', title: 'Mini tournament', date: '2026-08-30', note: 'Inter-village friendly match at Kware field' },
    { id: 'event-community-1', group: 'Community', title: 'Cleanup drive', date: '2026-08-26', note: 'Neighborhood sanitation and youth engagement' },
    { id: 'event-community-2', group: 'Community', title: 'Volunteer induction', date: '2026-08-28', note: 'Orientation for new community leaders' },
    { id: 'event-psych-1', group: 'Psychology', title: 'Support check-in', date: '2026-08-24', note: 'Case review and counseling session follow-up' },
    { id: 'event-psych-2', group: 'Psychology', title: 'School referral clinic', date: '2026-08-31', note: 'Behavior and emotional health consultation' }
  ];
}

function buildInitialGroupPhotos() {
  return [
    { id: 'photo-edu-1', group: 'Education', title: 'Reading day', date: 'Current event', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' },
    { id: 'photo-edu-2', group: 'Education', title: 'Homework drive', date: 'Past event', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
    { id: 'photo-sports-1', group: 'Sports', title: 'Training session', date: 'Current event', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80' },
    { id: 'photo-community-1', group: 'Community', title: 'Cleanup drive', date: 'Current event', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80' },
    { id: 'photo-psych-1', group: 'Psychology', title: 'Wellbeing check-in', date: 'Current event', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80' }
  ];
}

function ensureGroupStorageData() {
  if (!getGroupEvents().length) {
    saveGroupEvents(buildInitialGroupEvents());
  }
  if (!getGroupPhotos().length) {
    saveGroupPhotos(buildInitialGroupPhotos());
  }
}

function handleAddGroupEvent(event) {
  event.preventDefault();

  const titleInput = document.getElementById('new-event-title');
  const dateInput = document.getElementById('new-event-date');
  const groupInput = document.getElementById('new-event-group');
  const noteInput = document.getElementById('new-event-note');

  const title = titleInput.value.trim();
  const date = dateInput.value;
  const group = groupInput.value;
  const note = noteInput.value.trim();

  if (!title || !date || !group || !note) {
    window.alert('Please complete all event fields before saving.');
    return;
  }

  const events = getGroupEvents();
  events.push({
    id: `event-${Date.now()}`,
    group,
    title,
    date,
    note
  });
  saveGroupEvents(events);

  titleInput.value = '';
  dateInput.value = '';
  noteInput.value = '';
  renderDashboard();
}

function handleUploadGroupPhoto(event) {
  event.preventDefault();

  const titleInput = document.getElementById('new-photo-title');
  const imageInput = document.getElementById('new-photo-image');
  const groupInput = document.getElementById('new-photo-group');

  const title = titleInput.value.trim();
  const image = imageInput.value.trim();
  const group = groupInput.value;

  if (!title || !image || !group) {
    window.alert('Please add a title, photo URL, and group before saving.');
    return;
  }

  const photos = getGroupPhotos();
  photos.push({
    id: `photo-${Date.now()}`,
    group,
    title,
    date: 'New upload',
    image
  });
  saveGroupPhotos(photos);

  titleInput.value = '';
  imageInput.value = '';
  renderDashboard();
}

function handleManagerReport(event) {
  event.preventDefault();

  const titleInput = document.getElementById('report-title');
  const dateInput = document.getElementById('report-date');
  const stationInput = document.getElementById('report-station');
  const contentInput = document.getElementById('report-content');

  const title = titleInput.value.trim();
  const date = dateInput.value;
  const station = stationInput.value;
  const content = contentInput.value.trim();

  if (!title || !date || !station || !content) {
    window.alert('Please fill in all report fields.');
    return;
  }

  const reports = getReports();
  reports.push({
    id: `report-${Date.now()}`,
    type: 'manager',
    submittedBy: appState.currentUser?.email,
    submitterName: appState.currentUser?.name,
    station,
    title,
    content,
    date,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  });
  saveReports(reports);

  window.alert('Report submitted successfully to admin for review.');
  titleInput.value = '';
  dateInput.value = '';
  contentInput.value = '';
  renderDashboard();
}

function handleCoachReport(event) {
  event.preventDefault();

  const titleInput = document.getElementById('coach-report-title');
  const dateInput = document.getElementById('coach-report-date');
  const contentInput = document.getElementById('coach-report-content');

  const title = titleInput.value.trim();
  const date = dateInput.value;
  const content = contentInput.value.trim();

  if (!title || !date || !content) {
    window.alert('Please fill in all report fields.');
    return;
  }

  const reports = getReports();
  reports.push({
    id: `report-${Date.now()}`,
    type: 'coach',
    submittedBy: appState.currentUser?.email,
    submitterName: appState.currentUser?.name,
    title,
    content,
    date,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  });
  saveReports(reports);

  window.alert('Report submitted successfully to admin for review.');
  titleInput.value = '';
  dateInput.value = '';
  contentInput.value = '';
  renderDashboard();
}

function renderGroupNotifications() {
  const groups = Object.values(groupNotifications);
  const canManageEvents = isUserApprover(appState.currentUser?.email);
  const events = getGroupEvents();

  return `
    ${
      canManageEvents
        ? `
          <div class="panel" style="margin-bottom: 20px;">
            <div class="panel-header">
              <h3>Add event</h3>
              <span class="pill">Admin schedule</span>
            </div>
            <form id="add-event-form" class="mini-form">
              <div class="form-grid">
                <input id="new-event-title" type="text" placeholder="Event title" />
                <input id="new-event-date" type="date" />
                <select id="new-event-group">
                  ${GROUP_NAMES.filter((group) => group !== 'Event Group').map((group) => `<option value="${group}">${group}</option>`).join('')}
                </select>
              </div>
              <textarea id="new-event-note" placeholder="Event description"></textarea>
              <button type="submit" class="login-button">Save event</button>
            </form>
          </div>
        `
        : ''
    }

    <div class="notice-grid" style="margin-bottom: 20px;">
      ${groups
        .map(
          (group) => `
            <div class="notice-card">
              <h4>${group.title}</h4>
              <p style="margin-bottom: 12px; font-weight: 600; color: var(--blue-deep);">${group.header}</p>
              <ul class="notice-list">
                ${events
                  .filter((event) => event.group === group.title)
                  .map(
                    (item) => `
                      <li>
                        <div>
                          <strong>${item.title}</strong><br>
                          <small>${item.note}</small>
                        </div>
                        <span class="notice-tag">${item.date}</span>
                      </li>
                    `
                  )
                  .join('') || group.items
                        .map(
                          (item) => `
                            <li>
                              <div>
                                <strong>${item.action}</strong><br>
                                <small>${item.note}</small>
                              </div>
                              <span class="notice-tag">${item.date}</span>
                            </li>
                          `
                        )
                        .join('')}
              </ul>
            </div>
          `
        )
        .join('')}
    </div>

    <div class="timeline-box">
      <h3>Upcoming activity timeline</h3>
      <ul class="timeline-list">
        ${events
          .slice(-3)
          .map(
            (event) => `
              <li><span class="timeline-dot"></span><div><strong>${event.date}</strong><br>${event.title} • ${event.note}</div></li>
            `
          )
          .join('') || `
            <li><span class="timeline-dot"></span><div><strong>Aug 23</strong><br>Sports training and youth exercise block starts.</div></li>
            <li><span class="timeline-dot"></span><div><strong>Aug 27</strong><br>Open community day for parents and supporters.</div></li>
            <li><span class="timeline-dot"></span><div><strong>Sep 02</strong><br>Education review and family engagement workshop.</div></li>
          `}
      </ul>
    </div>
  `;
}

function renderPublicNotifications() {
  return `
    <div class="panel" style="margin-bottom: 20px;">
      <div class="panel-header">
        <h3>Public notification board</h3>
        <span class="pill">Community updates</span>
      </div>
      <div class="notice-grid">
        ${publicNotifications
          .map(
            (notice) => `
              <div class="notice-card">
                <h4>${notice.title}</h4>
                <p>${notice.detail}</p>
                <div style="margin-top: 12px;">
                  <span class="notice-tag">${notice.date}</span>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderInvestorPage() {
  return `
    <div class="investor-hero">
      <div class="investor-summary">
        <h3>Investor and sponsor portal</h3>
        <p>Secure access for sponsors and partners supporting youth programs, infrastructure, and long-term community impact.</p>
        <div class="cta-row">
          <button type="button">View profile</button>
          <button type="button" class="action-button">Download report</button>
        </div>
      </div>

      <div class="security-panel">
        <h3>Security overview</h3>
        <p>Funding, reporting, and document access are protected by verified sponsor controls and policy checks.</p>
        <ul class="security-list">
          <li><span>Funds raised</span><strong>${investorSecurity.overview.funded}</strong></li>
          <li><span>Open pipeline</span><strong>${investorSecurity.overview.pipeline}</strong></li>
          <li><span>Compliance</span><strong>${investorSecurity.overview.compliance}</strong></li>
        </ul>
      </div>
    </div>

    <div class="secure-grid">
      ${investorSecurity.items
        .map(
          (item) => `
            <div class="security-card">
              <h4>${item.title}</h4>
              <p>${item.detail}</p>
              <div style="margin-top: 12px;"><span class="secure-badge">${item.status}</span></div>
            </div>
          `
        )
        .join('')}
    </div>

    <div class="two-col" style="margin-top: 20px;">
      <div class="list-card">
        <div class="card-header">
          <h3>Investor contacts</h3>
          <span class="pill">Secure desk</span>
        </div>
        <ul class="list">
          ${investorSecurity.contacts
            .map(
              (contact) => `
                <li>
                  <div>
                    <strong>${contact.name}</strong><br>
                    <small>${contact.value}</small>
                  </div>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>

      <div class="chart-card">
        <div class="card-header">
          <h3>Funding security</h3>
          <span class="pill">Protection</span>
        </div>
        <div class="schedule-grid" style="margin-top: 10px;">
          <div class="schedule-card">
            <h4>Approval</h4>
            <p>Layered review for sponsor access and project transfers.</p>
          </div>
          <div class="schedule-card">
            <h4>Monitoring</h4>
            <p>Quarterly review of impact outcomes and utilization.</p>
          </div>
          <div class="schedule-card">
            <h4>Audit</h4>
            <p>Documented sponsor records with secure retention.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getGroupMemberships() {
  const raw = localStorage.getItem(GROUP_MEMBERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveGroupMemberships(memberships) {
  localStorage.setItem(GROUP_MEMBERS_KEY, JSON.stringify(memberships));
}

function getUserGroupMemberships(email) {
  if (!email) return [];
  return getGroupMemberships().filter((member) => member.email.toLowerCase() === email.toLowerCase());
}

function isGroupMember(email, groupName) {
  if (!email || !groupName) return false;
  const user = getUsers().find((entry) => entry.email && entry.email.toLowerCase() === email.toLowerCase());
  if (user && user.role === 'admin') return true;
  return getUserGroupMemberships(email).some((member) => member.group === groupName && member.status === 'approved');
}

function requestGroupAccess(groupName) {
  const email = appState.currentUser?.email;
  if (!email) {
    window.alert('Please sign in to request access.');
    return;
  }

  const memberships = getGroupMemberships();
  const existing = memberships.find(
    (member) => member.email.toLowerCase() === email.toLowerCase() && member.group === groupName
  );

  if (existing) {
    if (existing.status === 'approved') {
      window.alert('You already have access to this group.');
      return;
    }
    window.alert('Your request is already waiting for admin approval.');
    return;
  }

  memberships.push({ email, group: groupName, status: 'pending' });
  saveGroupMemberships(memberships);
  window.alert('Your request to join this group has been sent for approval.');
  renderDashboard();
}

function approveGroupAccess(email, groupName) {
  const memberships = getGroupMemberships();
  const member = memberships.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.group === groupName
  );

  if (!member) return;
  member.status = 'approved';
  saveGroupMemberships(memberships);
  renderDashboard();
}

function denyGroupAccess(email, groupName) {
  const memberships = getGroupMemberships().filter(
    (entry) => !(entry.email.toLowerCase() === email.toLowerCase() && entry.group === groupName)
  );
  saveGroupMemberships(memberships);
  renderDashboard();
}

function getPendingGroupApprovals() {
  return getGroupMemberships().filter((member) => member.status === 'pending');
}

function ensureAdminMemberships() {
  const memberships = getGroupMemberships();
  const adminEmails = getUsers().filter((user) => user.role === 'admin').map((user) => user.email.toLowerCase());

  GROUP_NAMES.forEach((groupName) => {
    adminEmails.forEach((email) => {
      const existing = memberships.find(
        (entry) => entry.email.toLowerCase() === email && entry.group === groupName
      );
      if (!existing) {
        memberships.push({ email, group: groupName, status: 'approved' });
      } else if (existing.status !== 'approved') {
        existing.status = 'approved';
      }
    });
  });

  saveGroupMemberships(memberships);
}

const groupGalleryData = {
  Education: {
    title: 'Education Group Gallery',
    photos: [
      { title: 'Reading day', date: 'Current event', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' },
      { title: 'Homework drive', date: 'Past event', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
      { title: 'Mentor workshop', date: 'Past event', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80' }
    ]
  },
  Sports: {
    title: 'Sports Group Gallery',
    photos: [
      { title: 'Training session', date: 'Current event', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80' },
      { title: 'Friendly tournament', date: 'Past event', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80' },
      { title: 'Youth fitness day', date: 'Past event', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80' }
    ]
  },
  Community: {
    title: 'Community Group Gallery',
    photos: [
      { title: 'Cleanup drive', date: 'Current event', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80' },
      { title: 'Village outreach', date: 'Past event', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80' },
      { title: 'Parent forum', date: 'Past event', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' }
    ]
  },
  Psychology: {
    title: 'Psychology Group Gallery',
    photos: [
      { title: 'Wellbeing check-in', date: 'Current event', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80' },
      { title: 'Caregiver workshop', date: 'Past event', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
      { title: 'Support circle', date: 'Past event', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80' }
    ]
  }
};

function renderGroupGallery() {
  const selectedGroup = appState.galleryGroup || 'Education';
  const canUploadImages = isUserApprover(appState.currentUser?.email);
  const photos = getGroupPhotos();
  const groupPhotos = photos.filter((photo) => photo.group === selectedGroup);

  return `
    <div class="manager-controls" style="margin-bottom: 18px;">
      ${GROUP_NAMES.filter((group) => group !== 'Event Group')
        .map(
          (group) => `
            <button class="${selectedGroup === group ? 'active' : ''}" data-gallery-group="${group}">${group}</button>
          `
        )
        .join('')}
    </div>

    ${
      canUploadImages
        ? `
          <div class="panel" style="margin-bottom: 20px;">
            <div class="panel-header">
              <h3>Upload gallery photo</h3>
              <span class="pill">Admin upload</span>
            </div>
            <form id="group-photo-form" class="mini-form">
              <div class="form-grid">
                <input id="new-photo-title" type="text" placeholder="Photo title" />
                <input id="new-photo-image" type="url" placeholder="Photo URL" />
                <select id="new-photo-group">
                  ${GROUP_NAMES.filter((group) => group !== 'Event Group').map((group) => `<option value="${group}" ${group === selectedGroup ? 'selected' : ''}>${group}</option>`).join('')}
                </select>
              </div>
              <button type="submit" class="login-button">Upload photo</button>
            </form>
          </div>
        `
        : ''
    }

    <div class="panel">
      <div class="panel-header">
        <h3>${groupGalleryData[selectedGroup].title}</h3>
        <span class="pill">Current and old events</span>
      </div>
      <div class="notice-grid">
        ${(groupPhotos.length ? groupPhotos : groupGalleryData[selectedGroup].photos)
          .map(
            (photo) => `
              <div class="notice-card">
                <img src="${photo.image}" alt="${photo.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 12px;" />
                <h4>${photo.title}</h4>
                <p>${photo.date}</p>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderEventGroupPage() {
  const email = appState.currentUser?.email;
  const hasAccess = isGroupMember(email, 'Event Group');

  if (!hasAccess) {
    return `
      <div class="panel">
        <div class="panel-header">
          <h3>Schedule & Event Group</h3>
          <span class="pill">Access required</span>
        </div>
        <p class="auth-subtitle">Only approved members of the schedule and event group can download event photos.</p>
        <button class="login-button" data-request-group="Event Group">Request group access</button>
      </div>
    `;
  }

  const eventPhotos = [
    { title: 'Community festival', date: '2026-08-12', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80' },
    { title: 'School outreach', date: '2026-08-03', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' },
    { title: 'Sports day', date: '2026-07-29', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80' },
    { title: 'Mentor training', date: '2026-07-18', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80' }
  ];

  const canManageEvents = isUserApprover(appState.currentUser?.email);

  return `
    ${
      canManageEvents
        ? `
          <div class="panel" style="margin-bottom: 20px;">
            <div class="panel-header">
              <h3>Create schedule event</h3>
              <span class="pill">Admin event control</span>
            </div>
            <form id="add-event-form" class="mini-form">
              <div class="form-grid">
                <input id="new-event-title" type="text" placeholder="Event title" />
                <input id="new-event-date" type="date" />
                <select id="new-event-group">
                  <option value="Event Group">Event Group</option>
                  ${GROUP_NAMES.filter((group) => group !== 'Event Group').map((group) => `<option value="${group}">${group}</option>`).join('')}
                </select>
              </div>
              <textarea id="new-event-note" placeholder="Event description"></textarea>
              <button type="submit" class="login-button">Save event</button>
            </form>
          </div>
        `
        : ''
    }

    <div class="panel">
      <div class="panel-header">
        <h3>Event photo downloads</h3>
        <span class="pill">Approved members</span>
      </div>
      <div class="notice-grid">
        ${eventPhotos
          .map(
            (photo) => `
              <div class="notice-card">
                <img src="${photo.image}" alt="${photo.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 12px;" />
                <h4>${photo.title}</h4>
                <p>${photo.date}</p>
                <div style="margin-top: 12px;">
                  <a href="${photo.image}" target="_blank" download="${photo.title.replace(/\s+/g, '-')}.jpg" class="login-button" style="display: inline-block; text-decoration: none;">Download photo</a>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderPublicDriveGallery() {
  const photos = getDrivePhotos();

  return `
    <div class="panel">
      <div class="panel-header">
        <h3>Photo Gallery</h3>
        <span class="pill">From Google Drive</span>
      </div>

      ${
        !photos.length
          ? '<p class="auth-subtitle" style="margin-top: 12px;">No photos available yet.</p>'
          : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
              ${photos
                .map(
                  (photo) => `
                    <div class="notice-card">
                      <div style="background: linear-gradient(135deg, var(--blue) 0%, var(--yellow) 100%); width: 100%; height: 180px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; color: white; font-weight: 600; text-align: center; padding: 12px; box-sizing: border-box;">
                        📸 ${photo.title}
                      </div>
                      <h4>${photo.title}</h4>
                      <small style="color: var(--muted);">Group: ${photo.group}</small>
                      <div style="margin-top: 12px;">
                        <a href="${photo.url}" target="_blank" class="login-button" style="display: inline-block; text-decoration: none;">View on Google Drive</a>
                      </div>
                    </div>
                  `
                )
                .join('')}
            </div>
          `
      }
    </div>
  `;
}

function renderArchives() {
  const archives = getArchives();
  const types = ['photo', 'report', 'document'];
  const typeEmojis = { photo: '📸', report: '📊', document: '📄' };
  const typeColors = { photo: '#e8f5e9', report: '#e3f2fd', document: '#fff3e0' };

  return `
    <div class="panel">
      <div class="panel-header">
        <h3>RYSA Archives & Reference Library</h3>
        <span class="pill">${archives.length} items</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 16px 0;">
        ${types.map((type) => {
          const count = archives.filter((a) => a.type === type).length;
          return `
            <div style="background: ${typeColors[type]}; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer;" class="filter-type-btn" data-filter="${type}">
              <div style="font-size: 1.8rem;">${typeEmojis[type]}</div>
              <strong>${type.charAt(0).toUpperCase() + type.slice(1)}s</strong>
              <p style="margin: 4px 0 0; font-size: 0.9rem; color: #666;">${count} items</p>
            </div>
          `;
        }).join('')}
      </div>

      <div id="archives-list" style="margin-top: 20px;">
        ${
          !archives.length
            ? '<p class="auth-subtitle">No archived items yet. Add photos, reports, and documents from the admin panel.</p>'
            : `
              <div style="display: grid; gap: 12px;">
                ${archives
                  .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                  .map((item) => `
                    <div style="border: 1px solid var(--line); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: start;">
                      <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                          <span style="font-size: 1.2rem;">${typeEmojis[item.type]}</span>
                          <strong>${item.title}</strong>
                          <span class="pill" style="font-size: 0.75rem;">${item.type}</span>
                        </div>
                        <small style="color: var(--muted); display: block; margin-bottom: 4px;">
                          ${item.category} • ${new Date(item.addedAt).toLocaleDateString()}
                        </small>
                        ${item.description ? `<small style="display: block; color: #666; margin-bottom: 8px;">${item.description}</small>` : ''}
                      </div>
                      <a href="${item.driveLink}" target="_blank" class="login-button" style="display: inline-block; white-space: nowrap; margin-left: 12px; text-decoration: none; font-size: 0.9rem;">Open</a>
                    </div>
                  `).join('')}
              </div>
            `
        }
      </div>
    </div>
  `;
}

function renderGroupApprovals() {
  const pendingApprovals = getPendingGroupApprovals();

  return `
    <div class="panel">
      <div class="panel-header">
        <h3>Group membership approvals</h3>
        <span class="pill">${pendingApprovals.length} pending</span>
      </div>
      ${
        pendingApprovals.length
          ? `
            <div class="list-card" style="margin-top: 10px;">
              <ul class="list">
                ${pendingApprovals
                  .map(
                    (member) => `
                      <li>
                        <div>
                          <strong>${member.email}</strong><br>
                          <small>${member.group}</small>
                        </div>
                        <div class="pending-actions">
                          <button class="approve" data-group-approve-email="${member.email}" data-group-name="${member.group}">Approve</button>
                          <button class="deny" data-group-deny-email="${member.email}" data-group-name="${member.group}">Deny</button>
                        </div>
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            </div>
          `
          : '<p class="auth-subtitle" style="margin-top: 10px;">No pending group membership requests.</p>'
      }
    </div>
  `;
}

function renderDashboard() {
  const config = data[appState.role];
  const canApprove = isUserApprover(appState.currentUser?.email);
  const canApproveGroups = canApprove || isGroupMember(appState.currentUser?.email, 'Event Group');
  const isFans = appState.role === 'fans';
  const isInvestorRestricted = appState.role !== 'admin' && appState.role !== 'investor';
  ensureAdminMemberships();
  
  // Restrict investors section to admin and investor only
  if (isInvestorRestricted && appState.currentSection === 'investors') {
    appState.currentSection = 'dashboard';
  }
  
  // Restrict fans to only 'dashboard' section
  if (isFans && appState.currentSection !== 'dashboard' && appState.currentSection !== 'public-notifications' && appState.currentSection !== 'investors') {
    appState.currentSection = 'dashboard';
  }
  
  const verificationButton = document.getElementById('verification-button');
  const verificationBadge = document.getElementById('verification-badge');
  const groupApprovalButton = document.getElementById('group-approval-button');

  if (canApprove && !isFans) {
    verificationButton.style.display = 'inline-block';
    const pendingCount = getPendingApprovals().length;
    verificationBadge.style.display = pendingCount > 0 ? 'block' : 'none';
  } else {
    verificationButton.style.display = 'none';
  }

  if (canApproveGroups && !isFans) {
    groupApprovalButton.style.display = 'inline-block';
  } else {
    groupApprovalButton.style.display = 'none';
  }
  
  // Hide restricted sections for fans and investors section for non-investors
  document.querySelectorAll('.section-button').forEach((button) => {
    const section = button.dataset.section;
    const isFansRestricted = isFans && ['group-notifications', 'group-gallery', 'event-group', 'verification', 'group-approvals'].includes(section);
    const isInvestorsHidden = section === 'investors' && isInvestorRestricted;
    button.style.display = (isFansRestricted || isInvestorsHidden) ? 'none' : 'block';
    button.classList.toggle('active', section === appState.currentSection);
  });

  // Restrict role buttons for non-admin users
  const isNotAdmin = appState.role !== 'admin';
  const isNotInvestor = appState.role !== 'admin' && appState.role !== 'investor';
  document.querySelectorAll('.nav-button').forEach((button) => {
    const buttonRole = button.dataset.role;
    if (buttonRole === 'admin' && isNotAdmin) {
      button.disabled = true;
      button.style.opacity = '0.4';
      button.style.cursor = 'not-allowed';
    } else if (buttonRole === 'investor' && isNotInvestor) {
      button.disabled = true;
      button.style.opacity = '0.4';
      button.style.cursor = 'not-allowed';
    } else if (isFans) {
      button.disabled = true;
      button.style.opacity = '0.5';
      button.style.cursor = 'not-allowed';
    } else {
      button.disabled = false;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
    }
    button.classList.toggle('active', buttonRole === appState.role);
  });

  if (appState.currentSection === 'group-notifications') {
    pageTitle.textContent = 'Group Notification Center';
    dashboardRoot.innerHTML = renderGroupNotifications();
    const addEventForm = document.getElementById('add-event-form');
    if (addEventForm) {
      addEventForm.addEventListener('submit', handleAddGroupEvent);
    }
    return;
  }

  if (appState.currentSection === 'group-gallery') {
    pageTitle.textContent = 'Group Gallery';
    dashboardRoot.innerHTML = renderGroupGallery();
    document.querySelectorAll('[data-gallery-group]').forEach((button) => {
      button.addEventListener('click', () => {
        appState.galleryGroup = button.dataset.galleryGroup;
        renderDashboard();
      });
    });
    const groupPhotoForm = document.getElementById('group-photo-form');
    if (groupPhotoForm) {
      groupPhotoForm.addEventListener('submit', handleUploadGroupPhoto);
    }
    return;
  }

  if (appState.currentSection === 'event-group') {
    pageTitle.textContent = 'Schedule & Event Group';
    dashboardRoot.innerHTML = renderEventGroupPage();
    document.querySelectorAll('[data-request-group]').forEach((button) => {
      button.addEventListener('click', () => {
        requestGroupAccess(button.dataset.requestGroup);
      });
    });
    const addEventForm = document.getElementById('add-event-form');
    if (addEventForm) {
      addEventForm.addEventListener('submit', handleAddGroupEvent);
    }
    return;
  }

  if (appState.currentSection === 'public-notifications') {
    pageTitle.textContent = 'Public Notifications';
    dashboardRoot.innerHTML = renderPublicNotifications();
    return;
  }

  if (appState.currentSection === 'drive-gallery') {
    pageTitle.textContent = 'Photo Gallery';
    dashboardRoot.innerHTML = renderPublicDriveGallery();
    return;
  }

  if (appState.currentSection === 'archives') {
    pageTitle.textContent = 'RYSA Archives & Reference Library';
    dashboardRoot.innerHTML = renderArchives();
    document.querySelectorAll('.filter-type-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterType = btn.dataset.filter;
        const archives = getArchives();
        const filtered = archives.filter((a) => a.type === filterType);
        const archivesList = document.getElementById('archives-list');

        if (!filtered.length) {
          archivesList.innerHTML = `<p class="auth-subtitle">No ${filterType}s in archives yet.</p>`;
          return;
        }

        const typeEmojis = { photo: '📸', report: '📊', document: '📄' };
        archivesList.innerHTML = `
          <div style="display: grid; gap: 12px;">
            ${filtered
              .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
              .map((item) => `
                <div style="border: 1px solid var(--line); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: start;">
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                      <span style="font-size: 1.2rem;">${typeEmojis[item.type]}</span>
                      <strong>${item.title}</strong>
                      <span class="pill" style="font-size: 0.75rem;">${item.type}</span>
                    </div>
                    <small style="color: var(--muted); display: block; margin-bottom: 4px;">
                      ${item.category} • ${new Date(item.addedAt).toLocaleDateString()}
                    </small>
                    ${item.description ? `<small style="display: block; color: #666; margin-bottom: 8px;">${item.description}</small>` : ''}
                  </div>
                  <a href="${item.driveLink}" target="_blank" class="login-button" style="display: inline-block; white-space: nowrap; margin-left: 12px; text-decoration: none; font-size: 0.9rem;">Open</a>
                </div>
              `).join('')}
          </div>
        `;
      });
    });
    return;
  }

  if (appState.currentSection === 'investors') {
    pageTitle.textContent = 'Investor & Sponsor Security';
    dashboardRoot.innerHTML = renderInvestorPage();
    return;
  }

  if (appState.currentSection === 'group-approvals') {
    pageTitle.textContent = 'Group Approvals';
    dashboardRoot.innerHTML = renderGroupApprovals();
    document.querySelectorAll('[data-group-approve-email]').forEach((button) => {
      button.addEventListener('click', () => {
        approveGroupAccess(button.dataset.groupApproveEmail, button.dataset.groupName);
      });
    });
    document.querySelectorAll('[data-group-deny-email]').forEach((button) => {
      button.addEventListener('click', () => {
        denyGroupAccess(button.dataset.groupDenyEmail, button.dataset.groupName);
      });
    });
    return;
  }

  if (appState.currentSection === 'verification') {
    pageTitle.textContent = 'Pending Approvals';
    dashboardRoot.innerHTML = renderVerification();
    attachApprovalHandlers();
    return;
  }

  pageTitle.textContent = config.title;



  if (appState.role === 'admin') {
    dashboardRoot.innerHTML = renderAdmin();
    attachApprovalHandlers();
    attachDrivePhotoHandlers();
    attachArchiveHandlers();
    return;
  }

  if (appState.role === 'manager') {
    dashboardRoot.innerHTML = renderManager();
    if (canApprove) {
      attachApprovalHandlers();
    }
    document.querySelectorAll('[data-station]').forEach((button) => {
      button.addEventListener('click', () => {
        appState.managerStation = button.dataset.station;
        renderDashboard();
      });
    });
    const managerReportForm = document.getElementById('manager-report-form');
    if (managerReportForm) {
      managerReportForm.addEventListener('submit', handleManagerReport);
    }
    return;
  }

  if (appState.role === 'coach') {
    dashboardRoot.innerHTML = renderCoach();
    const coachReportForm = document.getElementById('coach-report-form');
    if (coachReportForm) {
      coachReportForm.addEventListener('submit', handleCoachReport);
    }
    return;
  }

  if (appState.role === 'investor') {
    dashboardRoot.innerHTML = renderInvestor();
    return;
  }

  dashboardRoot.innerHTML = renderFans();
}

function attachApprovalHandlers() {
  document.querySelectorAll('[data-approve-email]').forEach((button) => {
    button.addEventListener('click', () => {
      const email = button.dataset.approveEmail;
      const users = getUsers();
      const userIndex = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());

      if (userIndex >= 0) {
        users[userIndex].status = 'approved';
        users[userIndex].role = users[userIndex].requestedRole || users[userIndex].role;
        users[userIndex].lane = users[userIndex].lane || 'All';
        saveUsers(users);
        renderDashboard();
      }
    });
  });

  document.querySelectorAll('[data-deny-email]').forEach((button) => {
    button.addEventListener('click', () => {
      const email = button.dataset.denyEmail;
      const users = getUsers();
      const filtered = users.filter((user) => user.email.toLowerCase() !== email.toLowerCase());
      saveUsers(filtered);
      renderDashboard();
    });
  });

  // Report handlers
  document.querySelectorAll('.approve-report').forEach((button) => {
    button.addEventListener('click', () => {
      const reportId = button.dataset.reportId;
      const reports = getReports();
      const report = reports.find((r) => r.id === reportId);
      if (report) {
        report.status = 'approved';
        report.reviewedAt = new Date().toISOString();
        saveReports(reports);
        window.alert('Report approved and marked as reviewed.');
        renderDashboard();
      }
    });
  });

  document.querySelectorAll('.reject-report').forEach((button) => {
    button.addEventListener('click', () => {
      const reportId = button.dataset.reportId;
      const reports = getReports();
      const filtered = reports.filter((r) => r.id !== reportId);
      saveReports(filtered);
      window.alert('Report rejected and removed.');
      renderDashboard();
    });
  });

  document.querySelectorAll('.view-report').forEach((button) => {
    button.addEventListener('click', () => {
      const reportId = button.dataset.reportId;
      const reports = getReports();
      const report = reports.find((r) => r.id === reportId);
      if (report) {
        alert(`Report: ${report.title}\n\nType: ${report.type}\nSubmitted by: ${report.submitterName}\nDate: ${report.date}\n\n${report.content}`);
      }
    });
  });
}

function attachDrivePhotoHandlers() {
  const drivePhotoForm = document.getElementById('drive-photo-form');
  if (drivePhotoForm) {
    drivePhotoForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('drive-photo-title').value.trim();
      const group = document.getElementById('drive-photo-group').value;
      const url = document.getElementById('drive-photo-url').value.trim();

      if (!title || !url) {
        window.alert('Please fill in all fields.');
        return;
      }

      // Validate it's a Google Drive link
      if (!url.includes('drive.google.com')) {
        window.alert('Please enter a valid Google Drive link.');
        return;
      }

      const photos = getDrivePhotos();
      const newPhoto = {
        id: `drive-photo-${Date.now()}`,
        title,
        group,
        url,
        addedAt: new Date().toISOString()
      };

      photos.push(newPhoto);
      saveDrivePhotos(photos);

      window.alert('Photo added to gallery! It will now appear in the public photo gallery.');
      drivePhotoForm.reset();
      renderDashboard();
    });
  }

  document.querySelectorAll('.remove-drive-photo').forEach((button) => {
    button.addEventListener('click', () => {
      const photoId = button.dataset.photoId;
      const photos = getDrivePhotos();
      const filtered = photos.filter((p) => p.id !== photoId);
      saveDrivePhotos(filtered);
      window.alert('Photo removed from gallery.');
      renderDashboard();
    });
  });
}

function attachArchiveHandlers() {
  const archiveForm = document.getElementById('archive-item-form');
  if (archiveForm) {
    archiveForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('archive-title').value.trim();
      const type = document.getElementById('archive-type').value;
      const category = document.getElementById('archive-category').value;
      const link = document.getElementById('archive-link').value.trim();
      const description = document.getElementById('archive-description').value.trim();

      if (!title || !type || !category || !link) {
        window.alert('Please fill in all required fields.');
        return;
      }

      if (!link.includes('drive.google.com')) {
        window.alert('Please enter a valid Google Drive link.');
        return;
      }

      const archives = getArchives();
      const newItem = {
        id: `archive-${Date.now()}`,
        title,
        type,
        category,
        driveLink: link,
        description,
        addedAt: new Date().toISOString()
      };

      archives.push(newItem);
      saveArchives(archives);

      window.alert('Item added to archives! It is now available in the RYSA Archives & Reference Library.');
      archiveForm.reset();
      renderDashboard();
    });
  }

  document.querySelectorAll('.remove-archive').forEach((button) => {
    button.addEventListener('click', () => {
      if (!confirm('Remove this item from archives?')) return;
      const archiveId = button.dataset.archiveId;
      const archives = getArchives();
      const filtered = archives.filter((a) => a.id !== archiveId);
      saveArchives(filtered);
      window.alert('Item removed from archives.');
      renderDashboard();
    });
  });

  // Archive list filter by type
  document.querySelectorAll('.filter-type-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterType = btn.dataset.filter;
      const archives = getArchives();
      const filtered = archives.filter((a) => a.type === filterType);
      const archivesList = document.getElementById('archives-list');

      if (!filtered.length) {
        archivesList.innerHTML = `<p class="auth-subtitle">No ${filterType}s in archives yet.</p>`;
        return;
      }

      const typeEmojis = { photo: '📸', report: '📊', document: '📄' };
      archivesList.innerHTML = `
        <div style="display: grid; gap: 12px;">
          ${filtered
            .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
            .map((item) => `
              <div style="border: 1px solid var(--line); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span style="font-size: 1.2rem;">${typeEmojis[item.type]}</span>
                    <strong>${item.title}</strong>
                    <span class="pill" style="font-size: 0.75rem;">${item.type}</span>
                  </div>
                  <small style="color: var(--muted); display: block; margin-bottom: 4px;">
                    ${item.category} • ${new Date(item.addedAt).toLocaleDateString()}
                  </small>
                  ${item.description ? `<small style="display: block; color: #666; margin-bottom: 8px;">${item.description}</small>` : ''}
                </div>
                <a href="${item.driveLink}" target="_blank" class="login-button" style="display: inline-block; white-space: nowrap; margin-left: 12px; text-decoration: none; font-size: 0.9rem;">Open</a>
              </div>
            `).join('')}
        </div>
      `;
    });
  });
}


function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getPendingApprovals() {
  return getUsers().filter((user) => user.status === 'pending');
}

function isUserApprover(userEmail) {
  // Admin and aligulaemmanuel@gmail.com can approve requests
  return userEmail === 'admin@rysa.org' || userEmail === 'aligulaemmanuel@gmail.com';
}

function setUserLabel(name) {
  const labelMap = {
    admin: 'Org Admin',
    manager: 'Station Manager',
    coach: 'Team Coach',
    fans: 'Public View'
  };

  const displayName = name.length > 18 ? `${name.slice(0, 18)}...` : name;
  userLabel.textContent = `${displayName} • ${labelMap[appState.role]}`;
}

function getRememberedMember() {
  const raw = localStorage.getItem(REMEMBERED_MEMBER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveRememberedMember(member) {
  localStorage.setItem(REMEMBERED_MEMBER_KEY, JSON.stringify(member));
}

function clearRememberedMember() {
  localStorage.removeItem(REMEMBERED_MEMBER_KEY);
}

function restoreRememberedMember() {
  const remembered = getRememberedMember();

  if (!remembered || !remembered.email || !remembered.password) {
    return;
  }

  loginEmail.value = remembered.email;
  loginPassword.value = remembered.password;
  rememberMemberCheckbox.checked = true;

  const users = getUsers();
  const matchedUser = users.find(
    (user) => user.email.toLowerCase() === remembered.email.toLowerCase() && user.password === remembered.password
  );

  if (!matchedUser) {
    clearRememberedMember();
    rememberMemberCheckbox.checked = false;
    return;
  }

  if (matchedUser.status === 'pending') {
    clearRememberedMember();
    rememberMemberCheckbox.checked = false;
    window.alert('This saved member is waiting for admin verification before access is granted.');
    return;
  }

  appState.role = matchedUser.role;
  appState.currentUser = matchedUser;
  appState.managerStation = matchedUser.lane && matchedUser.lane !== 'All' ? matchedUser.lane : 'Education';
  appState.loggedIn = true;
  setUserLabel(matchedUser.name);
  setViewState();
}

function showLandingPage() {
  appState.showLanding = true;
  landingScreen.classList.remove('hidden');
  loginScreen.classList.add('hidden');
  appShell.classList.add('hidden');
}

function showLoginPage() {
  appState.showLanding = false;
  landingScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  appShell.classList.add('hidden');
}

function setViewState() {
  if (appState.loggedIn) {
    landingScreen.classList.add('hidden');
    loginScreen.classList.add('hidden');
    appShell.classList.remove('hidden');
    renderDashboard();
  } else if (appState.showLanding) {
    showLandingPage();
  } else {
    showLoginPage();
  }
}

function setAuthMode(mode) {
  appState.authMode = mode;
  const isSignUp = mode === 'signup';
  const isResetPw = mode === 'resetpw';

  signinPanel.classList.toggle('hidden', isSignUp || isResetPw);
  signupPanel.classList.toggle('hidden', !isSignUp);
  const resetpwPanel = document.getElementById('resetpw-panel');
  resetpwPanel.classList.toggle('hidden', !isResetPw);
  authTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.authMode === mode);
  });

  // Reset password form state when switching modes
  if (isResetPw) {
    document.getElementById('resetpw-step1').classList.remove('hidden');
    document.getElementById('resetpw-step2').classList.add('hidden');
    document.getElementById('resetpw-email-form').reset();
    document.getElementById('resetpw-form').reset();
  }
}

function handleSocialLogin(provider, role) {
  const users = getUsers();
  const generatedEmail = `${provider.toLowerCase()}-member@rysa.org`;
  const generatedName = `${provider} Member`;

  const existingUser = users.find((user) => user.email.toLowerCase() === generatedEmail.toLowerCase());

  if (existingUser) {
    if (existingUser.status === 'pending') {
      window.alert('Your social sign-in is waiting for admin approval.');
      return;
    }

    appState.role = existingUser.role;
    appState.currentUser = existingUser;
    appState.loggedIn = true;
    setUserLabel(existingUser.name);
    setViewState();
    return;
  }

  const newUser = {
    name: generatedName,
    email: generatedEmail,
    role,
    lane: 'All',
    requestedRole: role,
    status: 'pending',
    password: `${provider.toLowerCase()}-social-login`
  };

  users.push(newUser);
  saveUsers(users);

  window.alert(`${provider} sign-in requested. Admin must approve your access before you can enter the dashboard.`);
  setAuthMode('signin');
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    window.alert('Please enter both email and password.');
    return;
  }

  const users = getUsers();
  const matchedUser = users.find((user) => user.email.toLowerCase() === email && user.password === password);

  if (!matchedUser) {
    window.alert('No account matches that email and password. Please sign up first.');
    return;
  }

  if (matchedUser.status === 'pending') {
    window.alert('This account is awaiting admin verification before access is granted.');
    return;
  }

  if (rememberMemberCheckbox.checked) {
    saveRememberedMember({ email, password });
  } else {
    clearRememberedMember();
  }

  appState.role = matchedUser.role;
  appState.currentUser = matchedUser;
  appState.managerStation = matchedUser.lane && matchedUser.lane !== 'All' ? matchedUser.lane : 'Education';
  appState.loggedIn = true;
  setUserLabel(matchedUser.name);
  setViewState();
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = signupName.value.trim();
  const email = signupEmail.value.trim().toLowerCase();
  const requestedRole = signupRole.value;
  const lane = signupLane.value;
  const password = signupPassword.value.trim();

  if (!name || !email || !password) {
    window.alert('Please complete all sign-up fields.');
    return;
  }

  const users = getUsers();
  const exists = users.some((user) => user.email.toLowerCase() === email);

  if (exists) {
    window.alert('An account with that email already exists. Please sign in instead.');
    setAuthMode('signin');
    return;
  }

  users.push({
    name,
    email,
    password,
    role: 'pending',
    requestedRole,
    lane,
    status: 'pending'
  });

  saveUsers(users);

  window.alert('Your access request has been sent to the admin for verification.');
  signupForm.reset();
  setAuthMode('signin');
});

logoutButton.addEventListener('click', () => {
  appState.loggedIn = false;
  appState.showLanding = true;
  loginForm.reset();
  signupForm.reset();
  rememberMemberCheckbox.checked = !!getRememberedMember();
  setAuthMode('signin');
  setViewState();
});

authTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    setAuthMode(tab.dataset.authMode);
  });
});

socialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleSocialLogin(button.dataset.socialProvider, button.dataset.socialRole);
  });
});

forgotPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();
  setAuthMode('resetpw');
});

backToSigninLink.addEventListener('click', (event) => {
  event.preventDefault();
  setAuthMode('signin');
});

resetpwEmailForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = resetpwEmail.value.trim().toLowerCase();

  if (!email) {
    window.alert('Please enter your email address.');
    return;
  }

  const users = getUsers();
  const matchedUser = users.find((user) => user.email.toLowerCase() === email);

  if (!matchedUser) {
    window.alert('No account found with that email. Please sign up first.');
    return;
  }

  // Store the email for the next step
  sessionStorage.setItem('resetpw-email', email);

  // Show step 2
  document.getElementById('resetpw-step1').classList.add('hidden');
  document.getElementById('resetpw-step2').classList.remove('hidden');
});

resetpwForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newPassword = resetpwNewPassword.value.trim();
  const confirmPassword = resetpwConfirmPassword.value.trim();
  const email = sessionStorage.getItem('resetpw-email');

  if (!newPassword || !confirmPassword) {
    window.alert('Please enter both password fields.');
    return;
  }

  if (newPassword !== confirmPassword) {
    window.alert('Passwords do not match.');
    return;
  }

  if (newPassword.length < 6) {
    window.alert('Password must be at least 6 characters.');
    return;
  }

  const users = getUsers();
  const userIndex = users.findIndex((user) => user.email.toLowerCase() === email);

  if (userIndex >= 0) {
    users[userIndex].password = newPassword;
    saveUsers(users);

    // Clear session storage
    sessionStorage.removeItem('resetpw-email');

    window.alert('Your password has been reset successfully! Please sign in with your new password.');
    resetpwForm.reset();
    resetpwEmailForm.reset();
    setAuthMode('signin');
  }
});

function autoLoginEmmanuel() {
  const EMMANUEL_EMAIL = 'aligulaemmanuel@gmail.com';
  const users = getUsers();
  
  let emmanuelUser = users.find((user) => user.email.toLowerCase() === EMMANUEL_EMAIL.toLowerCase());
  
  // If user doesn't exist, create them
  if (!emmanuelUser) {
    emmanuelUser = {
      name: 'Emmanuel Asuva',
      email: EMMANUEL_EMAIL,
      password: 'no-password-required',
      role: 'admin',
      lane: 'All',
      requestedRole: 'admin',
      status: 'approved'
    };
    users.push(emmanuelUser);
    saveUsers(users);
  }
  
  // Auto-login Emmanuel
  appState.role = emmanuelUser.role;
  appState.currentUser = emmanuelUser;
  appState.managerStation = emmanuelUser.lane && emmanuelUser.lane !== 'All' ? emmanuelUser.lane : 'Education';
  appState.loggedIn = true;
  appState.currentSection = 'dashboard';
  setUserLabel(emmanuelUser.name);
  setViewState();
  renderDashboard();
}

document.querySelectorAll('.nav-button').forEach((button) => {
  button.addEventListener('click', () => {
    const targetRole = button.dataset.role;
    
    // Prevent fans from switching roles
    if (appState.role === 'fans') {
      window.alert('Fans users can only access the Community & Fans dashboard.');
      return;
    }
    
    // Prevent coach and manager from accessing admin
    if (targetRole === 'admin' && appState.role !== 'admin') {
      window.alert('Admin access is restricted to admin users only.');
      return;
    }
    
    // Prevent coach, manager, and fans from accessing investor
    if (targetRole === 'investor' && appState.role !== 'admin' && appState.role !== 'investor') {
      window.alert('Investor access is restricted to admin and investor users only.');
      return;
    }
    
    appState.role = targetRole;
    appState.currentSection = 'dashboard';
    renderDashboard();
  });
});

// Section navigation (Dashboard vs Verification)
document.querySelectorAll('.section-button').forEach((button) => {
  button.addEventListener('click', () => {
    const isFans = appState.role === 'fans';
    const isInvestorRestricted = appState.role !== 'admin' && appState.role !== 'investor';
    const section = button.dataset.section;
    
    // Restrict investors section to admin and investor only
    if (isInvestorRestricted && section === 'investors') {
      window.alert('Investor access is restricted to admin and investor users only.');
      return;
    }
    
    // Restrict fans from accessing admin-only sections
    if (isFans && ['group-notifications', 'group-gallery', 'event-group', 'verification', 'group-approvals'].includes(section)) {
      window.alert('This section is not available for Community & Fans users.');
      return;
    }
    
    appState.currentSection = section;
    renderDashboard();
  });
});

function initializeGroupMemberships() {
  const users = getUsers();
  const memberships = getGroupMemberships();

  users.forEach((user) => {
    if (user.role === 'admin') {
      GROUP_NAMES.forEach((groupName) => {
        const exists = memberships.find(
          (entry) => entry.email.toLowerCase() === user.email.toLowerCase() && entry.group === groupName
        );

        if (!exists) {
          memberships.push({ email: user.email, group: groupName, status: 'approved' });
        } else if (exists.status !== 'approved') {
          exists.status = 'approved';
        }
      });
    }
  });

  saveGroupMemberships(memberships);
}

setAuthMode('signin');
ensureGroupStorageData();
initializeGroupMemberships();
restoreRememberedMember();

// Show landing page by default
if (!appState.loggedIn) {
  appState.showLanding = true;
}

// Landing page navigation
document.getElementById('nav-signin-btn').addEventListener('click', showLoginPage);
document.getElementById('nav-signup-btn').addEventListener('click', () => {
  setAuthMode('signup');
  showLoginPage();
});
document.getElementById('landing-cta-btn').addEventListener('click', showLoginPage);

setViewState();
