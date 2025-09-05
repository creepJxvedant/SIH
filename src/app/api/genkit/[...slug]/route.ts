import { createApp } from '@genkit-ai/next';
import '@/ai/flows/auto-tag-recorded-lectures';
import '@/ai/flows/lecture-summary-and-highlights';

export const { GET, POST } = createApp();
