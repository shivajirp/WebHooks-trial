import fetch from 'node-fetch';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateReview(diffText) {
  const prompt = `Review the following GitHub pull request diff and provide feedback:\n\n${diffText}`;

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const review = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  console.log(review);
  return review;
}
