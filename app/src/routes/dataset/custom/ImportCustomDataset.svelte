<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import PlusIcon from '@lucide/svelte/icons/plus';

	const triggerFileInput = () => {
		const fileInput = document.getElementById('fileInput');
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleFileUpload = async (event: Event) => {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			const selectedFile = fileInput.files[0];

			const formData = new FormData();
			formData.append('file', selectedFile);
			//TODO MUTATION HERE
		}
	};
</script>

<div class="flex h-screen w-full justify-center p-4 pt-[15%]">
	<Card.Root class="h-[400px] w-[400px]">
		<Card.Content class="flex h-full flex-col items-center justify-center">
			<p class="mb-4">You have not imported any custom dataset yet.</p>
			<Button
				onclick={triggerFileInput}
				variant="secondary"
				size="icon"
				class="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:bg-gray-400"
			>
				<PlusIcon size={60} />
			</Button>
			<input id="fileInput" type="file" accept=".txt" class="hidden" on:change={handleFileUpload} />
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
