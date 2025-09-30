import { get } from 'http';
import { db } from '../db/client';
import type { QuizDto } from '../db/schema';
import type { CreateQuizRequest, Quiz, CreateQuizInitialRequest } from '../schemas/quizSchema';
import type { OpenAiService } from '../services/openAiService';
import type { OptionService } from '../services/optionService';
import type { QuestionService } from '../services/questionService';
import type { QuizService } from '../services/quizService';
import type { UserQuizService } from '../services/userQuizService';

export class QuizFacade {
	constructor(
		private quizService: QuizService,
		private userQuizService: UserQuizService,
		private questionService: QuestionService,
		private optionService: OptionService,
		private openAiService: OpenAiService
	) {}

	async initialCreateQuiz(_initialCreateQuiz: CreateQuizInitialRequest): Promise<Quiz> {
		const openaiResult = await this.openAiService.callOpenAI();
		const parsedJson: CreateQuizRequest = JSON.parse(openaiResult.choices[0].message.content);
		const quizId = await this.createQuiz(parsedJson);
		return await this.getQuizById(quizId);
	}

	async createQuiz(createQuiz: CreateQuizRequest): Promise<string> {
		return await db.transaction(async (tx) => {
			const createdQuiz = await this.quizService.createQuizTransactional(createQuiz.quiz, tx);
			await this.userQuizService.createUserQuizTransational(
				{
					userId: createQuiz.quiz.creatorId,
					quizId: createdQuiz.id
				},
				tx
			);
			for (const question of createQuiz.questions) {
				const createdQuestion = await this.questionService.createQuestionTransactional(
					{
						quizId: createdQuiz.id,
						text: question.text
					},
					tx
				);
				for (const option of question.options) {
					await this.optionService.createOptionTransactional(
						{
							text: option.text,
							isCorrect: option.isCorrect,
							questionId: createdQuestion.id
						},
						tx
					);
				}
			}
			return createdQuiz.id;
		});
	}

	async getQuizById(quizId: string): Promise<Quiz> {
		const quiz = await this.quizService.getQuizById(quizId);
		const questionsData = await this.questionService.getQuestionsByQuizId(quizId);

		const questions: Quiz['questions'] = [];

		for (const question of questionsData) {
			const optionsData = await this.optionService.getOptionsByQuestionId(question.id);

			const questionItem = {
				questionId: question.id,
				text: question.text,
				options: optionsData.map((option) => ({
					optionId: option.id,
					text: option.text,
					isCorrect: option.isCorrect
				}))
			};

			questions.push(questionItem);
		}

		return {
			quiz,
			questions
		};
	}

	async getQuizzesByCreatorId(creatorId: string): Promise<Quiz[]> {
		const quizzesData = await this.quizService.getQuizzesByCreatorId(creatorId);
		return await Promise.all(
			quizzesData.map(async (quiz) => ({
				...(await this.getQuizById(quiz.id))
			}))
		);
	}
}
