<script lang="ts">
	import DotsIcon from '../assets/DotsIcon.svelte';

	export let label = '';
	export let className = '';

	function dragStart(event: DragEvent) {
		if (!event.dataTransfer) return;

		const data = { label: label, class: className };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
</script>

<div
	draggable="true"
	on:dragstart={(event) => dragStart(event)}
	class={`bg-gray-100 px-1 py-2 border border-zinc-300 text-gray-400 hover:bg-gray-200 cursor-grab flex items-center justify-between rounded-sm ${className}`}
>
	<div class="flex overflow-hidden">
		<div class="w-4">
			<DotsIcon />
		</div>
		<p class="text-xs text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
			{label}
		</p>
	</div>
	<slot />
</div>
