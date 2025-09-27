import type { QuestionDto, NewQuestionDto } from '../db/schema';
import type { QuestionRepository } from '../repositories/questionRepository';

class QuestionNotFoundError extends Error {
	constructor(message: string = 'Question not found') {
		super(message);
		this.name = 'QuestionNotFoundError';
	}
}

export class QuestionService {
	constructor(private questionRepository: QuestionRepository) {}

	async getQuestionById(questionId: string): Promise<QuestionDto> {
		const result = await this.questionRepository.getQuestionById(questionId);
		if (!result) {
			throw new QuestionNotFoundError(`Question with id ${questionId} not found`);
		}
		return result;
	}

	async createQuestion(newQuestion: NewQuestionDto): Promise<QuestionDto> {
		return this.questionRepository.createQuestion(newQuestion);
	}

	async deleteQuestionById(questionId: string): Promise<QuestionDto> {
		const result = await this.questionRepository.deleteQuestionById(questionId);
		if (!result) {
			throw new QuestionNotFoundError(`Question with id ${questionId} could not be deleted`);
		}
		return result;
	}

	async updateQuestion(newQuestion: QuestionDto): Promise<QuestionDto> {
		const result = await this.questionRepository.updateQuestion(newQuestion);
		if (!result) {
			throw new QuestionNotFoundError(`Question with id ${newQuestion.id} was not found`);
		}
		return result;
	}
}
