<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import {
		House,
		FolderCog,
		Columns3CogIcon,
		PlusIcon,
		LucideHistory,
		PersonStandingIcon
	} from '@lucide/svelte';

	const items = [
		{
			title: 'Home',
			url: '/',
			icon: House
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
			title: 'My quizzes',
			url: '/quiz/list/created',
			icon: PersonStandingIcon
		},
		{
			title: 'Quiz history',
			url: '/quiz/list/attended',
			icon: LucideHistory
		},
		{
			title: 'Create quiz',
			url: '/quiz/create',
			icon: PlusIcon
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
