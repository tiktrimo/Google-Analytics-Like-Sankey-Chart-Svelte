<script lang="ts">
	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
	import backend from './data.json';

	let dateSelected: { from: string; to: string };
</script>

<div class="w-full h-screen flex">
	<div class="w-96 h-full border">
		<div class="shadow-xl rounded-xl p-10 w-full flex flex-col items-center justify-center">
			<p class="w-full flex items-center justify-center h-12 text-white bg-gray-800 mb-8">
				Datetime
			</p>
			<DatePicker selected={[]} range={true} on:range-selected={(e) => (dateSelected = e.detail)} />
		</div>
	</div>

	<div class="flex flex-1 h-full" />
</div>
