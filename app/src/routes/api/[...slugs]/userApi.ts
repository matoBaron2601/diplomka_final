import { Elysia, t } from 'elysia';
import { UserRepository } from '../../../repositories/userRepository';
import {
	UserCouldNotBeCreatedError,
	UserNotFoundError,
	UserService
} from '../../../services/userService';
import { createUserSchema, updateUserSchema } from '../../../schemas/userSchema';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const userApi = new Elysia({ prefix: 'user' })
	.onError(({ code, error, set }) => {
		switch (true) {
			case error instanceof UserNotFoundError:
				set.status = 404;
			case error instanceof UserCouldNotBeCreatedError:
				set.status = 409;
			case code === 'VALIDATION':
				return;
			default:
				set.status = 500;
				return { message: 'Internal Server Error' };
		}
	})
	.get('/:id', async (req) => {
		return await userService.getUserById(req.params.id);
	})
	.post(
		'/',
		async (req) => {
			return await userService.createUser(req.body);
		},
		{
			body: createUserSchema
		}
	)

	.delete('/:id', async (req) => {
		return await userService.deleteUserById(req.params.id);
	})

	.put(
		'/:id',
		async (req) => {
			return await userService.updateUser(req.params.id, req.body);
		},
		{
			body: updateUserSchema
		}
	)

	.get('/email/:email', async (req) => {
		return await userService.getUserByEmail(req.params.email);
	});

export default userApi;
