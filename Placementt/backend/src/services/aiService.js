const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // Keeping the same env var name for continuity
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

exports.getAIResponse = async (prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA AI Error:", error.message);
    throw new Error("Failed to get AI response from NVIDIA");
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
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 2048,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA Resume Analysis Error:", error.message);
    throw new Error("Failed to analyze resume with NVIDIA");
  }
};
exports.generateQuiz = async (category) => {
  const prompt = `
    Generate a JSON quiz on the topic of "${category}" suitable for a placement assessment.
    Provide 5 multiple-choice questions.
    Return ONLY a JSON array of objects with the following structure:
    [
      {
        "q": "question text",
        "options": ["opt1", "opt2", "opt3", "opt4"],
        "correct": index_of_correct_option (0-3)
      }
    ]
    Do not include any other text, just the JSON array.
  `;
  
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1500,
    });
    
    // Attempt to parse JSON from the response
    const content = completion.choices[0].message.content;
    const jsonMatch = content.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (error) {
    console.error("NVIDIA Quiz Generation Error:", error.message);
    throw new Error("Failed to generate quiz with NVIDIA");
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
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 2048,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA Roadmap Generation Error:", error.message);
    throw new Error("Failed to generate roadmap with NVIDIA");
  }
};


exports.evaluateVideoPractice = async (topic, transcript) => {
  const prompt = `
    You are a professional communication coach and interview trainer.
    A candidate was asked to speak about the topic: "${topic}".
    Their spoken answer (transcript) was:
    "${transcript}"

    Please evaluate their answer on the following dimensions and provide constructive feedback:
    1. **Content & Accuracy** (score /10): Did they cover key concepts?
    2. **Clarity & Structure** (score /10): Was the answer well-organized?
    3. **Communication Style** (score /10): Was the language professional and confident?
    4. **Specific Improvements**: Give 3 concrete bullet-point tips to improve.
    5. **A Better Sample Answer**: Provide a short model answer (3-4 sentences).

    Format clearly with headers and bullet points.
  `;
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      top_p: 0.7,
      max_tokens: 1500,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA Video Practice Error:", error.message);
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
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1500,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA Realtime Feedback Error:", error.message);
    throw new Error("Failed to evaluate answer");
  }
};

exports.analyzeSentiment = async (text) => {
  const prompt = `
    You are an expert in emotional intelligence and speech analysis.
    Analyze the following text for sentiment, tone, and professional communication quality:
    
    Text: "${text}"
    
    Provide a JSON response with this EXACT structure (return ONLY the JSON, no other text):
    {
      "overall": "Positive|Neutral|Negative",
      "confidence_score": 0-100,
      "emotions": {
        "confident": 0-100,
        "nervous": 0-100,
        "enthusiastic": 0-100,
        "professional": 0-100,
        "assertive": 0-100
      },
      "tone": "Formal|Semi-formal|Informal",
      "strengths": ["strength 1", "strength 2"],
      "improvements": ["improvement 1", "improvement 2"],
      "summary": "1-2 sentence analysis"
    }
  `;
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      top_p: 0.7,
      max_tokens: 800,
    });
    const content = completion.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return JSON.parse(content);
  } catch (error) {
    console.error("NVIDIA Sentiment Error:", error.message);
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
    Summary: ${userProfile.summary || ''}
    Work Experience: ${userProfile.experience}
    Skills: ${userProfile.skills}
    Education: ${userProfile.education}
    Projects: ${userProfile.projects || 'N/A'}
    Certifications: ${userProfile.certifications || 'N/A'}
    
    Format the resume with clear sections using markdown:
    # Name
    Contact info
    ## Professional Summary
    ## Work Experience
    ## Skills
    ## Education
    ## Projects (if provided)
    ## Certifications (if provided)
    
    Use strong action verbs, quantify achievements, and make it impactful and professional.
  `;
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 2048,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA Resume Builder Error:", error.message);
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
    
    Return ONLY a JSON object with this exact structure:
    {
      "ats_score": 0-100,
      "verdict": "Excellent Match|Good Match|Moderate Match|Poor Match",
      "matched_keywords": ["keyword1", "keyword2", "keyword3"],
      "missing_keywords": ["keyword1", "keyword2", "keyword3"],
      "section_scores": {
        "skills_match": 0-100,
        "experience_relevance": 0-100,
        "education_match": 0-100,
        "keyword_density": 0-100
      },
      "recommendations": ["tip 1", "tip 2", "tip 3"],
      "summary": "2 sentence summary"
    }
  `;
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      top_p: 0.7,
      max_tokens: 1000,
    });
    const content = completion.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return JSON.parse(content);
  } catch (error) {
    console.error("NVIDIA ATS Score Error:", error.message);
    throw new Error("Failed to calculate ATS score");
  }
};
