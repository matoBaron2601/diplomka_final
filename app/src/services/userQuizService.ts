import type { UserQuizDto, NewUserQuizDto } from '../db/schema';
import type { UserQuizRepository } from '../repositories/userQuizRepository';

class UserQuizNotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UserQuizNotFoundError';
	}
}

export class UserQuizService {
	constructor(private userQuizRepository: UserQuizRepository) {}

	async getUserQuizById(userQuizId: string): Promise<UserQuizDto> {
		const userQuiz = await this.userQuizRepository.getUserQuizById(userQuizId);
		if (!userQuiz) {
			throw new UserQuizNotFoundError(`UserQuiz with id ${userQuizId} not found`);
		}
		return userQuiz;
	}

	async createUserQuiz(newUserQuiz: NewUserQuizDto): Promise<UserQuizDto> {
		return this.userQuizRepository.createUserQuiz(newUserQuiz);
	}

	async deleteUserQuizById(userQuizId: string): Promise<UserQuizDto> {
		const userQuiz = await this.userQuizRepository.deleteUserQuizById(userQuizId);
		if (!userQuiz) {
			throw new UserQuizNotFoundError(`UserQuiz with id ${userQuizId} not found`);
		}
		return userQuiz;
	}

	async updateUserQuiz(newUserQuiz: UserQuizDto): Promise<UserQuizDto> {
		const userQuiz = await this.userQuizRepository.updateUserQuiz(newUserQuiz);
		if (!userQuiz) {
			throw new UserQuizNotFoundError(`UserQuiz with id ${newUserQuiz.id} not found`);
		}
		return userQuiz;
	}
}
