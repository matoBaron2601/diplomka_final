import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { user, type NewUserDto, type UpdateUserDto, type UserDto } from '../db/schema';

export class UserRepository {
	async getUserById(userId: string): Promise<UserDto | undefined> {
		const result = await db.select().from(user).where(eq(user.id, userId));
		return result[0];
	}

	async getUserByEmail(email: string): Promise<UserDto | undefined> {
		const result = await db.select().from(user).where(eq(user.email, email));
		return result[0];
	}

	async createUser(newUser: NewUserDto): Promise<UserDto> {
		const result = await db.insert(user).values(newUser).returning();
		return result[0];
	}

	async deleteUserById(userId: string): Promise<UserDto | undefined> {
		const result = await db.delete(user).where(eq(user.id, userId)).returning();
		return result[0];
	}

	async updateUser(userId: string, updateUser: UpdateUserDto): Promise<UserDto | undefined> {
		const result = await db.update(user).set(updateUser).where(eq(user.id, userId)).returning();
		return result[0];
	}
}
