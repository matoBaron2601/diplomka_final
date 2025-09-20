<script lang="ts">
	const fetchData = async () => {
		const response = await fetch('/api');
		const data = await response.json();
		return data;
	};
</script>

<div>
	<button on:click={fetchData}>Fetch Data</button>
</div>
