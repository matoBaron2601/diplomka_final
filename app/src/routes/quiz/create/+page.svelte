<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import type { PageData } from './$types.js';
	import CreateQuizForm from './components/CreateQuizForm.svelte';
	let { data }: { data: PageData } = $props();
</script>

<PageWrapper>
	<CreateQuizForm {data} />
</PageWrapper>
