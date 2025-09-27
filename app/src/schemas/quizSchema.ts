import { t } from 'elysia';

export const createQuizSchema = t.Object({
	quiz: t.Object({
		creatorId: t.String(),
		timePerQuestion: t.Optional(t.Number()),
		canGoBack: t.Optional(t.Boolean())
	}),
	questions: t.Array(
		t.Object({
			text: t.String(),
			options: t.Array(
				t.Object({
					text: t.String(),
					isCorrect: t.Boolean()
				})
			)
		})
	)
});
