import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createQuizFormSchema } from './createQuizFormSchema';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const createQuizForm = await superValidate(zod(createQuizFormSchema));

	return { createQuizForm };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createQuizFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
