import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { quiz, type NewQuiz, type Quiz } from '../db/schema';

export class QuizRepository {
	async getQuizById(quizId: string): Promise<Quiz> {
		const result = await db.select().from(quiz).where(eq(quiz.id, quizId));
		return result[0];
	}

	async createQuiz(newQuiz: NewQuiz): Promise<Quiz> {
		const result = await db.insert(quiz).values(newQuiz).returning();
		return result[0];
	}

	async deleteQuizById(quizId: string): Promise<Quiz> {
		const result = await db.delete(quiz).where(eq(quiz.id, quizId)).returning();
		return result[0];
	}

	async updateQuiz(newQuiz: Quiz): Promise<Quiz> {
		const result = await db.update(quiz).set(newQuiz).where(eq(quiz.id, newQuiz.id)).returning();
		return result[0];
	}
}
