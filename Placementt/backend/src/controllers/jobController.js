const Job = require('../models/Job');
const Application = require('../models/Application');

const SEED_JOBS = [
    { title: 'Software Engineer', company: 'Google', location: 'Bangalore', salary: '25-35 LPA', type: 'Full-Time', skills: ['Python', 'Go', 'DSA'], logo: 'G', color: '#4285f4', posted: '2d ago', description: 'Working on core infrastructure and high-scale systems.' },
    { title: 'Product Manager', company: 'Microsoft', location: 'Hyderabad', salary: '20-30 LPA', type: 'Full-Time', skills: ['Agile', 'Product Strategy'], logo: 'M', color: '#00a4ef', posted: '1d ago', description: 'Lead product development and strategy for cloud services.' },
    { title: 'Frontend Developer', company: 'Amazon', location: 'Remote', salary: '18-28 LPA', type: 'Full-Time', skills: ['React', 'Next.js', 'Tailwind'], logo: 'A', color: '#ff9900', posted: '5h ago', description: 'Building the next generation of e-commerce experience.' },
    { title: 'Data Scientist', company: 'Meta', location: 'Bangalore', salary: '22-32 LPA', type: 'Full-Time', skills: ['Python', 'PyTorch', 'SQL'], logo: 'f', color: '#0668E1', posted: '3d ago', description: 'Leveraging AI to connect billions of people.' },
    { title: 'Security Analyst', company: 'Cisco', location: 'Pune', salary: '15-25 LPA', type: 'Full-Time', skills: ['Networking', 'Cybersecurity'], logo: 'C', color: '#049fd9', posted: '1w ago', description: 'Protecting global networks from emerging threats.' },
    { title: 'DevOps Engineer', company: 'Atlassian', location: 'Remote', salary: '20-30 LPA', type: 'Full-Time', skills: ['Docker', 'K8s', 'CI/CD'], logo: 'At', color: '#0052cc', posted: '4h ago', description: 'Empowering teams with seamless deployment pipelines.' },
    { title: 'Full Stack Developer', company: 'Razorpay', location: 'Bangalore', salary: '16-24 LPA', type: 'Full-Time', skills: ['Node.js', 'React', 'MongoDB'], logo: 'R', color: '#3395ff', posted: '2d ago', description: 'Revolutionizing payments in India.' },
    { title: 'AI Research Intern', company: 'NVIDIA', location: 'Pune', salary: '8-12 LPA', type: 'Internship', skills: ['Python', 'PyTorch', 'CUDA'], logo: 'N', color: '#76b900', posted: '6h ago', description: 'Pushing the boundaries of deep learning acceleration.' },
];

// Seed jobs if none exist
const seedJobs = async () => {
    try {
        const count = await Job.countDocuments();
        if (count === 0) {
            await Job.insertMany(SEED_JOBS);
            console.log('Jobs seeded successfully');
        }
    } catch (err) {
        console.error('Error seeding jobs:', err);
    }
};
seedJobs();

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching job' });
    }
};

exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.user.id; // From auth middleware

        // Check if already applied
        const existing = await Application.findOne({ job: jobId, user: userId });
        if (existing) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = new Application({
            job: jobId,
            user: userId
        });

        await application.save();
        res.status(201).json({ message: 'Applied successfully', application });
    } catch (err) {
        console.error('Job Apply Error:', err);
        res.status(500).json({ message: 'Error applying for job' });
    }
};

exports.getAdminApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('job', 'title company logo color')
            .populate('user', 'name email')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching applications' });
    }
};
