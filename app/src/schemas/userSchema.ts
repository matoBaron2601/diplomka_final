import { t } from 'elysia';

export const createUserSchema = t.Object({
	name: t.String(),
	email: t.String(),
	profilePicture: t.String()
});

export const updateUserSchema = t.Object({
	name: t.Optional(t.String()),
	email: t.Optional(t.String()),
	profilePicture: t.Optional(t.String())
});
