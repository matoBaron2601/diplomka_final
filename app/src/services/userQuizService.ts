import type { UserQuiz, NewUserQuiz } from '../db/schema';
import type { UserQuizRepository } from '../repositories/userQuizRepository';

export class UserQuizService {
	constructor(private userQuizRepository: UserQuizRepository) {}

	async getUserQuizById(userQuizId: string): Promise<UserQuiz> {
		return this.userQuizRepository.getUserQuizById(userQuizId);
	}

	async createUserQuiz(newUserQuiz: NewUserQuiz): Promise<UserQuiz> {
		return this.userQuizRepository.createUserQuiz(newUserQuiz);
	}

	async deleteUserQuizById(userQuizId: string): Promise<UserQuiz> {
		return this.userQuizRepository.deleteUserQuizById(userQuizId);
	}

	async updateUserQuiz(newUserQuiz: UserQuiz): Promise<UserQuiz> {
		return this.userQuizRepository.updateUserQuiz(newUserQuiz);
	}
}
