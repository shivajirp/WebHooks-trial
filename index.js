import express from 'express';
import dotenv from 'dotenv';
import { fetchDiff } from './utils/fetchDiff.js';
import { generateReview } from './utils/generateReview.js';
import { postComment } from './utils/postComment.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const eventType = req.headers['x-github-event'];
  const payload = req.body;

  console.log(payload);

  if (eventType === 'pull_request' && payload.action === 'opened') {
    const pr = payload.pull_request;
    const repo = payload.repository.full_name;
    const prNumber = payload.number;

    try {
      const diffText = await fetchDiff(pr.diff_url);
      const review = await generateReview(diffText);
      const result = await postComment(repo, prNumber, review);
      console.log('✅ Review posted:', result.html_url);
    } catch (err) {
      console.error('❌ Error:', err);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
