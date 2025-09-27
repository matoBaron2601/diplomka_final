<script lang="ts">
	type FormValues = {
		prompt: string;
	};
	import { createForm } from 'svelte-forms-lib';
	import { Input } from '$lib/components/ui/input/index.js';

	const { form, handleSubmit } = createForm<FormValues>({
		initialValues: {
			prompt: 'test'
		},
		onSubmit: (values: FormValues) => {
			alert(JSON.stringify(values));
		}
	});
</script>

<form on:submit={handleSubmit}>
	<label for="prompt">Prompt</label>
	<Input
		id="prompt"
		name="prompt"
		bind:value={$form.prompt}
		placeholder="Enter the prompt"
		required
	/>

	<button type="submit">Create quiz</button>
</form>
