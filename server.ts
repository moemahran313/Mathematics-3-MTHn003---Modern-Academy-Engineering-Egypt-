import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// API route for AI-powered differential equation solving
app.post('/api/solve-ode', async (req, res) => {
  try {
    const { latex } = req.body;
    if (!latex) {
      return res.status(400).json({ error: 'Missing latex input' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are a differential equation expert for college Math 3 (MTH203/MTH103). Solve this differential equation step-by-step:
LaTeX Equation: "${latex}"

Return a strict JSON object with this exact schema:
{
  "rawInput": "${latex}",
  "standardFormLatex": "...",
  "order": 1,
  "degree": 1,
  "isLinear": true,
  "odeType": "e.g. Second-Order Linear Homogeneous ODE with Constant Coefficients",
  "arabicOdeType": "e.g. معادلة خطية متجانسة من الرتبة الثانية",
  "dependentVar": "y",
  "independentVar": "x",
  "steps": [
    {
      "stepNumber": 1,
      "title": "English step title",
      "arabicTitle": "عنوان الخطوة بالعربية",
      "latex": "LaTeX formula for this step",
      "explanation": "Clear English mathematical explanation",
      "arabicExplanation": "شرح رياضي واضح بالعربية"
    }
  ],
  "generalSolutionLatex": "y(x) = ...",
  "arabicSummary": "خلاصة الحل بالعربية"
}
Output pure JSON without markdown backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '{}';
    const parsed = JSON.parse(jsonText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('ODE Solver Error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to solve ODE' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Math 3 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
