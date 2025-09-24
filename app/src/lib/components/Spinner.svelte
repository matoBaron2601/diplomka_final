<script>
	import { Loader2 } from '@lucide/svelte';

	let { spinning = true, classname } = $props();
</script>

<div class={`flex h-full w-full items-center justify-center ${spinning ? '' : 'hidden'} `}>
	<Loader2 class={`animate-spin text-gray-500 ${classname}`} />
</div>
