import type { Question, NewQuestion } from '../db/schema';
import type { QuestionRepository } from '../repositories/questionRepository';

export class QuestionService {
	constructor(private questionRepository: QuestionRepository) {}

	async getQuestionById(questionId: string): Promise<Question> {
		return this.questionRepository.getQuestionById(questionId);
	}

	async createQuestion(newQuestion: NewQuestion): Promise<Question> {
		return this.questionRepository.createQuestion(newQuestion);
	}

	async deleteQuestionById(questionId: string): Promise<Question> {
		return this.questionRepository.deleteQuestionById(questionId);
	}

	async updateQuestion(newQuestion: Question): Promise<Question> {
		return this.questionRepository.updateQuestion(newQuestion);
	}
}
