import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

async function testGemini() {
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: "Say Hello in a funny way" }
          ]
        }
      ]
    })
  });

  const data = await res.json();

  if (res.ok) {
    console.log("✅ Gemini Response:\n", data.candidates[0].content.parts[0].text);
  } else {
    console.error("❌ Gemini API Error:", data);
  }
}

testGemini();
