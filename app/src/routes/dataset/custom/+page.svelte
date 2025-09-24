<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import ImportCustomDataset from './ImportCustomDataset.svelte';
	import { getUniqueDatasets } from '../custom/clientServices/getUniqueDatasets';
	import DatasetCard from '../default/components/DatasetCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	const getUniqueDatasetsQuery = createQuery({
		queryKey: ['get-datasets'],
		queryFn: async () => await getUniqueDatasets()
	});
</script>

<PageWrapper>
	<div class="h-full w-full">
		{#if $getUniqueDatasetsQuery.isLoading}
			<Spinner classname="h-10 w-10" />
		{:else if !$getUniqueDatasetsQuery.data || $getUniqueDatasetsQuery.data?.length === 0}
			<ImportCustomDataset />
		{:else}
			{#each $getUniqueDatasetsQuery.data as dataset}
				<DatasetCard technology={dataset.technology} count={dataset.count} />
			{/each}
		{/if}
	</div>
</PageWrapper>
