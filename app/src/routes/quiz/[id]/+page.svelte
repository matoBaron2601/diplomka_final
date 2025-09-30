<script lang="ts">
	import { page } from '$app/state';

	const getComplexQuizById = async (id: string) => {
		const response = await fetch(`/api/quiz/complex/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch quiz');
		}
		const data = await response.json();
		return data;
	};

	import { onMount } from 'svelte';
	import Question from '../components/Question.svelte';

	onMount(async () => {
		await getComplexQuizById(page.params.id ?? '');
	});
</script>

<div>



	<Question />
</div>
