<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { getUniqueDatasets } from './clientServices/getUniqueDatasets';
	import * as Card from '$lib/components/ui/card/index.js';
	import DatasetCard from './components/DatasetCard.svelte';

	const getUniqueDatasetsQuery = createQuery({
		queryKey: ['get-datasets'],
		queryFn: async () => await getUniqueDatasets()
	});
</script>

{#if $getUniqueDatasetsQuery.data}
	{#each $getUniqueDatasetsQuery.data as dataset}
		<DatasetCard technology={dataset.technology} count={dataset.count} />
	{/each}
{/if}
