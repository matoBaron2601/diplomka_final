<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { HomeIcon, FolderCog, Columns3CogIcon, PlusIcon, LucideHistory } from '@lucide/svelte';

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '/',
			icon: HomeIcon
		},
		{
			title: 'Default Datasets',
			url: '/dataset/default',
			icon: FolderCog
		},
		{
			title: 'Custom Datasets',
			url: '/dataset/custom',
			icon: Columns3CogIcon
		},
		{
			title: 'Create quiz',
			url: '/quiz/create',
			icon: PlusIcon
		},
		{
			title: 'Quiz history',
			url: '/quiz/history',
			icon: LucideHistory
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>OnlyDevs Quizzes</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
