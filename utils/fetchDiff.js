import fetch from 'node-fetch';

export async function fetchDiff(diffUrl) {
  const response = await fetch(diffUrl, {
    headers: {
      'User-Agent': 'ai-pr-review-bot',
    },
  });

  return response.text();
}
