// inngest/middleware/openaiMiddleware.ts

import { InngestMiddleware } from 'inngest';
import OpenAI from 'openai';

export const openaiMiddleware = new InngestMiddleware({
  name: 'OpenAI Middleware',
  init() {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    return {
      onFunctionRun() {
        return {
          transformInput() {
            return {
              ctx: {
                openai,
              },
            };
          },
        };
      },
    };
  },
});