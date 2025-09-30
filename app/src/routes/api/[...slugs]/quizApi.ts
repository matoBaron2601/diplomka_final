import { Elysia, t } from 'elysia';

import { QuizRepository } from '../../../repositories/quizRepository';
import { QuizService } from '../../../services/quizService';
import { question } from '../../../db/schema';
import { QuestionRepository } from '../../../repositories/questionRepository';
import { OptionRepository } from '../../../repositories/optionRepository';
import { UserQuizRepository } from '../../../repositories/userQuizRepository';
import { OpenAiService } from '../../../services/openAiService';
import { UserQuizService } from '../../../services/userQuizService';
import { QuestionService } from '../../../services/questionService';
import { OptionService } from '../../../services/optionService';
import { QuizFacade } from '../../../facades/quizFacade';
import { createQuizInitialRequestSchema, quizSchema } from '../../../schemas/quizSchema';

const quizRepository = new QuizRepository();
const questionRepository = new QuestionRepository();
const optionRepository = new OptionRepository();
const userQuizRepository = new UserQuizRepository();
const openAiService = new OpenAiService();

const userQuizService = new UserQuizService(userQuizRepository);
const questionService = new QuestionService(questionRepository);
const optionService = new OptionService(optionRepository);
const quizService = new QuizService(quizRepository);

const quizFacade = new QuizFacade(
	quizService,
	userQuizService,
	questionService,
	optionService,
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

	.get(
		'/:id',
		async (req) => {
			return await quizFacade.getQuizById(req.params.id);
		},
		{
			response: quizSchema
		}
	)
	.post(
		'/',
		async (req) => {
			return await quizFacade.initialCreateQuiz(req.body);
		},
		{
			body: createQuizInitialRequestSchema,
			response: quizSchema
		}
	)
	.get(
		'/list/:creatorId',
		async (req) => {
			return await quizFacade.getQuizzesByCreatorId(req.params.creatorId);
		},
		{
			response: t.Array(quizSchema)
		}
	);

export default quizApi;
