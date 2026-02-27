const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // Reusing the same env var for now
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const fs = require('fs');

async function testNvidia() {
  const logStream = fs.createWriteStream(path.join(__dirname, 'test-output.log'));
  const log = (msg) => {
    console.log(msg);
    logStream.write(msg + '\n');
  };

  log("Testing NVIDIA with API Key: " + (process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING"));
  
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{"role": "user", "content": "Hello, are you working?"}],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });

    log("Success! Response text: " + completion.choices[0].message.content);
  } catch (error) {
    log("NVIDIA API Error: " + error.message);
    if (error.stack) log(error.stack);
  } finally {
    logStream.end();
  }
}

testNvidia();
