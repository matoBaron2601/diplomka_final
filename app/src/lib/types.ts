import { quiz } from "../db/schema";

export const Params = {
	dataset: 'dataset',
	custom: 'custom',
	default: 'default',
	quiz: 'quiz',
	create: 'create',
	history: 'history'
} as const;

export type Params = (typeof Params)[keyof typeof Params];
