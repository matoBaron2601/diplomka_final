<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { onMount } from 'svelte';

	const createUser = async () => {
		const res = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: 'gl5sk0rrfags4rtnw70awup',
				a: 'Martin',
				email: 'tes1@tet.com',
				profilePicture: 'test'
			})
		});
		if (res.ok) {
			return await res.json();
		}

		return null;
	};

	const updateUser = async () => {
		const res = await fetch('/api/user/gl5sk0rrfags4rtnw70awup2', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nassfdfsdgfdsgme: 'Martin Updated'
			})
		});
	};

	onMount(async () => {
		const get = await fetch('/api/user/gl5sk0rrfags4rtnw70awup');
	});
</script>

<PageWrapper>Children</PageWrapper>
