import { Inngest } from 'inngest';
import { openaiMiddleware } from './middleware/openaiMiddleware';

export const inngest = new Inngest({
  id: 'TutorPlan',
  middleware: [openaiMiddleware],
});
