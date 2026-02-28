const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.getAIResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    throw new Error("Failed to get AI response from Gemini");
  }
};

exports.analyzeResume = async (resumeText) => {
  const prompt = `
    You are an expert Resume Reviewer and Technical Recruiter. 
    Analyze the following resume text and provide a detailed analysis:
    1. Overall Score (out of 100)
    2. Strength and Highlights
    3. Weaknesses and Areas for Improvement
    4. Keyword Optimization (what's missing)
    5. Formatting Tips
    
    Resume Text:
    ${resumeText}
  `;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Resume Analysis Error:", error.message);
    throw new Error("Failed to analyze resume with Gemini");
  }
};

exports.generateQuiz = async (category) => {
  const prompt = `
    Generate a JSON quiz on the topic of "${category}" suitable for a placement assessment.
    Provide 5 multiple-choice questions.
    Return ONLY a JSON array of objects with the following structure without any markdown formatting wrappers:
    [
      {
        "q": "question text",
        "options": ["opt1", "opt2", "opt3", "opt4"],
        "correct": index_of_correct_option_0_to_3
      }
    ]
  `;
  
  try {
    const result = await model.generateContent(prompt);
    let content = result.response.text();
    // Clean up if it gave markdown blocks
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(content);
  } catch (error) {
    console.error("Gemini Quiz Generation Error:", error.message);
    throw new Error("Failed to generate quiz with Gemini");
  }
};

exports.generateRoadmap = async (goal) => {
  const prompt = `
    Create a detailed learning roadmap for someone aiming to become a "${goal}".
    Break it down into phases: Beginner, Intermediate, and Advanced.
    For each phase, provide:
    1. Key concepts to learn.
    2. Suggested projects to build.
    3. Estimated time to complete.
    
    Format the output clearly using markdown with emojis for better readability.
    Include a concluding "Pro Tip" for the specified career.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Roadmap Generation Error:", error.message);
    throw new Error("Failed to generate roadmap with Gemini");
  }
};

exports.evaluateVideoPractice = async (topic, transcript) => {
  const prompt = `
    You are a professional communication coach and interview trainer.
    A candidate was asked to speak about the topic: "${topic}".
    Their spoken answer (transcript) was:
    "${transcript}"

    Please evaluate their answer on the following dimensions:
    1. **Content & Accuracy** (score /10): Did they cover key concepts?
    2. **Clarity & Structure** (score /10): Was the answer well-organized?
    3. **Communication Style** (score /10): Was the language professional and confident?
    4. **Sentimental & Emotional Analysis**: Analyze the tone (e.g., Confident, Nervous, Enthusiastic) and the sentiment (Positive/Neutral/Negative).
    5. **Specific Improvements**: Give 3 concrete bullet-point tips to improve.
    6. **A Better Sample Answer**: Provide a short model answer (3-4 sentences).

    Format clearly with bold headers and bullet points.
  `;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Video Practice Error:", error.message);
    throw new Error("Failed to evaluate video practice");
  }
};

exports.evaluateRealtimeFeedback = async (question, answer) => {
  const prompt = `
    You are a senior technical interviewer. Evaluate the following interview answer:
    
    Question: "${question}"
    Candidate's Answer: "${answer}"
    
    Score the answer on these 4 criteria (each out of 25, total 100):
    1. **Accuracy** (0-25): Is the information correct?
    2. **Depth** (0-25): Does the answer go beyond surface level?
    3. **Clarity** (0-25): Is it easy to understand?
    4. **Use of Examples** (0-25): Does the candidate provide concrete examples?
    
    Then provide:
    - **Overall Score**: X/100
    - **Verdict**: Excellent / Good / Needs Improvement / Poor
    - **What was done well**: 2 points
    - **What to improve**: 2 points
    - **Ideal Answer Summary**: A 2-3 sentence ideal response

    Return as structured markdown.
  `;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Realtime Feedback Error:", error.message);
    throw new Error("Failed to evaluate answer");
  }
};

exports.analyzeSentiment = async (text) => {
  const prompt = `
    You are an expert in emotional intelligence and speech analysis.
    Analyze the following text for sentiment, tone, and professional communication quality:
    
    Text: "${text}"
    
    Provide ONLY a JSON response with this EXACT structure (no markdown wrappers like \`\`\`json):
    {
      "overall": "Positive|Neutral|Negative",
      "confidence_score": 85,
      "emotions": {
        "confident": 80,
        "nervous": 10,
        "enthusiastic": 70,
        "professional": 90,
        "assertive": 60
      },
      "tone": "Formal|Semi-formal|Informal",
      "strengths": ["strength 1", "strength 2"],
      "improvements": ["improvement 1", "improvement 2"],
      "summary": "1-2 sentence analysis"
    }
  `;
  try {
    const result = await model.generateContent(prompt);
    let content = result.response.text();
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(content);
  } catch (error) {
    console.error("Gemini Sentiment Error:", error.message);
    throw new Error("Failed to analyze sentiment");
  }
};

exports.buildResume = async (userProfile) => {
  const prompt = `
    You are a professional resume writer. Build a clean, ATS-optimized, one-page resume from the following details:
    
    Name: ${userProfile.name}
    Email: ${userProfile.email || 'email@example.com'}
    Phone: ${userProfile.phone || 'N/A'}
    LinkedIn: ${userProfile.linkedin || 'N/A'}
    Target Role: ${userProfile.targetRole}
    Career Objective: ${userProfile.careerObjective || ''}
    Summary: ${userProfile.summary || ''}
    Work Experience: ${userProfile.experience}
    Skills: ${userProfile.skills}
    Education: ${userProfile.education}
    Projects: ${userProfile.projects || 'N/A'}
    Certifications: ${userProfile.certifications || 'N/A'}
    
    Format the resume with clear sections using markdown:
    # Name
    Contact info
    ## Career Objective
    ## Professional Summary
    ## Work Experience
    ## Skills
    ## Education
    ## Projects (if provided)
    ## Certifications (if provided)
    
    Use strong action verbs, quantify achievements, and make it impactful and professional.
  `;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Resume Builder Error:", error.message);
    throw new Error("Failed to build resume");
  }
};

exports.calculateATSScore = async (resumeText, jobDescription) => {
  const prompt = `
    You are an ATS (Applicant Tracking System) expert. Analyze the resume against the job description.
    
    Resume:
    "${resumeText}"
    
    Job Description:
    "${jobDescription}"
    
    Return ONLY a JSON object with this exact structure (no markdown wrappers like \`\`\`json):
    {
      "ats_score": 85,
      "verdict": "Excellent Match|Good Match|Moderate Match|Poor Match",
      "matched_keywords": ["keyword1", "keyword2"],
      "missing_keywords": ["keyword3", "keyword4"],
      "section_scores": {
        "skills_match": 90,
        "experience_relevance": 80,
        "education_match": 100,
        "keyword_density": 70
      },
      "recommendations": ["tip 1", "tip 2"],
      "summary": "2 sentence summary"
    }
  `;
  try {
    const result = await model.generateContent(prompt);
    let content = result.response.text();
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(content);
  } catch (error) {
    console.error("Gemini ATS Score Error:", error.message);
    throw new Error("Failed to calculate ATS score");
  }
};
