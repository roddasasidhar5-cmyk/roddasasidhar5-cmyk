const JOBS = [
    { id: 1, title: 'Software Engineer', company: 'Google', location: 'Bangalore', salary: '25-35 LPA', type: 'Full-Time', skills: ['Python', 'Go', 'DSA'], logo: 'G', color: '#4285f4', posted: '2d ago' },
    { id: 2, title: 'Product Manager', company: 'Microsoft', location: 'Hyderabad', salary: '20-30 LPA', type: 'Full-Time', skills: ['Agile', 'Product Strategy'], logo: 'M', color: '#00a4ef', posted: '1d ago' },
    { id: 3, title: 'Frontend Developer', company: 'Amazon', location: 'Remote', salary: '18-28 LPA', type: 'Full-Time', skills: ['React', 'Next.js', 'Tailwind'], logo: 'A', color: '#ff9900', posted: '5h ago' },
    { id: 4, title: 'Data Scientist', company: 'Meta', location: 'Bangalore', salary: '22-32 LPA', type: 'Full-Time', skills: ['Python', 'PyTorch', 'SQL'], logo: 'f', color: '#0668E1', posted: '3d ago' },
    { id: 5, title: 'Security Analyst', company: 'Cisco', location: 'Pune', salary: '15-25 LPA', type: 'Full-Time', skills: ['Networking', 'Cybersecurity'], logo: 'C', color: '#049fd9', posted: '1w ago' },
    { id: 6, title: 'DevOps Engineer', company: 'Atlassian', location: 'Remote', salary: '20-30 LPA', type: 'Full-Time', skills: ['Docker', 'K8s', 'CI/CD'], logo: 'At', color: '#0052cc', posted: '4h ago' },
    { id: 7, title: 'Full Stack Developer', company: 'Razorpay', location: 'Bangalore', salary: '16-24 LPA', type: 'Full-Time', skills: ['Node.js', 'React', 'MongoDB'], logo: 'R', color: '#3395ff', posted: '2d ago' },
    { id: 8, title: 'AI Research Intern', company: 'NVIDIA', location: 'Pune', salary: '8-12 LPA', type: 'Internship', skills: ['Python', 'PyTorch', 'CUDA'], logo: 'N', color: '#76b900', posted: '6h ago' },
];

exports.getAllJobs = (req, res) => {
    res.json(JOBS);
};

exports.getJobById = (req, res) => {
    const job = JOBS.find(j => j.id === parseInt(req.params.id));
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
};
