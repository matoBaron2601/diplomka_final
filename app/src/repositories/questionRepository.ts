import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { type QuestionDto, question, type NewQuestionDto } from '../db/schema';
import { type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { type ExtractTablesWithRelations } from 'drizzle-orm/relations';
import { type PgTransaction } from 'drizzle-orm/pg-core';
export class QuestionRepository {
	async getQuestionById(questionId: string): Promise<QuestionDto | undefined> {
		const result = await db.select().from(question).where(eq(question.id, questionId));
		return result[0];
	}

	async createQuestion(
		newQuestion: NewQuestionDto,
		tx: PgTransaction<
			NodePgQueryResultHKT,
			Record<string, never>,
			ExtractTablesWithRelations<Record<string, never>>
		>
	): Promise<QuestionDto> {
		const result = await tx.insert(question).values(newQuestion).returning();
		return result[0];
	}

	async deleteQuestionById(questionId: string): Promise<QuestionDto | undefined> {
		const result = await db.delete(question).where(eq(question.id, questionId)).returning();
		return result[0];
	}

	async updateQuestion(newQuestion: QuestionDto): Promise<QuestionDto | undefined> {
		const result = await db
			.update(question)
			.set(newQuestion)
			.where(eq(question.id, newQuestion.id))
			.returning();
		return result[0];
	}
}
