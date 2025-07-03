import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function postComment(repo, prNumber, message) {
  const url = `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ai-review-bot'
    },
    body: JSON.stringify({ body: message })
  });

  const result = await response.json();
  return result;
}
