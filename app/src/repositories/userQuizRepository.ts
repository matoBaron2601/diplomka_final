import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import {
	quiz,
	user,
	userQuiz,
	type NewUserQuizDto,
	type QuizDto,
	type UserDto,
	type UserQuizDto
} from '../db/schema';
import { type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { type ExtractTablesWithRelations } from 'drizzle-orm/relations';
import { type PgTransaction } from 'drizzle-orm/pg-core';

export class UserQuizRepository {
	async getUserQuizById(userQuizId: string): Promise<UserQuizDto | undefined> {
		const result = await db.select().from(userQuiz).where(eq(userQuiz.id, userQuizId));
		return result[0];
	}

	async createUserQuiz(
		newUserQuiz: NewUserQuizDto,
		tx: PgTransaction<
			NodePgQueryResultHKT,
			Record<string, never>,
			ExtractTablesWithRelations<Record<string, never>>
		>
	): Promise<UserQuizDto> {
		console.log('Creating user quiz:', newUserQuiz);
		const result = await tx.insert(userQuiz).values(newUserQuiz).returning();
		return result[0];
	}

	async deleteUserQuizById(userQuizId: string): Promise<UserQuizDto | undefined> {
		const result = await db.delete(userQuiz).where(eq(userQuiz.id, userQuizId)).returning();
		return result[0];
	}

	async updateUserQuiz(newUserQuiz: UserQuizDto): Promise<UserQuizDto | undefined> {
		const result = await db
			.update(userQuiz)
			.set(newUserQuiz)
			.where(eq(userQuiz.id, newUserQuiz.id))
			.returning();
		return result[0];
	}

	async getQuizesByUserId(userId: string): Promise<QuizDto[]> {
		const result = await db
			.select({ quiz })
			.from(userQuiz)
			.innerJoin(quiz, eq(quiz.id, userQuiz.quizId))
			.where(eq(userQuiz.userId, userId));
		return result.map((r) => r.quiz);
	}

	async getUsersByQuizId(quizId: string): Promise<UserDto[]> {
		const result = await db
			.select({ user })
			.from(userQuiz)
			.innerJoin(user, eq(user.id, userQuiz.userId))
			.where(eq(userQuiz.quizId, quizId));
		return result.map((r) => r.user);
	}
}
