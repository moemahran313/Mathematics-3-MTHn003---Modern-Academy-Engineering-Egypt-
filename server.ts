import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Shared server-side Gemini client initializer following @google/genai guidelines
function getGenAIClient() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API route for AI-powered differential equation & Laplace solving
app.post('/api/solve-ode', async (req, res) => {
  try {
    const { latex, initialConditions } = req.body;
    if (!latex || typeof latex !== 'string') {
      return res.status(400).json({ error: 'Missing latex input' });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured. Please check Settings > Secrets.',
      });
    }

    const ivpContext =
      initialConditions && (initialConditions.y0 !== '' || initialConditions.yp0 !== '')
        ? `\nInitial Conditions: y(${initialConditions.x0 || '0'}) = ${initialConditions.y0}, y'(${initialConditions.x0 || '0'}) = ${initialConditions.yp0}`
        : '';

    const prompt = `Solve the following differential equation or Laplace transform problem step-by-step for a college Engineering Mathematics 3 (MTH203 / MTHn103) exam.
Equation (LaTeX): ${latex}${ivpContext}

Requirements:
1. Perform the ACTUAL symbolic and numerical calculations for this specific equation (do NOT return generic textbook formulas with P(x) or Q(x); compute the actual integrals, partial derivatives, roots, undetermined coefficients, or partial fractions).
2. Check for common exam traps (e.g., dividing by the leading coefficient of y', resonance multiplication by x^s when the RHS exponent matches a characteristic root, or missing Integrating Factor when ∂M/∂y ≠ ∂N/∂x).
3. If initial conditions are provided, solve for the constants C_1, C_2 and include the Particular IVP Solution.`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a rigorous Engineering Mathematics 3 professor. Always return complete, exact, step-by-step derivations in valid KaTeX LaTeX syntax with both English and Arabic explanations.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rawInput: { type: Type.STRING },
            standardFormLatex: { type: Type.STRING },
            order: { type: Type.INTEGER },
            degree: { type: Type.INTEGER },
            isLinear: { type: Type.BOOLEAN },
            odeType: { type: Type.STRING },
            arabicOdeType: { type: Type.STRING },
            methodUsed: { type: Type.STRING },
            examinerTrap: { type: Type.STRING },
            arabicExaminerTrap: { type: Type.STRING },
            dependentVar: { type: Type.STRING },
            independentVar: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  arabicTitle: { type: Type.STRING },
                  latex: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  arabicExplanation: { type: Type.STRING },
                },
                required: ['stepNumber', 'title', 'arabicTitle', 'latex', 'explanation', 'arabicExplanation'],
              },
            },
            generalSolutionLatex: { type: Type.STRING },
            ivpSolutionLatex: { type: Type.STRING },
            verificationLatex: { type: Type.STRING },
            arabicSummary: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'rawInput',
            'standardFormLatex',
            'order',
            'degree',
            'isLinear',
            'odeType',
            'arabicOdeType',
            'dependentVar',
            'independentVar',
            'steps',
            'generalSolutionLatex',
            'arabicSummary',
          ],
        },
      },
    });

    const jsonText = (response.text ?? '{}').trim();
    const parsed = JSON.parse(jsonText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('ODE Solver API Error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to solve differential equation via AI.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
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
