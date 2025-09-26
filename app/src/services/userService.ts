import { user, type NewUser, type UpdateUser, type User } from '../db/schema';
import type { UserRepository } from '../repositories/userRepository';

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async getUserById(userId: string): Promise<User> {
		return this.userRepository.getUserById(userId);
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.userRepository.getUserByEmail(email);
	}

	async createUser(newUser: NewUser): Promise<User> {
		const existing = await this.userRepository.getUserByEmail(newUser.email);
		if (existing) {
			throw new Error(`User with email ${newUser.email} already exists`);
		}

		return this.userRepository.createUser(newUser);
	}

	async deleteUserById(userId: string): Promise<User> {
		return this.userRepository.deleteUserById(userId);
	}

	async deleteUserByEmail(email: string): Promise<User> {
		const user = this.getUserByEmail(email);
		return this.userRepository.deleteUserById((await user).id);
	}

	async updateUser(userId: string, updateUser: UpdateUser): Promise<User> {
		return this.userRepository.updateUser(userId, updateUser);
	}
}
