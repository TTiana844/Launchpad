// api/evaluate.js — Vercel Serverless Function
// Tento súbor skrýva API kľúč na serveri, aby ho žiaci nevideli v prehliadači.

export default async function handler(req, res) {
  // Povolenie pre prehliadač (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Volanie Anthropic API s kľúčom zo servera (Environment Variable)
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY, // kľúč zo servera, nie z prehliadača
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(200).json(data);
}
