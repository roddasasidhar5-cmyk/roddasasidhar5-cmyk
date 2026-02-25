const VIDEOS = [
    { title: 'Data Structures & Algorithms Complete Course', channel: 'freeCodeCamp', views: '2.1M', duration: '12:30:00', category: 'DSA', thumb: '📊' },
    { title: 'React.js Full Tutorial for Beginners', channel: 'Traversy Media', views: '1.8M', duration: '4:15:00', category: 'Web Dev', thumb: '⚛️' },
    { title: 'Machine Learning A-Z™', channel: 'Krish Naik', views: '900K', duration: '8:45:00', category: 'Machine Learning', thumb: '🤖' },
    { title: 'System Design Interview Masterclass', channel: 'Gaurav Sen', views: '1.2M', duration: '3:20:00', category: 'System Design', thumb: '🏗️' },
    { title: 'JavaScript Interview Questions', channel: 'Akshay Saini', views: '3.4M', duration: '2:45:00', category: 'Interview Prep', thumb: '💡' },
];

exports.getAllVideos = (req, res) => {
    res.json(VIDEOS);
};
