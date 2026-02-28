const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./src/models/Video');
const Course = require('./src/models/Course');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Video.deleteMany({});
    await Course.deleteMany({});

    const courses = [
      { title: 'Full Stack Development', category: 'Web Dev', description: 'Master MERN stack', thumbnail: '⚛️' },
      { title: 'Data Structures & Algorithms', category: 'DSA', description: 'Crack the interview', thumbnail: '📊' },
      { title: 'Generative AI', category: 'AI', description: 'The future of tech', thumbnail: '🤖' }
    ];

    const savedCourses = await Course.insertMany(courses);
    console.log('Courses seeded');

    const videos = [
      { 
        title: 'React.js Full Course 2024', 
        youtubeId: 'bMknfKXIFA8', 
        category: 'Web Dev', 
        channel: 'freeCodeCamp', 
        duration: '11:58:20', 
        thumbnail: '⚛️',
        courseId: savedCourses[0]._id
      },
      { 
        title: 'DSA with C++ Foundation', 
        youtubeId: 'VbdS8T0A-m0', 
        category: 'DSA', 
        channel: 'Love Babbar', 
        duration: '1:45:00', 
        thumbnail: '📊',
        courseId: savedCourses[1]._id
      },
      { 
        title: 'OpenAI API Crash Course', 
        youtubeId: 'u4V_V9-Xmkw', 
        category: 'AI', 
        channel: 'JavaScript Mastery', 
        duration: '45:00', 
        thumbnail: '🤖',
        courseId: savedCourses[2]._id
      }
    ];

    await Video.insertMany(videos);
    console.log('Videos seeded');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
