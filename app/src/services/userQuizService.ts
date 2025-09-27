import type { UserQuizDto, NewUserQuizDto } from '../db/schema';
import type { UserQuizRepository } from '../repositories/userQuizRepository';

export class UserQuizService {
	constructor(private userQuizRepository: UserQuizRepository) {}

	async getUserQuizById(userQuizId: string): Promise<UserQuizDto> {
		return this.userQuizRepository.getUserQuizById(userQuizId);
	}

	async createUserQuiz(newUserQuiz: NewUserQuizDto): Promise<UserQuizDto> {
		return this.userQuizRepository.createUserQuiz(newUserQuiz);
	}

	async deleteUserQuizById(userQuizId: string): Promise<UserQuizDto> {
		return this.userQuizRepository.deleteUserQuizById(userQuizId);
	}

	async updateUserQuiz(newUserQuiz: UserQuizDto): Promise<UserQuizDto> {
		return this.userQuizRepository.updateUserQuiz(newUserQuiz);
	}
}
