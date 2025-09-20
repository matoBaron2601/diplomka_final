import { pgTable, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const user = pgTable('user', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
  profilePicture: varchar('profilePicture').notNull(),
});

export const quiz = pgTable('quiz', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
});

export const question = pgTable('question', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  quizId: varchar('quizId')
    .notNull()
    .references(() => quiz.id),
  text: varchar('text').notNull(),
});

export const option = pgTable('option', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  questionId: varchar('questionId')
    .notNull()
    .references(() => question.id),
  text: varchar('text').notNull(),
  isCorrect: boolean('isCorrect').notNull(),
});

export const table = {
  quiz,
  question,
  option,
  user,
} as const;
