<script lang="ts">

    export let title = '';
    export let label = '';
    
	function handleDrop(event: DragEvent) {
		if (!event.dataTransfer) return;

		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);
		console.log(data);
	}
</script>

<div class="w-full p-4 flex justify-center flex-col gap-2">
	<p class="text-xs tracking-tight font-medium text-gray-500">{title}</p>

	<div
		on:dragover={(e) => e.preventDefault()}
		on:drop={handleDrop}
		class="w-full border border-dashed border-gray-400 rounded-sm flex items-center justify-center text-xs text-gray-500 text-center p-2"
	>
		{label}
	</div>
</div>
