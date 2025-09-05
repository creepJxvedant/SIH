'use server';
/**
 * @fileOverview Automatically tags uploaded recorded lectures using AI for easy search and filtering.
 *
 * - autoTagRecordedLecture - A function that handles the automatic tagging of recorded lectures.
 * - AutoTagRecordedLectureInput - The input type for the autoTagRecordedLecture function.
 * - AutoTagRecordedLectureOutput - The return type for the autoTagRecordedLecture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoTagRecordedLectureInputSchema = z.object({
  lectureTitle: z.string().describe('The title of the recorded lecture.'),
  lectureDescription: z.string().describe('A detailed description of the lecture content.'),
  transcript: z.string().describe('The transcript of the recorded lecture.'),
});
export type AutoTagRecordedLectureInput = z.infer<typeof AutoTagRecordedLectureInputSchema>;

const AutoTagRecordedLectureOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of tags generated for the lecture.'),
});
export type AutoTagRecordedLectureOutput = z.infer<typeof AutoTagRecordedLectureOutputSchema>;

export async function autoTagRecordedLecture(input: AutoTagRecordedLectureInput): Promise<AutoTagRecordedLectureOutput> {
  return autoTagRecordedLectureFlow(input);
}

const autoTagRecordedLecturePrompt = ai.definePrompt({
  name: 'autoTagRecordedLecturePrompt',
  input: {schema: AutoTagRecordedLectureInputSchema},
  output: {schema: AutoTagRecordedLectureOutputSchema},
  prompt: `You are an AI assistant designed to automatically tag recorded lectures based on their content.

  Your task is to generate a list of relevant tags for a lecture, given its title, description, and transcript.
  These tags will help students easily search and filter lectures by topic.

  Consider the following information about the lecture:
  Title: {{{lectureTitle}}}
  Description: {{{lectureDescription}}}
  Transcript: {{{transcript}}}

  Generate an array of tags that accurately reflect the lecture's content. Each tag should be a single word or a short phrase.
  The tags should be comma separated without quotations. Limit to a maximum of 10 tags.`, 
});

const autoTagRecordedLectureFlow = ai.defineFlow(
  {
    name: 'autoTagRecordedLectureFlow',
    inputSchema: AutoTagRecordedLectureInputSchema,
    outputSchema: AutoTagRecordedLectureOutputSchema,
  },
  async input => {
    const {output} = await autoTagRecordedLecturePrompt(input);
    return output!;
  }
);
