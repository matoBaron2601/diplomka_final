<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { onMount } from 'svelte';

	const fetchUser = async () => {
		const res = await fetch('/api/user/gl5sk0rrfags4rtnw70awup2');
		if (res.ok) {
			return await res.json();
		}
		return null;
	};

	onMount(async () => {
		const user = await fetchUser();
		console.log(user);
	});
</script>

<PageWrapper>Children</PageWrapper>
