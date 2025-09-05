import { config } from 'dotenv';
config();

import '@/ai/flows/auto-tag-recorded-lectures.ts';
import '@/ai/flows/lecture-summary-and-highlights.ts';