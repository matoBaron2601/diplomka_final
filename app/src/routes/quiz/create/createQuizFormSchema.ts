import { z } from 'zod';
import { Dataset } from '../../types';

export const createQuizFormSchema = z.object({
	activeTab: z.nativeEnum(Dataset).default(Dataset.DEFAULT),
	technologies: z.array(z.string()).default([]),
	prompt: z.string().default('')
});
export type CreateQuizFormSchema = typeof createQuizFormSchema;
