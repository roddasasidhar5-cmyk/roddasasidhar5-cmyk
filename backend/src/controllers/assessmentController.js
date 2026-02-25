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

exports.getQuizByCategory = (req, res) => {
    const { category } = req.params;
    const quiz = QUIZ_DATA[category];
    if (!quiz) return res.status(404).json({ message: 'Category not found' });
    res.json(quiz);
};

exports.submitQuiz = (req, res) => {
    const { category, answers } = req.body;
    const questions = QUIZ_DATA[category];
    if (!questions) return res.status(404).json({ message: 'Category not found' });

    let score = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.correct) score++;
    });

    res.json({ score, total: questions.length, percentage: Math.round((score / questions.length) * 100) });
};
