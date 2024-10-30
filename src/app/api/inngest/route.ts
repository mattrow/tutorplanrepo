import { serve } from 'inngest/next';
import { inngest } from '../../../../inngest/client';
import functions from '../../../../inngest/functions';
import { generateLesson } from '../../../../inngest/functions/generateLesson';

export const { POST, GET, PUT } = serve({
  client: inngest,
  functions: [generateLesson],
});
