const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');

// Load env from the same directory as the script
dotenv.config({ path: path.join(__dirname, '.env') });

async function testGemini() {
  console.log("Testing Gemini with API Key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Sending prompt...");
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("Success! Response text:", response.text());
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    if (error.stack) console.error(error.stack);
  }
}

testGemini();
