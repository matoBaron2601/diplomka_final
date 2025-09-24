import type { Quiz, NewQuiz } from '../db/schema';
import type { QuizRepository } from '../repositories/quizRepository';

export class QuizService {
	constructor(private quizRepository: QuizRepository) {}

	async getQuizById(quizId: string): Promise<Quiz> {
		return this.quizRepository.getQuizById(quizId);
	}

	async createQuiz(newQuiz: NewQuiz): Promise<Quiz> {
		return this.quizRepository.createQuiz(newQuiz);
	}

	async deleteQuizById(quizId: string): Promise<Quiz> {
		return this.quizRepository.deleteQuizById(quizId);
	}

	async updateQuiz(newQuiz: Quiz): Promise<Quiz> {
		return this.quizRepository.updateQuiz(newQuiz);
	}
}
