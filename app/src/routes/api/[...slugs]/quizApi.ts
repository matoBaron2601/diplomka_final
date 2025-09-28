import { Elysia, t } from 'elysia';

import { QuizRepository } from '../../../repositories/quizRepository';
import { QuizService } from '../../../services/quizService';
import { complexCreateQuizSchema, createQuizSchema } from '../../../schemas/quizSchema';
import { question } from '../../../db/schema';
import { QuestionRepository } from '../../../repositories/questionRepository';
import { OptionRepository } from '../../../repositories/optionRepository';
import { UserQuizRepository } from '../../../repositories/userQuizRepository';
import { OpenAiService } from '../../../services/openAiService';
const quizRepository = new QuizRepository();
const questionRepository = new QuestionRepository();
const optionRepository = new OptionRepository();
const userQuizRepository = new UserQuizRepository();
const openAiService = new OpenAiService();
const quizService = new QuizService(
	quizRepository,
	questionRepository,
	optionRepository,
	userQuizRepository,
	openAiService
);

export const quizApi = new Elysia({ prefix: 'quiz' })
	.onError(({ code, error, set }) => {
		switch (true) {
			default:
				set.status = 500;
				return { message: 'Internal Server Error' };
		}
	})

	.get('/:id', async (req) => {
		return await quizService.getQuizById(req.params.id);
	})
	.post(
		'/',
		async (req) => {
			return await quizService.createQuiz(req.body);
		},
		{
			body: createQuizSchema
		}
	)
	.post(
		'/complex',
		async (req) => {
			return await quizService.createComplexQuiz(req.body.prompt, req.body.technologies);
		},
		{
			body: complexCreateQuizSchema
		}
	);

export default quizApi;
