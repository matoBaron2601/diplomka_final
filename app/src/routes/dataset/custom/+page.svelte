<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import ImportCustomDataset from './ImportCustomDataset.svelte';
	import { getUniqueDatasets } from '../custom/clientServices/getUniqueDatasets';
	import DatasetCard from '../default/components/DatasetCard.svelte';
	const getUniqueDatasetsQuery = createQuery({
		queryKey: ['get-datasets'],
		queryFn: async () => await getUniqueDatasets()
	});
</script>

<div class="h-full w-full">
	{#if !$getUniqueDatasetsQuery.data || $getUniqueDatasetsQuery.data?.length === 0}
		<ImportCustomDataset />
	{:else}
		{#each $getUniqueDatasetsQuery.data as dataset}
			<DatasetCard technology={dataset.technology} count={dataset.count} />
		{/each}
	{/if}
</div>
