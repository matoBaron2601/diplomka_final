<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	let { children } = $props();

	const queryClient = new QueryClient();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Sidebar.Provider>
		<AppSidebar />
		<main class="w-full">
			{@render children?.()}
		</main>
	</Sidebar.Provider>
</QueryClientProvider>
