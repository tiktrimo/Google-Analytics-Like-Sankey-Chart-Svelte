<script lang="ts">
	import CrossIcon from '../assets/CrossIcon.svelte';
import cx from '../utilities/cx';
	import Draggable from './Draggable.svelte';

	export let title = '';
	export let label = '';
	
	let payload: any = { label : '', class: '' };
	let isSelected = false;
	let isDragHover = false;
	function handleEnter(event: DragEvent) {
		isDragHover = true;
	}
	function handleLeave(event: DragEvent) {
		isDragHover = false;
	}
	function handleDrop(event: DragEvent) {
		if (!event.dataTransfer) return;

		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);
		isDragHover = false;

		isSelected = true;
		payload = data;
	}
</script>

<div class="w-full p-4 flex justify-center flex-col gap-2">
	<p class="text-xs tracking-tight font-medium text-gray-500">{title}</p>

	{#if isSelected}
		<Draggable label={payload.label} className={payload.class}>
			<button class="w-4" on:click={() => isSelected = false}> 
					<CrossIcon />
			</button>
		</Draggable>
	{:else}
		<div
			on:dragover={(event) => event.preventDefault()}
			on:dragleave={handleLeave}
			on:dragenter={handleEnter}
			on:drop={handleDrop}
			class={cx(
				'w-full border border-dashed border-gray-400 rounded-sm flex items-center justify-center text-xs text-gray-500 text-center p-2',
				isDragHover ? 'bg-zinc-200' : 'bg-white'
			)}
		>
			{label}
		</div>
	{/if}
</div>
