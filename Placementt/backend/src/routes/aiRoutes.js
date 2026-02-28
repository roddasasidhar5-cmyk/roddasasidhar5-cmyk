const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    const prompt = `Context: ${context || 'General placement assistance'}\nUser: ${message}\nAssistant:`;
    const response = await aiService.getAIResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AI Mock Interview Endpoints
router.post('/interview/start', async (req, res) => {
  try {
    const { role } = req.body;
    const prompt = `You are a professional hiring manager. Start a mock interview for a ${role} position. Ask the first professional, welcoming, and role-relevant question. Keep it concise.`;
    const response = await aiService.getAIResponse(prompt);
    res.json({ question: response });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start interview' });
  }
});

router.post('/interview/next', async (req, res) => {
  try {
    const { role, currentQuestion, userAnswer, chatHistory } = req.body;
    const prompt = `
      You are an expert interviewer for a ${role} role. 
      The last question you asked was: "${currentQuestion}"
      The candidate answered: "${userAnswer}"
      
      Instructions:
      1. First, explicitly evaluate the candidate's last answer. Tell them clearly if it was right or wrong, and provide a brief, professional correction or validation.
      2. Then, based on their answer, move to a new, relevant topic for the ${role} position or ask a challenging follow-up question.
      3. DO NOT repeat yourself. 
      4. DO NOT provide "random" questions. The conversation must feel like a continuous, logical interview.
      5. Return ONLY your spoken response (the evaluation of their answer + the next question).
    `;
    const response = await aiService.getAIResponse(prompt);
    res.json({ question: response });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate next question' });
  }
});

router.post('/interview/result', async (req, res) => {
  try {
    const { role, chatHistory } = req.body;
    const prompt = `
      The mock interview for ${role} is over. 
      Review the chat history: ${JSON.stringify(chatHistory)}
      Provide a concise feedback report including:
      1. Strengths observed.
      2. Areas for improvement.
      3. An overall score out of 10.
      4. Tips for the real interview.
      Format the output clearly using bullet points.
    `;
    const response = await aiService.getAIResponse(prompt);
    res.json({ feedback: response });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate feedback' });
  }
});

router.post('/resume/analyze', async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });
    const feedback = await aiService.analyzeResume(resumeText);
    res.json({ feedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze resume' });
  }
});

router.post('/quiz/generate', async (req, res) => {
  try {
    const { category } = req.body;
    const quiz = await aiService.generateQuiz(category || 'General Aptitude');
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate quiz' });
  }
});

router.post('/roadmap/generate', async (req, res) => {
  try {
    const { goal } = req.body;
    if (!goal) return res.status(400).json({ message: 'Goal is required' });
    const roadmap = await aiService.generateRoadmap(goal);
    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate roadmap' });
  }
});

// ── NEW Feature Routes ──────────────────────────────────────

router.post('/video-practice/feedback', async (req, res) => {
  try {
    const { topic, transcript } = req.body;
    if (!topic || !transcript) return res.status(400).json({ message: 'topic and transcript are required' });
    const feedback = await aiService.evaluateVideoPractice(topic, transcript);
    res.json({ feedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to evaluate video practice' });
  }
});

router.post('/feedback/evaluate', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) return res.status(400).json({ message: 'question and answer are required' });
    const feedback = await aiService.evaluateRealtimeFeedback(question, answer);
    res.json({ feedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to evaluate answer' });
  }
});

router.post('/sentiment/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'text is required' });
    const result = await aiService.analyzeSentiment(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze sentiment' });
  }
});

router.post('/resume/build', async (req, res) => {
  try {
    const userProfile = req.body;
    if (!userProfile.name || !userProfile.targetRole) return res.status(400).json({ message: 'name and targetRole are required' });
    const resume = await aiService.buildResume(userProfile);
    res.json({ resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to build resume' });
  }
});

router.post('/ats/score', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) return res.status(400).json({ message: 'resumeText and jobDescription are required' });
    const result = await aiService.calculateATSScore(resumeText, jobDescription);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate ATS score' });
  }
});

module.exports = router;
