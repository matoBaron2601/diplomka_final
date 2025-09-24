import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { user, type NewUser, type User } from '../db/schema';

export class UserRepository {
	async getUserById(userId: string): Promise<User> {
		const result = await db.select().from(user).where(eq(user.id, userId));
		return result[0];
	}

	async getUserByEmail(email: string): Promise<User> {
		const result = await db.select().from(user).where(eq(user.email, email));
		return result[0];
	}

	async createUser(newUser: NewUser): Promise<User> {
		const result = await db.insert(user).values(newUser).returning();
		return result[0];
	}

	async deleteUserById(userId: string): Promise<User> {
		const result = await db.delete(user).where(eq(user.id, userId)).returning();
		return result[0];
	}

	async updateUser(newUser: User): Promise<User> {
		const result = await db.update(user).set(newUser).where(eq(user.id, newUser.id)).returning();
		return result[0];
	}
}
