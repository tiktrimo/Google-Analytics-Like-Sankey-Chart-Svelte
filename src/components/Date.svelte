<script lang="ts">
	import { DatePicker } from 'date-picker-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    let type : string = "1 Days"
	let fromDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
	let toDate = new Date();
	let isOpen = false;

	function getLoacleString(date: Date) {
		return date.toLocaleString('default', { month: 'short', day: 'numeric' });
	}

	function setDate(days: number) {
		fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
		toDate = new Date();
        type = `${days} Days`
		dispatch('time', {
			from: fromDate,
			to: toDate
		});
	}

	$: dispatch('time', {
		from: fromDate,
		to: toDate
	});
</script>

<div class="w-full h-16 p-4 flex justify-center flex-col relative">
	<p class="tracking-tighter text-xs bg-gray-100 text-gray-500 font-semibold w-max rounded-sm px-1">
		{type}
	</p>
	<button
		class="text-gray-500 text-sm px-1 tracking-tighter text-left"
		on:click={() => {
			isOpen = !isOpen;
		}}>{getLoacleString(fromDate)} - {getLoacleString(toDate)}, 2023</button
	>
	{#if isOpen}
		<div class="z-10 bg-white absolute top-12 left-4 flex border border-gray-300 shadow-md">
			<div class=" flex flex-col gap-2 w-36 p-2 border-r border-r-gray-300 rounded-sm">
				<button
					class="w-full h-8 text-gray-600 text-sm font-semibold text-left"
					on:click={() => setDate(1)}
				>
					Yesterday
				</button>
				<button
					class="w-full h-8 text-gray-600 text-sm font-semibold text-left"
					on:click={() => setDate(7)}
				>
					Last 7 days
				</button>
				<button
					class="w-full h-8 text-gray-600 text-sm font-semibold text-left"
					on:click={() => setDate(28)}
				>
					Last 28 days
				</button>
				<button
					class="w-full h-8 text-gray-600 text-sm font-semibold text-left"
					on:click={() => setDate(90)}
				>
					Last 90 days
				</button>
			</div>
			<div class="overflow-hidden flex">
                <div class="overflow-hidden -m-1">
				<DatePicker bind:value={fromDate} on:select={() => type = 'Custom'} />
                </div>
                <div class="overflow-hidden -m-1">
				<DatePicker bind:value={toDate} on:select={() => type = 'Custom'}/>
                </div>
			</div>
		</div>
	{/if}
</div>
