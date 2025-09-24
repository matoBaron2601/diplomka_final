import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import {
	quiz,
	user,
	userQuiz,
	type NewUserQuiz,
	type Quiz,
	type User,
	type UserQuiz
} from '../db/schema';

export class UserQuizRepository {
	async getUserQuizById(userQuizId: string): Promise<UserQuiz> {
		const result = await db.select().from(userQuiz).where(eq(userQuiz.id, userQuizId));
		return result[0];
	}

	async createUserQuiz(newUserQuiz: NewUserQuiz): Promise<UserQuiz> {
		const result = await db.insert(userQuiz).values(newUserQuiz).returning();
		return result[0];
	}

	async deleteUserQuizById(userQuizId: string): Promise<UserQuiz> {
		const result = await db.delete(userQuiz).where(eq(userQuiz.id, userQuizId)).returning();
		return result[0];
	}

	async updateUserQuiz(newUserQuiz: UserQuiz): Promise<UserQuiz> {
		const result = await db
			.update(userQuiz)
			.set(newUserQuiz)
			.where(eq(userQuiz.id, newUserQuiz.id))
			.returning();
		return result[0];
	}

	async getQuizesByUserId(userId: string): Promise<Quiz[]> {
		const result = await db
			.select({ quiz })
			.from(userQuiz)
			.innerJoin(quiz, eq(quiz.id, userQuiz.quizId))
			.where(eq(userQuiz.userId, userId));
		return result.map((r) => r.quiz);
	}

	async getUsersByQuizId(quizId: string): Promise<User[]> {
		const result = await db
			.select({ user })
			.from(userQuiz)
			.innerJoin(user, eq(user.id, userQuiz.userId))
			.where(eq(userQuiz.quizId, quizId));
		return result.map((r) => r.user);
	}
}
