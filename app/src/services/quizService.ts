import type { QuizDto } from '../db/schema';
import type { OptionRepository } from '../repositories/optionRepository';
import type { QuestionRepository } from '../repositories/questionRepository';
import type { QuizRepository } from '../repositories/quizRepository';
import type { UserQuizRepository } from '../repositories/userQuizRepository';
import { OpenAiService } from './openAiService';
import { db } from '../db/client';
import { createQuizSchema } from '../schemas/quizSchema';
import { type Static } from 'elysia';
import { getDocumentsByPrompt } from '../typesense/typesenseService';
export class QuizNotFoundError extends Error {
	constructor(message: string = 'Quiz not found') {
		super(message);
		this.name = 'QuizNotFoundError';
	}
}
export type CreateQuiz = Static<typeof createQuizSchema>;

export class QuizService {
	constructor(
		private quizRepository: QuizRepository,
		private questionRepository: QuestionRepository,
		private optionRepository: OptionRepository,
		private userQuizRepository: UserQuizRepository,
		private openAiService: OpenAiService
	) {}

	async getQuizById(quizId: string): Promise<QuizDto> {
		const result = await this.quizRepository.getQuizById(quizId);
		if (!result) {
			throw new QuizNotFoundError(`Quiz with id ${quizId} not found`);
		}
		return result;
	}

	async createQuiz(createQuiz: CreateQuiz): Promise<QuizDto> {
		return await db.transaction(async (tx) => {
			const newQuiz = await this.quizRepository.createQuiz(createQuiz.quiz, tx);
			await this.userQuizRepository.createUserQuiz(
				{
					userId: createQuiz.quiz.creatorId,
					quizId: newQuiz.id
				},
				tx
			);
			for (const question of createQuiz.questions) {
				const newQuestion = await this.questionRepository.createQuestion(
					{
						quizId: newQuiz.id,
						text: question.text
					},
					tx
				);
				for (const option of question.options) {
					await this.optionRepository.createOption(
						{
							text: option.text,
							isCorrect: option.isCorrect,
							questionId: newQuestion.id
						},
						tx
					);
				}
			}
			return newQuiz;
		});
	}

	async deleteQuizById(quizId: string): Promise<QuizDto> {
		const result = await this.quizRepository.deleteQuizById(quizId);
		if (!result) {
			throw new QuizNotFoundError(`Quiz with id ${quizId} could not be deleted`);
		}
		return result;
	}

	async updateQuiz(quizId: string, newQuiz: QuizDto): Promise<QuizDto> {
		const result = await this.quizRepository.updateQuiz(newQuiz);
		if (!result) {
			throw new QuizNotFoundError(`Quiz with id ${quizId} was not found`);
		}
		return result;
	}

	async createComplexQuiz(prompt: string, technologies: string[]): Promise<void> {
		const typesenseDocuments = await getDocumentsByPrompt(prompt, technologies);
		if (!typesenseDocuments.hits) {
			throw new Error('No relevant documents found to create a quiz.');
		}

		const contents = typesenseDocuments.hits.map(
			(hit) => (hit.document as { content: string }).content
		);
		console.log('Retrieved contents from Typesense:', contents[20]);
	}
}
