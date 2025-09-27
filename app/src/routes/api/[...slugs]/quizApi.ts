import { Elysia, t } from 'elysia';

import { QuizRepository } from '../../../repositories/quizRepository';
import { QuizService } from '../../../services/quizService';
import { createQuizSchema } from '../../../schemas/quizSchema';
import { question } from '../../../db/schema';
import { QuestionRepository } from '../../../repositories/questionRepository';
import { OptionRepository } from '../../../repositories/optionRepository';
const quizRepository = new QuizRepository();
const questionRepository = new QuestionRepository();
const optionRepository = new OptionRepository();
const quizService = new QuizService(quizRepository, questionRepository, optionRepository);

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
	);

export default quizApi;
