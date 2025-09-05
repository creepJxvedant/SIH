'use server';

/**
 * @fileOverview Generates a summary and highlights of an uploaded lecture.
 *
 * - generateSummaryAndHighlights - A function that takes a lecture video URL and generates a summary and highlights.
 * - LectureSummaryAndHighlightsInput - The input type for the generateSummaryAndHighlights function.
 * - LectureSummaryAndHighlightsOutput - The return type for the generateSummaryAndHighlights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LectureSummaryAndHighlightsInputSchema = z.object({
  lectureVideoUrl: z
    .string()
    .describe('The URL of the recorded lecture video.'),
});
export type LectureSummaryAndHighlightsInput = z.infer<
  typeof LectureSummaryAndHighlightsInputSchema
>;

const LectureSummaryAndHighlightsOutputSchema = z.object({
  summary: z.string().describe('The summary of the lecture.'),
  highlights: z.string().describe('The key highlights of the lecture.'),
});
export type LectureSummaryAndHighlightsOutput = z.infer<
  typeof LectureSummaryAndHighlightsOutputSchema
>;

export async function generateSummaryAndHighlights(
  input: LectureSummaryAndHighlightsInput
): Promise<LectureSummaryAndHighlightsOutput> {
  return lectureSummaryAndHighlightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lectureSummaryAndHighlightsPrompt',
  input: {schema: LectureSummaryAndHighlightsInputSchema},
  output: {schema: LectureSummaryAndHighlightsOutputSchema},
  prompt: `You are an AI assistant designed to provide summaries and highlights of recorded lectures.

  Please provide a concise summary and key highlights of the lecture provided in the following URL: {{{lectureVideoUrl}}}

  Summary:
  Highlights:`,
});

const lectureSummaryAndHighlightsFlow = ai.defineFlow(
  {
    name: 'lectureSummaryAndHighlightsFlow',
    inputSchema: LectureSummaryAndHighlightsInputSchema,
    outputSchema: LectureSummaryAndHighlightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
