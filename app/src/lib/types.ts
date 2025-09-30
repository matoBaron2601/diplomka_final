export const Params = {
	dataset: 'dataset',
	custom: 'custom',
	default: 'default',
	quiz: 'quiz',
	create: 'create',
	history: 'history',
	attended: 'attended',
	created: 'created',
	list: 'list'
} as const;

export type Params = (typeof Params)[keyof typeof Params];
