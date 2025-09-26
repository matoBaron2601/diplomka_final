import { Elysia, t } from 'elysia';
import { UserRepository } from '../../../repositories/userRepository';
import { UserService } from '../../../services/userService';
import { createUserSchema, updateUserSchema } from '../../../schemas/userSchema';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const userApi = new Elysia({ prefix: 'user' })

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
