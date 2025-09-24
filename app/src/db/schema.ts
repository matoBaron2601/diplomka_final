import { pgTable, varchar, boolean, timestamp, pgEnum, numeric } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import type { InferInsertModel, InferModel, InferSelectModel } from 'drizzle-orm';

export const user = pgTable('user', {
	id: varchar('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	email: varchar('email').notNull().unique(),
	name: varchar('name').notNull(),
	profilePicture: varchar('profilePicture').notNull()
});

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export const quiz = pgTable('quiz', {
	id: varchar('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	creatorId: varchar('creatorId')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	timePerQuestion: numeric('timePerQuestion'),
	canGoBack: boolean('canGoBack')
});

export const userQuiz = pgTable('userQuiz', {
	id: varchar('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	userId: varchar('userId')
		.notNull()
		.references(() => user.id),
	quizId: varchar('quizId')
		.notNull()
		.references(() => quiz.id),
	openedAt: timestamp('openedAt').notNull().defaultNow(),
	submittedAt: timestamp('submittedAt')
});

export const question = pgTable('question', {
	id: varchar('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	quizId: varchar('quizId')
		.notNull()
		.references(() => quiz.id),
	text: varchar('text').notNull()
});

export const option = pgTable('option', {
	id: varchar('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	questionId: varchar('questionId')
		.notNull()
		.references(() => question.id),
	text: varchar('text').notNull(),
	isCorrect: boolean('isCorrect').notNull()
});

export const table = {
	quiz,
	question,
	option,
	user
} as const;
