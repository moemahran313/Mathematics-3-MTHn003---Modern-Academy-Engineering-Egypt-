import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import dotenv from 'dotenv';

dotenv.config();

function odeSolverApiPlugin(): Plugin {
  return {
    name: 'ode-solver-api',
    configureServer(server) {
      server.middlewares.use('/api/solve-ode', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { latex } = JSON.parse(body || '{}');
            if (!latex) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing latex input' }));
              return;
            }

            if (!process.env.GEMINI_API_KEY) {
              res.statusCode = 503;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GEMINI_API_KEY not configured on server' }));
              return;
            }

            const { GoogleGenAI } = await import('@google/genai');
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

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(response.text || '{}');
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Failed to solve ODE' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      odeSolverApiPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'icon.svg',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
        ],
        manifest: {
          id: '/',
          name: 'Math 3 Reference Library',
          short_name: 'Math 3',
          description:
            'Comprehensive reference library and study hub for Mathematics 3 (MTH203/MTHn103) with lecture notes, solved exams, and interactive quiz arena.',
          theme_color: '#020617',
          background_color: '#020617',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'jsdelivr-cdn-cache',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
