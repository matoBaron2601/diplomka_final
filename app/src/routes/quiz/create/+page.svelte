<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { createForm } from 'svelte-forms-lib';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Dataset } from '../../types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { getUniqueDatasets } from '../../clientServices/getUniqueDatasets';
	import Spinner from '$lib/components/Spinner.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import PageWrapper from '$lib/components/PageWrapper.svelte';

	const handleSubmit = async () => {
		await fetch('/api/quiz/complex', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt, technologies })
		});
	};

	const fetchDatasets = (datasetType: Dataset) =>
		createQuery({
			queryKey: ['unique-datasets', datasetType],
			queryFn: () => getUniqueDatasets(datasetType)
		});

	let activeTab = $state(Dataset.DEFAULT);
	let datasets = $derived.by(() => fetchDatasets(activeTab));
	let technologies = $state<string[]>([]);
	let prompt = $state('');

	$effect(() => {
		if (activeTab) technologies = [];
	});
</script>

<PageWrapper>
	<form onsubmit={handleSubmit} class="flex w-full min-w-[50%] items-center justify-center p-4">
		<Card.Card class="max-w-2xl">
			<Card.Content class="flex flex-col gap-2">
				<Card.Title class="text-xl">Create Quiz</Card.Title>
				<Tabs.Root class="w-[400px]" bind:value={activeTab}>
					<Tabs.List class="w-full">
						<Tabs.Trigger class="cursor-pointer" value={Dataset.DEFAULT}>Default</Tabs.Trigger>
						<Tabs.Trigger class="cursor-pointer" value={Dataset.CUSTOM}>Custom</Tabs.Trigger>
					</Tabs.List>

					{#if $datasets.isLoading}
						<Spinner classname="w-6 h-6" />
					{:else if $datasets.data}
						<Select.Root type="multiple" bind:value={technologies}>
							<Select.Trigger class="w-[180px] cursor-pointer">Technologies</Select.Trigger>
							<Select.Content>
								{#each $datasets.data as dataset}
									<Select.Item class="cursor-pointer" value={dataset.technology}
										>{dataset.technology}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					{/if}
				</Tabs.Root>
				<Input bind:value={prompt} type="text" placeholder="Enter your prompt" class="max-w-xs" />
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button type="submit" class="cursor-pointer">Create Quiz</Button>
			</Card.Footer>
		</Card.Card>
	</form>
</PageWrapper>
