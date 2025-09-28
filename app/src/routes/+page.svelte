<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { onMount } from 'svelte';

	const createUser = async () => {
		const res = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: 'gl5sk0rrfags4rtnw70awup',
				a: 'Martin',
				email: 'tes1@tet.com',
				profilePicture: 'test'
			})
		});
		if (res.ok) {
			return await res.json();
		}

		return null;
	};

	const updateUser = async () => {
		const res = await fetch('/api/user/gl5sk0rrfags4rtnw70awup2', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nassfdfsdgfdsgme: 'Martin Updated'
			})
		});
	};

	const createQuiz = async () => {
		const res = await fetch('/api/quiz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				quiz: {
					creatorId: 'n3xdzn80olu0pr6q1t0gpf6w',
					timePerQuestion: 30,
					canGoBack: true
				},
				questions: [
					{
						text: 'What is the capital of France?',
						options: [
							{
								text: 'Paris',
								isCorrect: true
							},
							{
								text: 'Berlin',
								isCorrect: false
							},
							{
								text: 'Madrid',
								isCorrect: false
							}
						]
					},
					{
						text: 'Which planet is known as the Red Planet?',
						options: [
							{
								text: 'Earth',
								isCorrect: false
							},
							{
								text: 'Mars',
								isCorrect: true
							},
							{
								text: 'Jupiter',
								isCorrect: false
							}
						]
					},
					{
						text: 'What is the largest mammal in the world?',
						options: [
							{
								text: 'Elephant',
								isCorrect: false
							},
							{
								text: 'Blue Whale',
								isCorrect: true
							},
							{
								text: 'Giraffe',
								isCorrect: false
							}
						]
					}
				]
			})
		});
		if (res.ok) {
			return await res.json();
		}

		return null;
	};

	onMount(async () => {
		// const createQuizd = await createQuiz();
		const prompt = await fetch('/api/quiz/complex?prompt=react', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
	});
</script>

<PageWrapper>Children</PageWrapper>
