// ═══════════════════ DATA ═══════════════════
const JOBS = [
    { id: 1, title: 'Software Engineer', company: 'Google', location: 'Bangalore', salary: '25-35 LPA', type: 'Full-Time', skills: ['Python', 'Go', 'DSA'], logo: 'G', color: '#4285f4', posted: '2d ago' },
    { id: 2, title: 'Frontend Developer', company: 'Microsoft', location: 'Hyderabad', salary: '18-28 LPA', type: 'Full-Time', skills: ['React', 'TypeScript', 'CSS'], logo: 'M', color: '#00a4ef', posted: '1d ago' },
    { id: 3, title: 'ML Engineer', company: 'Amazon', location: 'Bangalore', salary: '30-45 LPA', type: 'Full-Time', skills: ['Python', 'TensorFlow', 'AWS'], logo: 'A', color: '#ff9900', posted: '3h ago' },
    { id: 4, title: 'Backend Developer', company: 'Flipkart', location: 'Bangalore', salary: '15-22 LPA', type: 'Full-Time', skills: ['Java', 'Spring', 'MySQL'], logo: 'F', color: '#f7d046', posted: '5h ago' },
    { id: 5, title: 'Data Analyst Intern', company: 'Deloitte', location: 'Mumbai', salary: '6-8 LPA', type: 'Internship', skills: ['SQL', 'Excel', 'Python'], logo: 'D', color: '#86bc25', posted: '1d ago' },
    { id: 6, title: 'DevOps Engineer', company: 'Atlassian', location: 'Remote', salary: '20-30 LPA', type: 'Full-Time', skills: ['Docker', 'K8s', 'CI/CD'], logo: 'At', color: '#0052cc', posted: '4h ago' },
    { id: 7, title: 'Full Stack Developer', company: 'Razorpay', location: 'Bangalore', salary: '16-24 LPA', type: 'Full-Time', skills: ['Node.js', 'React', 'MongoDB'], logo: 'R', color: '#3395ff', posted: '2d ago' },
    { id: 8, title: 'AI Research Intern', company: 'NVIDIA', location: 'Pune', salary: '8-12 LPA', type: 'Internship', skills: ['Python', 'PyTorch', 'CUDA'], logo: 'N', color: '#76b900', posted: '6h ago' },
];

const VIDEOS = [
    { title: 'Data Structures & Algorithms Complete Course', channel: 'freeCodeCamp', views: '2.1M', duration: '12:30:00', category: 'DSA', thumb: '📊' },
    { title: 'React.js Full Tutorial for Beginners', channel: 'Traversy Media', views: '1.8M', duration: '4:15:00', category: 'Web Dev', thumb: '⚛️' },
    { title: 'Machine Learning A-Z™', channel: 'Krish Naik', views: '900K', duration: '8:45:00', category: 'Machine Learning', thumb: '🤖' },
    { title: 'System Design Interview Masterclass', channel: 'Gaurav Sen', views: '1.2M', duration: '3:20:00', category: 'System Design', thumb: '🏗️' },
    { title: 'JavaScript Interview Questions', channel: 'Akshay Saini', views: '3.4M', duration: '2:45:00', category: 'Interview Prep', thumb: '💡' },
    { title: 'Python for Data Science', channel: 'Sentdex', views: '750K', duration: '6:10:00', category: 'Machine Learning', thumb: '🐍' },
    { title: 'Node.js Crash Course', channel: 'The Net Ninja', views: '1.1M', duration: '1:30:00', category: 'Web Dev', thumb: '🟢' },
    { title: 'Dynamic Programming Patterns', channel: 'NeetCode', views: '580K', duration: '5:20:00', category: 'DSA', thumb: '🧩' },
    { title: 'CSS Advanced Animations', channel: 'Kevin Powell', views: '420K', duration: '2:10:00', category: 'Web Dev', thumb: '🎨' },
];

const COURSES = [
    { title: 'CS50: Intro to Computer Science', platform: 'edx', instructor: 'David Malan', rating: 4.9, students: '3.2M', duration: '12 weeks', badge: '🏆', skills: ['C', 'Python', 'SQL'] },
    { title: 'Machine Learning Specialization', platform: 'coursera', instructor: 'Andrew Ng', rating: 4.8, students: '1.5M', duration: '3 months', badge: '🤖', skills: ['Python', 'TensorFlow'] },
    { title: 'The Complete Web Developer', platform: 'udemy', instructor: 'Angela Yu', rating: 4.7, students: '800K', duration: '65 hours', badge: '🌐', skills: ['HTML', 'CSS', 'JS', 'React'] },
    { title: 'Data Structures in Java', platform: 'coursera', instructor: 'UC San Diego', rating: 4.6, students: '450K', duration: '6 weeks', badge: '📚', skills: ['Java', 'DSA'] },
    { title: 'AWS Cloud Practitioner', platform: 'udemy', instructor: 'Stephane Maarek', rating: 4.7, students: '600K', duration: '14 hours', badge: '☁️', skills: ['AWS', 'Cloud'] },
    { title: 'Deep Learning Specialization', platform: 'coursera', instructor: 'Andrew Ng', rating: 4.9, students: '900K', duration: '4 months', badge: '🧠', skills: ['Python', 'TensorFlow'] },
];

const QUIZ_DATA = {
    aptitude: [
        { q: 'If 5 machines can produce 5 widgets in 5 minutes, how many minutes would it take 100 machines to produce 100 widgets?', options: ['5 minutes', '100 minutes', '20 minutes', '500 minutes'], correct: 0 },
        { q: 'What is 15% of 200?', options: ['25', '30', '35', '20'], correct: 1 },
        { q: 'A train travels 120 km in 2 hours. What is its speed?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correct: 2 },
        { q: 'If a = 3 and b = 4, what is a² + b²?', options: ['25', '7', '12', '49'], correct: 0 },
        { q: 'Complete the series: 2, 6, 12, 20, ?', options: ['28', '30', '32', '24'], correct: 1 },
    ],
    verbal: [
        { q: 'Choose the synonym of "Ubiquitous":', options: ['Rare', 'Omnipresent', 'Unique', 'Obscure'], correct: 1 },
        { q: 'Identify the error: "He don\'t know the answer."', options: ['He', 'don\'t', 'know', 'answer'], correct: 1 },
        { q: '"Ephemeral" most nearly means:', options: ['Permanent', 'Short-lived', 'Beautiful', 'Complex'], correct: 1 },
        { q: 'Choose the antonym of "Verbose":', options: ['Wordy', 'Concise', 'Loud', 'Complex'], correct: 1 },
        { q: 'Which is correctly punctuated?', options: ['Its raining.', 'It\'s raining.', 'Its\' raining.', 'It is\' raining.'], correct: 1 },
    ],
    logical: [
        { q: 'All roses are flowers. Some flowers fade quickly. Which follows?', options: ['All roses fade quickly', 'Some roses fade quickly', 'No conclusion', 'Roses never fade'], correct: 2 },
        { q: 'If A > B, B > C, and C > D, then:', options: ['D > A', 'A > D', 'A = D', 'Cannot determine'], correct: 1 },
        { q: 'Which number is the odd one out: 3, 5, 7, 11, 14, 17?', options: ['3', '11', '14', '17'], correct: 2 },
        { q: 'If APPLE = 50, BANANA = ?', options: ['55', '60', '42', '48'], correct: 2 },
        { q: 'Next in pattern: 1,1,2,3,5,8,?', options: ['10', '11', '12', '13'], correct: 3 },
    ],
    coding: [
        { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
        { q: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1 },
        { q: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language'], correct: 0 },
        { q: 'Which is NOT a JavaScript data type?', options: ['Boolean', 'Float', 'String', 'Symbol'], correct: 1 },
        { q: 'Big-O of inserting at beginning of array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 2 },
    ]
};

const INTERVIEW_QS = {
    hr: ['Tell me about yourself.', 'Why do you want to work here?', 'What are your strengths and weaknesses?', 'Where do you see yourself in 5 years?', 'Describe a challenging situation you faced.', 'Why should we hire you?', 'What motivates you?', 'Tell me about your biggest achievement.', 'How do you handle pressure?', 'Do you have any questions for us?'],
    tech: ['Explain the difference between stack and heap memory.', 'What is the time complexity of quicksort?', 'Explain REST API principles.', 'What is a closure in JavaScript?', 'Describe the SOLID principles.', 'What is database normalization?', 'Explain the difference between SQL and NoSQL.', 'What is the CAP theorem?', 'How does garbage collection work?', 'Explain polymorphism with an example.'],
    system: ['Design a URL shortening service.', 'How would you design Twitter\'s feed?', 'Design a chat application like WhatsApp.', 'How would you scale a database?', 'Design an e-commerce recommendation engine.'],
    behavioral: ['Tell me about a time you led a team.', 'Describe a conflict with a coworker.', 'How do you prioritize multiple deadlines?', 'Tell me about a failure and what you learned.', 'Describe a time you went above and beyond.']
};

const CHATBOT_RESPONSES = {
    'hello': 'Hello! 👋 I\'m PlaceAI Assistant. How can I help you with your placement preparation today?',
    'help': 'I can help you with:\n🔹 Job search tips\n🔹 Interview preparation\n🔹 Resume review\n🔹 Mock test guidance\n🔹 Career advice\nJust ask away!',
    'interview': 'Great question! For interview prep:\n1. Practice with our AI Interview Simulator\n2. Record yourself in Video Practice\n3. Review your Sentiment Analysis\n4. Take mock assessments\nShall I guide you to any of these?',
    'resume': 'To improve your resume:\n✅ Use action verbs\n✅ Quantify achievements\n✅ Tailor for each job\n✅ Check ATS compatibility\nVisit our AI/ML Services Hub for a detailed ATS analysis!',
    'job': 'Check our Job Listings for 24+ opportunities! Use filters for location, salary, and role type. Our Market Intelligence page shows trending roles and salary insights.',
    'default': 'I\'m here to help with placement preparation! Try asking about interviews, resume tips, job search, or test preparation. 🎯'
};

// ═══════════════════ STATE ═══════════════════
let currentPage = 'dashboard';
let quizState = { active: false, category: 'aptitude', current: 0, score: 0, timer: null, seconds: 0 };
let interviewState = { active: false, category: 'hr', qIndex: 0, timer: null, seconds: 0 };
let calendarDate = new Date(2026, 1, 1);
let events = [
    { title: 'Google Interview', date: '2026-02-18', time: '10:00', type: 'Interview' },
    { title: 'Mock Test - DSA', date: '2026-02-20', time: '14:00', type: 'Mock Test' },
    { title: 'TCS Placement Drive', date: '2026-02-25', time: '09:00', type: 'Placement Drive' },
    { title: 'Resume Submission', date: '2026-02-15', time: '23:59', type: 'Deadline' },
];

// ═══════════════════ NAVIGATION ═══════════════════
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (!page) return;
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const el = document.getElementById('page-' + page);
        if (el) el.classList.add('active');
        currentPage = page;
        if (window.innerWidth < 768) document.getElementById('sidebar').classList.remove('mobile-open');
    });
});

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    if (window.innerWidth < 768) sb.classList.toggle('mobile-open');
    else sb.classList.toggle('collapsed');
}

// ═══════════════════ MODALS ═══════════════════
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('active'); });
});

// ═══════════════════ TOAST ═══════════════════
function showToast(msg, type = 'info') {
    const c = document.getElementById('toastContainer');
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    const colors = { success: 'icon-emerald', error: 'icon-rose', info: 'icon-indigo' };
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.innerHTML = `<div class="toast-icon ${colors[type]}"><i class="fas ${icons[type]}"></i></div><div class="toast-msg">${msg}</div><span class="toast-close" onclick="this.parentElement.remove()">×</span>`;
    c.appendChild(t);
    setTimeout(() => t.remove(), 4000);
}

// ═══════════════════ DASHBOARD ═══════════════════
function initDashboard() {
    const stats = [
        { icon: 'fa-briefcase', label: 'Jobs Applied', value: '47', change: '+5 this week', up: true, color: 'icon-indigo' },
        { icon: 'fa-clipboard-check', label: 'Tests Taken', value: '23', change: '+3 this week', up: true, color: 'icon-emerald' },
        { icon: 'fa-comments', label: 'Interviews', value: '12', change: '+2 this week', up: true, color: 'icon-violet' },
        { icon: 'fa-star', label: 'Avg Score', value: '82%', change: '+4% improvement', up: true, color: 'icon-cyan' },
    ];
    document.getElementById('dashStats').innerHTML = stats.map(s => `
    <div class="card stat-card"><div class="stat-icon ${s.color}"><i class="fas ${s.icon}"></i></div>
    <div class="stat-value text-gradient">${s.value}</div><div class="stat-label">${s.label}</div>
    <div class="stat-change ${s.up ? 'up' : 'down'}">${s.change}</div></div>`).join('');

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const vals = [65, 80, 45, 90, 70, 30, 55];
    document.getElementById('weeklyChart').innerHTML = vals.map((v, i) =>
        `<div class="bar" style="height:${v}%"><div class="bar-value">${v}%</div><div class="bar-label">${days[i]}</div></div>`).join('');

    const activities = [
        { time: '2 hours ago', text: 'Completed DSA Mock Test — Score: 85%' },
        { time: '5 hours ago', text: 'Applied to Google — Software Engineer' },
        { time: 'Yesterday', text: 'AI Interview Practice — HR Round completed' },
        { time: '2 days ago', text: 'Resume updated — ATS Score improved to 80%' },
        { time: '3 days ago', text: 'Completed React.js course on Coursera' },
    ];
    document.getElementById('activityTimeline').innerHTML = activities.map(a =>
        `<div class="timeline-item"><div class="tl-time">${a.time}</div><div class="tl-text">${a.text}</div></div>`).join('');
}

// ═══════════════════ PROFILE ═══════════════════
function initProfile() {
    const skills = ['JavaScript', 'React', 'Python', 'Node.js', 'SQL', 'Machine Learning', 'Docker', 'Git'];
    document.getElementById('skillTags').innerHTML = skills.map(s => `<span class="tag">${s}</span>`).join('');
    document.getElementById('resumeUpload').addEventListener('change', function () {
        if (this.files[0]) {
            document.getElementById('resumeStatus').innerHTML = `<div class="alert-bar success"><i class="fas fa-check"></i> ${this.files[0].name} uploaded</div>`;
            showToast('Resume uploaded successfully!', 'success');
        }
    });
}

// ═══════════════════ JOBS ═══════════════════
function renderJobs(jobs) {
    document.getElementById('jobGrid').innerHTML = jobs.map(j => `
    <div class="card" style="cursor:pointer">
      <div class="flex-between mb-16">
        <div class="flex-gap"><div class="card-icon" style="background:${j.color}20;color:${j.color};font-weight:800;font-size:14px">${j.logo}</div>
        <div><div class="card-title">${j.title}</div><div class="text-xs" style="color:var(--text-muted)">${j.company} • ${j.location}</div></div></div>
        <span class="badge badge-cyan">${j.posted}</span>
      </div>
      <div class="flex-gap mb-16" style="flex-wrap:wrap">${j.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      <div class="flex-between">
        <span class="text-sm fw-700" style="color:var(--accent-emerald)">${j.salary}</span>
        <div class="btn-group"><button class="btn btn-sm btn-secondary"><i class="fas fa-bookmark"></i></button><button class="btn btn-sm btn-primary">Apply</button></div>
      </div>
      <span class="badge badge-${j.type === 'Internship' ? 'amber' : 'indigo'}" style="margin-top:12px">${j.type}</span>
    </div>`).join('');
}
function filterJobs() {
    const q = document.getElementById('jobSearch').value.toLowerCase();
    renderJobs(JOBS.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q))));
}

// ═══════════════════ MARKET INTELLIGENCE ═══════════════════
function initMarket() {
    const roles = [{ name: 'SDE', val: 85 }, { name: 'ML', val: 78 }, { name: 'DevOps', val: 65 }, { name: 'Data', val: 72 }, { name: 'Frontend', val: 60 }, { name: 'Cloud', val: 55 }];
    document.getElementById('trendingRolesChart').innerHTML = roles.map(r =>
        `<div class="bar" style="height:${r.val}%;background:var(--gradient-cool)"><div class="bar-value">${r.val}%</div><div class="bar-label">${r.name}</div></div>`).join('');
    const companies = [{ name: 'Google', jobs: 142, color: '#4285f4' }, { name: 'Microsoft', jobs: 98, color: '#00a4ef' }, { name: 'Amazon', jobs: 115, color: '#ff9900' }, { name: 'Meta', jobs: 67, color: '#1877f2' }, { name: 'Apple', jobs: 54, color: '#a2aaad' }];
    document.getElementById('topCompanies').innerHTML = companies.map(c => `
    <div class="flex-between" style="padding:10px 0;border-bottom:1px solid var(--border)">
      <div class="flex-gap"><div class="card-icon" style="background:${c.color}20;color:${c.color};font-weight:800;font-size:12px;width:32px;height:32px;border-radius:8px">${c.name[0]}</div><span class="text-sm fw-700">${c.name}</span></div>
      <span class="badge badge-indigo">${c.jobs} jobs</span>
    </div>`).join('');
}

// ═══════════════════ JOB BOARD APIs ═══════════════════
function initJobAPIs() {
    const apis = [{ name: 'Adzuna', status: 'Active', color: 'emerald', jobs: '45K', icon: 'fa-check-circle' }, { name: 'Jooble', status: 'Active', color: 'emerald', jobs: '32K', icon: 'fa-check-circle' }, { name: 'Coresignal', status: 'Syncing', color: 'amber', jobs: '28K', icon: 'fa-sync' }];
    document.getElementById('apiStatusCards').innerHTML = apis.map(a => `
    <div class="card stat-card"><div class="stat-icon icon-${a.color}"><i class="fas ${a.icon}"></i></div>
    <div class="stat-value text-gradient">${a.jobs}</div><div class="stat-label">${a.name}</div>
    <span class="badge badge-${a.color}" style="margin-top:8px">${a.status}</span></div>`).join('');
    const rows = [{ src: 'Adzuna', title: 'ML Engineer', company: 'DeepMind', loc: 'London', st: 'Active' }, { src: 'Jooble', title: 'React Dev', company: 'Spotify', loc: 'Stockholm', st: 'Active' }, { src: 'Coresignal', title: 'SDE II', company: 'Uber', loc: 'SF', st: 'Syncing' }, { src: 'Adzuna', title: 'Data Analyst', company: 'Netflix', loc: 'LA', st: 'Active' }];
    document.querySelector('#apiJobsTable tbody').innerHTML = rows.map(r => `<tr><td><span class="badge badge-indigo">${r.src}</span></td><td>${r.title}</td><td>${r.company}</td><td>${r.loc}</td><td><span class="badge badge-${r.st === 'Active' ? 'emerald' : 'amber'}">${r.st}</span></td></tr>`).join('');
}

// ═══════════════════ API COMPARISON ═══════════════════
function initAPICompare() {
    const features = ['Real-time Search', 'Salary Data', 'Company Info', 'Location Filter', 'Skills Match', 'Batch Export', 'Webhook Support', 'Free Tier'];
    const providers = ['Adzuna', 'Jooble', 'Coresignal', 'Indeed', 'LinkedIn'];
    const matrix = [[1, 1, 1, 1, 0], [1, 1, 0, 1, 1], [1, 0, 1, 1, 0], [1, 1, 1, 1, 1], [1, 0, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 1, 0], [1, 1, 0, 1, 0]];
    let html = '<thead><tr><th>Feature</th>' + providers.map(p => `<th>${p}</th>`).join('') + '</tr></thead><tbody>';
    features.forEach((f, i) => {
        html += '<tr><td>' + f + '</td>' + matrix[i].map(v => `<td><span class="${v ? 'check' : 'cross'}">${v ? '✓' : '✗'}</span></td>`).join('') + '</tr>';
    });
    html += '</tbody>';
    document.getElementById('apiCompareTable').innerHTML = html;
}

// ═══════════════════ INTERVIEW ═══════════════════
function startInterview() {
    interviewState = { active: true, category: 'hr', qIndex: 0, timer: null, seconds: 0 };
    const tab = document.querySelector('#interviewTabs .tab.active');
    if (tab) interviewState.category = tab.dataset.tab;
    document.getElementById('interviewChatArea').innerHTML = '';
    addInterviewMsg('bot', 'Welcome to the ' + interviewState.category.toUpperCase() + ' interview round! I\'ll be your AI interviewer today. Let\'s begin.');
    setTimeout(() => askNextQuestion(), 1000);
    interviewState.timer = setInterval(() => {
        interviewState.seconds++;
        document.getElementById('interviewTimer').textContent = formatTime(interviewState.seconds);
    }, 1000);
    showToast('Interview session started!', 'info');
}
function askNextQuestion() {
    const qs = INTERVIEW_QS[interviewState.category] || INTERVIEW_QS.hr;
    if (interviewState.qIndex < qs.length) {
        addInterviewMsg('bot', qs[interviewState.qIndex]);
        document.getElementById('qCount').textContent = (interviewState.qIndex + 1) + '/' + qs.length;
    } else { endInterview(); }
}
function sendInterviewMsg() {
    const input = document.getElementById('interviewInput');
    if (!input.value.trim() || !interviewState.active) return;
    addInterviewMsg('user', input.value);
    interviewState.qIndex++;
    input.value = '';
    const feedbacks = ['Good answer! You showed clear communication.', 'Nice structure. Consider adding a specific example.', 'Excellent use of the STAR method!', 'Good, but try to be more concise.', 'Well articulated. Your confidence shows!'];
    setTimeout(() => {
        const fb = feedbacks[Math.floor(Math.random() * feedbacks.length)];
        addInterviewMsg('bot', '<div class="feedback-card"><div class="fb-title">AI Feedback</div><p class="text-sm">' + fb + '</p><div class="confidence-meter mt-16"><div class="meter-fill" style="width:' + (60 + Math.random() * 35) + '%;background:var(--gradient-main)"></div></div></div>');
        setTimeout(() => askNextQuestion(), 800);
    }, 1200);
}
function addInterviewMsg(type, text) {
    const area = document.getElementById('interviewChatArea');
    area.innerHTML += `<div class="chat-msg ${type}"><div class="chat-bubble">${text}</div></div>`;
    area.scrollTop = area.scrollHeight;
}
function endInterview() {
    interviewState.active = false;
    clearInterval(interviewState.timer);
    addInterviewMsg('bot', 'Interview session complete! 🎉 You answered ' + interviewState.qIndex + ' questions in ' + formatTime(interviewState.seconds) + '. Great practice session!');
    showToast('Interview session completed!', 'success');
}
document.querySelectorAll('#interviewTabs .tab').forEach(t => {
    t.addEventListener('click', () => {
        document.querySelectorAll('#interviewTabs .tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
    });
});
document.getElementById('interviewInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendInterviewMsg(); });

// ═══════════════════ VIDEO PRACTICE ═══════════════════
let recording = false;
function toggleRecording() {
    recording = !recording;
    document.getElementById('recIcon').className = recording ? 'fas fa-stop' : 'fas fa-circle';
    document.getElementById('recLabel').textContent = recording ? 'Stop' : 'Record';
    showToast(recording ? 'Recording started...' : 'Recording stopped!', recording ? 'info' : 'success');
}

// ═══════════════════ ASSESSMENT / QUIZ ═══════════════════
function switchAssessment(cat) {
    document.querySelectorAll('.tabs .tab').forEach(t => { t.classList.remove('active'); if (t.dataset.tab === cat) t.classList.add('active'); });
    quizState.category = cat;
}
function handleQuizAction() {
    if (!quizState.active) startQuiz();
    else nextQuestion();
}
function startQuiz() {
    quizState = { active: true, category: quizState.category, current: 0, score: 0, timer: null, seconds: 0 };
    quizState.timer = setInterval(() => { quizState.seconds++; document.getElementById('quizTimer').textContent = '⏱ ' + formatTime(quizState.seconds); }, 1000);
    document.getElementById('quizAction').textContent = 'Next';
    document.getElementById('quizScore').textContent = '—';
    showQuestion();
    showToast('Quiz started! Good luck!', 'info');
}
function showQuestion() {
    const qs = QUIZ_DATA[quizState.category] || QUIZ_DATA.aptitude;
    if (quizState.current >= qs.length) { endQuiz(); return; }
    const q = qs[quizState.current];
    document.getElementById('quizQuestion').textContent = 'Q' + (quizState.current + 1) + ': ' + q.q;
    document.getElementById('quizOptions').innerHTML = q.options.map((o, i) => `<div class="card" style="padding:12px 16px;margin-bottom:8px;cursor:pointer" onclick="selectOption(this,${i},${q.correct})" data-idx="${i}"><div class="flex-gap"><span class="badge badge-indigo" style="width:28px;justify-content:center">${String.fromCharCode(65 + i)}</span><span class="text-sm">${o}</span></div></div>`).join('');
    document.getElementById('quizProgress').textContent = (quizState.current + 1);
    document.getElementById('quizProgressBar').style.width = ((quizState.current + 1) / qs.length * 100) + '%';
}
function selectOption(el, idx, correct) {
    document.querySelectorAll('#quizOptions .card').forEach(c => { c.style.pointerEvents = 'none'; c.style.opacity = '0.5'; });
    if (idx === correct) { el.style.borderColor = 'var(--accent-emerald)'; el.style.opacity = '1'; quizState.score++; }
    else { el.style.borderColor = 'var(--accent-rose)'; el.style.opacity = '1'; document.querySelector(`#quizOptions .card[data-idx="${correct}"]`).style.borderColor = 'var(--accent-emerald)'; document.querySelector(`#quizOptions .card[data-idx="${correct}"]`).style.opacity = '1'; }
}
function nextQuestion() { quizState.current++; showQuestion(); }
function endQuiz() {
    quizState.active = false; clearInterval(quizState.timer);
    const qs = QUIZ_DATA[quizState.category] || QUIZ_DATA.aptitude;
    const pct = Math.round(quizState.score / qs.length * 100);
    document.getElementById('quizQuestion').textContent = 'Quiz Complete!';
    document.getElementById('quizOptions').innerHTML = `<div class="text-center"><div class="stat-value text-gradient" style="font-size:48px">${pct}%</div><p class="text-sm mt-16" style="color:var(--text-secondary)">${quizState.score}/${qs.length} correct in ${formatTime(quizState.seconds)}</p></div>`;
    document.getElementById('quizAction').textContent = 'Start Quiz';
    document.getElementById('quizScore').textContent = pct + '%';
    showToast(`Quiz finished! Score: ${pct}%`, pct >= 60 ? 'success' : 'error');
}

// ═══════════════════ CODE EDITOR ═══════════════════
const BOILERPLATES = {
    'JavaScript': '// JavaScript execution\nconsole.log("Hello from PlaceAI!");\n\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log("Result:", twoSum([2, 7, 11, 15], 9));',
    'Python': '# Python execution\nimport sys\nprint(f"Python Version: {sys.version}")\n\ndef two_sum(nums, target):\n    prev_map = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prev_map:\n            return [prev_map[diff], i]\n        prev_map[n] = i\n    return []\n\nprint(f"Result: {two_sum([2, 7, 11, 15], 9)}")',
    'Java': '// Java execution\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java in PlaceAI!");\n    }\n}',
    'C++': '// C++ execution\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++ in PlaceAI!" << endl;\n    return 0;\n}'
};

document.getElementById('langSelect').addEventListener('change', function () {
    const lang = this.value;
    document.getElementById('langLabel').textContent = lang;
    // Auto-update boilerplate if editor is empty or just has old boilerplate
    const current = document.getElementById('codeInput').value;
    if (!current.trim() || Object.values(BOILERPLATES).some(b => b.trim() === current.trim())) {
        resetCode();
    }
});

async function runCode() {
    const code = document.getElementById('codeInput').value;
    const lang = document.getElementById('langSelect').value;
    const out = document.getElementById('codeOutput');
    const langMap = { 'JavaScript': 'javascript', 'Python': 'python', 'Java': 'java', 'C++': 'cpp' };

    out.textContent = `> Preparing ${lang} environment...\n`;
    showToast(`Running ${lang} code...`, 'info');

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: langMap[lang] || 'javascript',
                version: '*',
                files: [{ content: code }]
            })
        });

        const data = await response.json();

        if (data.run) {
            const isError = data.run.code !== 0;
            const output = data.run.stdout || data.run.stderr || '> No output received.';

            if (isError) {
                out.textContent = `> Execution Error [${lang}]\n\n${output}`;
                out.style.color = 'var(--accent-rose)';
                showToast('Execution failed with errors', 'error');
                document.getElementById('testsPassed').textContent = 'Failed';
            } else {
                out.textContent = `> Execution Successful [${lang}]\n\n${output}`;
                out.style.color = 'var(--accent-emerald)';
                showToast('Code executed successfully!', 'success');
                document.getElementById('testsPassed').textContent = 'Verified';
                document.getElementById('execTime').textContent = 'Cloud';
                document.getElementById('codeQuality').textContent = 'Analyzed';
            }
        } else {
            throw new Error(data.message || 'Failed to execute code');
        }
    } catch (e) {
        out.textContent = `> Execution Error:\n${e.message}`;
        out.style.color = 'var(--accent-rose)';
        showToast('Execution failed', 'error');
    }
}

function clearCode() {
    document.getElementById('codeInput').value = '';
    document.getElementById('codeOutput').textContent = '// Output cleared';
    showToast('Editor cleared', 'info');
}

function resetCode() {
    const lang = document.getElementById('langSelect').value;
    document.getElementById('codeInput').value = BOILERPLATES[lang] || '// Write your code here';
    showToast('Boilerplate restored', 'info');
}

function copyCode() {
    const code = document.getElementById('codeInput').value;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
    }).catch(err => {
        showToast('Failed to copy', 'error');
    });
}

function submitCode() { showToast('Code submitted for cloud evaluation!', 'success'); document.getElementById('codeQuality').textContent = '95'; }

// ═══════════════════ YOUTUBE CURATION ═══════════════════
function renderVideos(vids) {
    document.getElementById('videoGrid').innerHTML = vids.map(v => `
    <div class="video-card"><div class="video-thumb"><span style="font-size:48px">${v.thumb}</span><div class="play-btn"><i class="fas fa-play"></i></div><span class="duration">${v.duration}</span></div>
    <div class="video-info"><div class="video-title">${v.title}</div><div class="video-meta">${v.channel} • ${v.views} views</div><span class="badge badge-violet" style="margin-top:6px">${v.category}</span></div></div>`).join('');
}
function filterVideos() {
    const q = document.getElementById('ytSearch').value.toLowerCase();
    const cat = document.getElementById('ytCategory').value;
    renderVideos(VIDEOS.filter(v => (v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q)) && (!cat || v.category === cat)));
}

// ═══════════════════ COURSE INTEGRATION ═══════════════════
function renderCourses(list) {
    document.getElementById('courseGrid').innerHTML = list.map(c => `
    <div class="card"><div class="flex-between mb-16"><span style="font-size:32px">${c.badge}</span><span class="badge badge-${c.platform === 'coursera' ? 'indigo' : c.platform === 'udemy' ? 'violet' : 'cyan'}">${c.platform}</span></div>
    <h4 style="font-size:14px;margin-bottom:4px">${c.title}</h4><p class="text-xs" style="color:var(--text-muted)">${c.instructor} • ${c.duration}</p>
    <div class="flex-gap mt-16" style="flex-wrap:wrap">${c.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
    <div class="flex-between mt-16"><span class="text-sm" style="color:var(--accent-amber)">⭐ ${c.rating}</span><span class="text-xs" style="color:var(--text-muted)">${c.students} students</span></div>
    <button class="btn btn-primary btn-sm mt-16" style="width:100%">Enroll Now</button></div>`).join('');
}
function filterCourses(p, btn) {
    document.querySelectorAll('#page-courses .tab').forEach(t => t.classList.remove('active')); // More specific selector
    if (btn) btn.classList.add('active');
    renderCourses(p === 'all' ? COURSES : COURSES.filter(c => c.platform === p));
}

// ═══════════════════ COURSE APIs ═══════════════════
function initCourseAPIs() {
    document.getElementById('apiPreview').textContent = JSON.stringify({
        kind: "youtube#searchListResponse", pageInfo: { totalResults: 245, resultsPerPage: 5 },
        items: [
            { id: { videoId: "dQw4w9WgXcQ" }, snippet: { title: "Complete DSA Course in Java", channelTitle: "Kunal Kushwaha", publishedAt: "2024-03-15" } },
            { id: { videoId: "abc123def" }, snippet: { title: "System Design Interview Guide", channelTitle: "Gaurav Sen", publishedAt: "2024-06-20" } },
            { id: { videoId: "xyz789abc" }, snippet: { title: "React.js Full Course 2025", channelTitle: "freeCodeCamp", publishedAt: "2025-01-10" } }
        ]
    }, null, 2);
}

// ═══════════════════ AI/ML SERVICES ═══════════════════
function initAIML() {
    const skills = [{ name: 'Data Structures', have: 85, need: 90 }, { name: 'System Design', have: 40, need: 75 }, { name: 'Machine Learning', have: 60, need: 70 }, { name: 'Communication', have: 70, need: 80 }, { name: 'Problem Solving', have: 75, need: 85 }];
    document.getElementById('skillGapBars').innerHTML = skills.map(s => `
    <div class="mb-16"><div class="flex-between mb-16"><span class="text-sm fw-700">${s.name}</span><span class="text-xs" style="color:var(--text-muted)">${s.have}% / ${s.need}% needed</span></div>
    <div class="progress-bar"><div class="progress-fill ${s.have >= s.need ? 'emerald' : 'warm'}" style="width:${s.have}%"></div></div></div>`).join('');

    const paths = [{ title: 'Full Stack Developer', match: 85, icon: '🌐' }, { title: 'ML Engineer', match: 68, icon: '🤖' }, { title: 'Cloud Architect', match: 55, icon: '☁️' }, { title: 'Data Scientist', match: 72, icon: '📊' }];
    document.getElementById('careerPaths').innerHTML = paths.map(p => `
    <div class="flex-between" style="padding:14px 0;border-bottom:1px solid var(--border)">
      <div class="flex-gap"><span style="font-size:24px">${p.icon}</span><div><div class="text-sm fw-700">${p.title}</div><div class="text-xs" style="color:var(--text-muted)">Based on your skills</div></div></div>
      <div class="flex-gap"><div class="progress-bar" style="width:100px"><div class="progress-fill ${p.match >= 70 ? 'emerald' : ''}" style="width:${p.match}%"></div></div><span class="text-sm fw-700 text-mono">${p.match}%</span></div>
    </div>`).join('');
}
function analyzeResume() { showToast('Resume analysis started...', 'info'); setTimeout(() => showToast('ATS Score: 80% — Good! Improve keywords for target roles.', 'success'), 2000); }

// ═══════════════════ PROCTORING ═══════════════════
function initProctoring() {
    const logs = [{ time: '14:32:15', text: 'Session started — All checks passed' }, { time: '14:35:42', text: 'Tab switch detected — Warning issued' }, { time: '14:38:10', text: 'Face verified — Identity confirmed' }, { time: '14:45:00', text: 'Suspicious movement — Under review' }, { time: '14:52:30', text: 'Session checkpoint — Integrity 98%' }];
    document.getElementById('proctoringLog').innerHTML = logs.map(l => `<div class="timeline-item"><div class="tl-time">${l.time}</div><div class="tl-text">${l.text}</div></div>`).join('');
}

// ═══════════════════ SECURITY ═══════════════════
function initSecurity() {
    const rows = [{ time: '14:35', type: 'Tab Switch', sev: 'Medium', details: 'Switched to Chrome tab', action: 'Warning' }, { time: '14:45', type: 'Suspicious Movement', sev: 'Low', details: 'Leaned out of frame', action: 'Flagged' }, { time: '15:02', type: 'Copy Attempt', sev: 'High', details: 'Ctrl+C blocked', action: 'Blocked' }];
    document.querySelector('#violationTable tbody').innerHTML = rows.map(r => `<tr><td class="text-mono">${r.time}</td><td>${r.type}</td><td><span class="badge badge-${r.sev === 'High' ? 'rose' : r.sev === 'Medium' ? 'amber' : 'indigo'}">${r.sev}</span></td><td>${r.details}</td><td><span class="badge badge-${r.action === 'Blocked' ? 'rose' : r.action === 'Warning' ? 'amber' : 'indigo'}">${r.action}</span></td></tr>`).join('');
}

// ═══════════════════ SENTIMENT ═══════════════════
function initSentiment() {
    const emotions = ['😊', '😐', '🤔', '😊', '😃', '😐', '😊', '😃', '😃', '😊'];
    document.getElementById('sentimentTimeline').innerHTML = emotions.map((e, i) => `<div class="bar" style="height:${40 + Math.random() * 60}%;background:var(--gradient-${i % 2 ? 'cool' : 'success'})"><div class="bar-value">${e}</div><div class="bar-label">Q${i + 1}</div></div>`).join('');
}

// ═══════════════════ CALENDAR ═══════════════════
function renderCalendar() {
    const year = calendarDate.getFullYear(), month = calendarDate.getMonth();
    document.getElementById('calendarTitle').textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const today = new Date();
    let html = '';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => { html += `<div class="calendar-header-cell">${d}</div>`; });
    for (let i = 0; i < firstDay; i++)html += `<div class="calendar-cell other-month">${daysInPrev - firstDay + i + 1}</div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const hasEvent = events.some(e => e.date === dateStr);
        html += `<div class="calendar-cell${isToday ? ' today' : ''}${hasEvent ? ' has-event' : ''}">${d}</div>`;
    }
    const totalCells = firstDay + daysInMonth;
    for (let i = 1; i <= 42 - totalCells; i++)html += `<div class="calendar-cell other-month">${i}</div>`;
    document.getElementById('calendarGrid').innerHTML = html;

    document.getElementById('upcomingEvents').innerHTML = events.sort((a, b) => a.date.localeCompare(b.date)).map(e => `
    <div class="flex-gap" style="padding:10px 0;border-bottom:1px solid var(--border)">
      <div class="card-icon icon-${e.type === 'Interview' ? 'indigo' : e.type === 'Mock Test' ? 'violet' : e.type === 'Deadline' ? 'rose' : 'cyan'}" style="width:32px;height:32px;border-radius:8px;font-size:12px"><i class="fas fa-${e.type === 'Interview' ? 'user-tie' : e.type === 'Mock Test' ? 'clipboard-check' : e.type === 'Deadline' ? 'clock' : 'building'}"></i></div>
      <div><div class="text-sm fw-700">${e.title}</div><div class="text-xs" style="color:var(--text-muted)">${e.date} at ${e.time}</div></div>
    </div>`).join('');

    document.getElementById('reminderList').innerHTML = [
        { text: 'Resume deadline tomorrow', icon: 'fa-exclamation-circle', color: 'rose' },
        { text: 'Google interview in 3 days', icon: 'fa-bell', color: 'amber' },
        { text: 'Complete DSA module', icon: 'fa-tasks', color: 'indigo' }
    ].map(r => `<div class="alert-bar ${r.color === 'rose' ? 'danger' : r.color === 'amber' ? 'warning' : 'info'}" style="margin-bottom:8px"><i class="fas ${r.icon}"></i> ${r.text}</div>`).join('');
}
function changeMonth(dir) { calendarDate.setMonth(calendarDate.getMonth() + dir); renderCalendar(); }
function addEvent() {
    const t = document.getElementById('eventTitle').value, d = document.getElementById('eventDate').value, tm = document.getElementById('eventTime').value, tp = document.getElementById('eventType').value;
    if (!t || !d) return showToast('Please fill all fields', 'error');
    events.push({ title: t, date: d, time: tm || '00:00', type: tp });
    renderCalendar(); closeModal('eventModal'); showToast('Event added!', 'success');
}

// ═══════════════════ ADMIN ═══════════════════
function initAdmin() {
    const users = [{ name: 'Rahul Sharma', email: 'rahul@test.com', role: 'Student', status: 'Active' }, { name: 'Priya Patel', email: 'priya@test.com', role: 'Student', status: 'Active' }, { name: 'Admin User', email: 'admin@placeai.com', role: 'Admin', status: 'Active' }, { name: 'Ankit Kumar', email: 'ankit@test.com', role: 'Student', status: 'Inactive' }, { name: 'Sneha Reddy', email: 'sneha@test.com', role: 'Recruiter', status: 'Active' }];
    document.querySelector('#userTable tbody').innerHTML = users.map(u => `<tr><td class="fw-700">${u.name}</td><td>${u.email}</td><td><span class="badge badge-${u.role === 'Admin' ? 'rose' : u.role === 'Recruiter' ? 'violet' : 'indigo'}">${u.role}</span></td><td><span class="badge badge-${u.status === 'Active' ? 'emerald' : 'amber'}">${u.status}</span></td><td><button class="btn btn-sm btn-secondary"><i class="fas fa-edit"></i></button></td></tr>`).join('');
}

// ═══════════════════ CHATBOT ═══════════════════
function toggleChatbot() {
    const panel = document.getElementById('chatPanel');
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && !document.getElementById('chatMessages').innerHTML) {
        addChatMsg('bot', 'Hello! 👋 I\'m your PlaceAI Assistant. How can I help you prepare for placements today?');
    }
}
function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input.value.trim()) return;
    addChatMsg('user', input.value);
    const msg = input.value.toLowerCase(); input.value = '';
    setTimeout(() => {
        let resp = CHATBOT_RESPONSES.default;
        for (const [k, v] of Object.entries(CHATBOT_RESPONSES)) { if (msg.includes(k)) { resp = v; break; } }
        addChatMsg('bot', resp);
    }, 600);
}
function addChatMsg(type, text) {
    const el = document.getElementById('chatMessages');
    el.innerHTML += `<div class="chat-msg ${type}"><div class="chat-bubble">${text.replace(/\n/g, '<br>')}</div></div>`;
    el.scrollTop = el.scrollHeight;
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendChat();
}

// ═══════════════════ UTILS ═══════════════════
function formatTime(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }

// ═══════════════════ INIT ═══════════════════
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    initProfile();
    renderJobs(JOBS);
    initMarket();
    initJobAPIs();
    initAPICompare();
    renderVideos(VIDEOS);
    renderCourses(COURSES);
    initCourseAPIs();
    initAIML();
    initProctoring();
    initSecurity();
    initSentiment();
    renderCalendar();
    initAdmin();
    showToast('Welcome to PlaceAI! 🎯', 'info');
});
