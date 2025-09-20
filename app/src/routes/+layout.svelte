<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	let { children } = $props();
	export const queryClient = new QueryClient();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Sidebar.Provider>
		<AppSidebar />
		<main class="w-full">
			<div
				class="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-gray-200 bg-white p-4 shadow-sm"
			>
				<Sidebar.Trigger />
				<div>Breadcrumb / Default</div>
			</div>

			<div class="h-[calc(100%-3.5rem)] w-full p-4">
				{@render children?.()}
			</div>
		</main>
	</Sidebar.Provider>
</QueryClientProvider>
