import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { type Question, question, type NewQuestion } from '../db/schema';

export class QuestionRepository {
	async getQuestionById(questionId: string): Promise<Question> {
		const result = await db.select().from(question).where(eq(question.id, questionId));
		return result[0];
	}

	async createQuestion(newQuestion: NewQuestion): Promise<Question> {
		const result = await db.insert(question).values(newQuestion).returning();
		return result[0];
	}

	async deleteQuestionById(questionId: string): Promise<Question> {
		const result = await db.delete(question).where(eq(question.id, questionId)).returning();
		return result[0];
	}

	async updateQuestion(newQuestion: Question): Promise<Question> {
		const result = await db
			.update(question)
			.set(newQuestion)
			.where(eq(question.id, newQuestion.id))
			.returning();
		return result[0];
	}
}
