// server.js (CommonJS)
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/parseTask', async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ error: 'Missing input' });
    }

    const now = new Date();
    const todayISO = now.toISOString().slice(0, 10);
    const todayLabel = now.toLocaleDateString('en-US', { weekday: 'long' });

    const prompt = `
You are an intelligent task parser that outputs ONLY a valid JSON object:

{
  "task": "string",
  "date": "YYYY-MM-DD",          // ISO 8601
  "time": "HH:mm"                // 24h, optional; "" if unknown
}

Rules:
- If date is partial (e.g., "12 August"), resolve it relative to Current date below.
- If that date this year has already passed, roll to next year.
- If time isn't given, return "time": "" (don't invent one).
- Respond with JSON only. No markdown fences, no extra text.

Current date: ${todayISO} (${todayLabel})
User input: "${input}"
`;

    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await r.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';

    // strip possible code fences
    const clean = text.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'AI did not return valid JSON', raw: clean });
    }

    if (!parsed.task || !parsed.date) {
      return res
        .status(400)
        .json({ error: 'Invalid AI output fields', raw: parsed });
    }

    // normalize shape (ensure keys exist)
    res.json({
      task: String(parsed.task),
      date: String(parsed.date),
      time: parsed.time ? String(parsed.time) : '',
    });
  } catch (e) {
    console.error('AI API error:', e);
    res.status(500).json({ error: e.message || 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`AI API running at http://localhost:${PORT}`));
