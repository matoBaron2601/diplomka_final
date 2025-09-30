import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { quiz, type CreateQuizDto, type QuizDto } from '../db/schema';
import { type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { type ExtractTablesWithRelations } from 'drizzle-orm/relations';
import { type PgTransaction } from 'drizzle-orm/pg-core';
import type { Transaction } from '../types';

export class QuizRepository {
	async getQuizById(quizId: string): Promise<QuizDto | undefined> {
		const result = await db.select().from(quiz).where(eq(quiz.id, quizId));
		return result[0];
	}

	async createQuiz(newQuiz: CreateQuizDto): Promise<QuizDto> {
		const result = await db.insert(quiz).values(newQuiz).returning();
		return result[0];
	}

	async createQuizTransactional(newQuiz: CreateQuizDto, tx: Transaction): Promise<QuizDto> {
		const result = await tx.insert(quiz).values(newQuiz).returning();
		return result[0];
	}

	async deleteQuizById(quizId: string): Promise<QuizDto | undefined> {
		const result = await db.delete(quiz).where(eq(quiz.id, quizId)).returning();
		return result[0];
	}

	async updateQuiz(newQuiz: QuizDto): Promise<QuizDto | undefined> {
		const result = await db.update(quiz).set(newQuiz).where(eq(quiz.id, newQuiz.id)).returning();
		return result[0];
	}

	async getQuizzesByCreatorId(creatorId: string): Promise<QuizDto[]> {
		return await db.select().from(quiz).where(eq(quiz.creatorId, creatorId));
	}
}
