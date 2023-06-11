<script lang="ts">
	import CavetUnderSmall from '../assets/CavetUnderSmall.svelte';
	import DotsIcon from '../assets/DotsIcon.svelte';
	import InformationCircleIcon from '../assets/InformationCircleIcon.svelte';
	import PlusIcon from '../assets/PlusIcon.svelte';
	import Date from '../components/Date.svelte';
	import Draggable from '../components/Draggable.svelte';
	import Droppable from '../components/Droppable.svelte';
	import Sankey from '../components/Sankey.svelte';

	let range: { from: Date; to: Date };

	import data from './data.json';

	type Report = {
		c: string;
		n: string;
		u: string;
		r: string | null;
		d: string;
		t: number;
		p?: { x?: number; y?: number };
	};

	const clientGrouped = data.reduce<{ [key: string]: Report[] }>((acc, e) => {
		if (!acc[e.c]) acc[e.c] = [];
		acc[e.c].push(e);
		return acc;
	}, {});
	const clients = Object.keys(clientGrouped);

	const sorted: Report[][] = clients.map((client) => {
		return clientGrouped[client].sort((a: Report, b: Report) => a.t - b.t);
	});

	let maxLevel = 0;
	const splited = sorted.reduce<Report[][][]>((acc, e) => {
		const grouped: Report[][] = [];
		e.forEach((report: Report) => {
			if (report.n === 'pageview') grouped.push([]);
			grouped[grouped.length - 1].push(report);
		});
		grouped.forEach((group) => {
			if (group.length > maxLevel) maxLevel = group.length;
		});
		acc.push(grouped);
		return acc;
	}, []);

	const levels = splited.reduce<{[key : string] : number}[]>(
		(acc, clientSpecificNodes) => {
			clientSpecificNodes.forEach((nodes) => {
				nodes.forEach((node, index) => {
					if (!acc[index][node.n]) acc[index][node.n] = 0;
					acc[index][node.n]++;
				});
			});

			return acc;
		},
		new Array(maxLevel).fill(false).map(() => ({}))
	);

	console.log(splited)

	// levels.map((level) => {
	// 	const events = Object.keys(level);
	// 	const nodes = events.map((event) => {
	// 		return {
	// 			name : event,
	// 		}
	// 	})
	// })
</script>

<div class="w-full h-screen flex font-roboto select-none">
	<div data-FirstColumn class="w-56 h-full border">
		<p class="font-semibold text-sm text-white bg-zinc-600 p-2">Variables</p>

		<div class="w-full h-16 p-4 flex justify-center flex-col">
			<p class="text-sm tracking-tighter text-gray-600">Exploration Name:</p>
			<p class="text-sm tracking-tight">Path exploration</p>
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<Date on:time={(e) => (range = e.detail)} />

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<div class="w-full flex items-center justify-between">
				<p class="text-xs tracking-tight font-medium text-gray-500">SEGMENTS</p>
				<div class="text-gray-500 cursor-pointer">
					<PlusIcon />
				</div>
			</div>

			<Draggable label="US" />
			<Draggable label="Direct traffic" />
			<Draggable label="Paid traffic" />
			<Draggable label="Mobile traffic" />
			<Draggable label="Table traffic" />
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<div class="w-full flex items-center justify-between">
				<p class="text-xs tracking-tight font-medium text-gray-500">DIMENSIONS</p>
				<div class="text-gray-500 cursor-pointer">
					<PlusIcon />
				</div>
			</div>

			<Draggable label="Event name" className="border-l-4 border-l-green-600" />
			<Draggable label="Gender" className="border-l-4 border-l-green-600" />
			<Draggable label="Country" className="border-l-4 border-l-green-600" />
			<Draggable label="Device category" className="border-l-4 border-l-green-600" />
			<Draggable label="First user medium" className="border-l-4 border-l-green-600" />
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<div class="w-full flex items-center justify-between">
				<p class="text-xs tracking-tight font-medium text-gray-500">METRIC</p>
				<div class="text-gray-500 cursor-pointer">
					<PlusIcon />
				</div>
			</div>

			<Draggable label="Active users" className="border-l-4 border-l-blue-400" />
			<Draggable label="Event count" className="border-l-4 border-l-blue-400" />
			<Draggable label="Total users" className="border-l-4 border-l-blue-400" />
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />
	</div>

	<div data-SecondColumn class="w-56 h-full border border-l-0">
		<p class="font-semibold text-sm text-white bg-zinc-600 p-2">Tab Settings</p>

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<p
				class="text-xs tracking-tight font-medium text-gray-500 underline decoration-dashed underline-offset-4"
			>
				TECHNIQUE
			</p>

			<div
				class="w-full h-10 border rounded-sm flex items-center text-xs text-gray-500 p-2 justify-between cursor-pointer"
			>
				Path exploration
				<CavetUnderSmall />
			</div>
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<Droppable title="SEGMENT" label="Drop or select segment" />

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<div class="w-full flex items-center justify-between">
				<p class="text-xs tracking-tight font-medium text-gray-500">NODE TYPE</p>
				<div class="text-gray-500 cursor-pointer">
					<PlusIcon />
				</div>
			</div>

			<Draggable label="Event name" className="border-l-4 border-l-gray-400" />
			<Draggable label="Page title and screen setting" className="border-l-4 border-l-gray-400" />
			<Draggable
				label="Page title and screen settings with user preferrence"
				className="border-l-4 border-l-gray-400"
			/>
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<Droppable title="BREAKDOWN" label="Drop or select segment" />

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<div class="w-full flex items-center justify-between">
				<p class="text-xs tracking-tight font-medium text-gray-500">VALUES</p>
				<div class="text-gray-500 cursor-pointer">
					<PlusIcon />
				</div>
			</div>

			<Draggable label="Event count" className="border-l-4 border-l-blue-300" />
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<Droppable title="FILTERS" label="Drop or select dimmension or metric" />

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<p class="text-xs tracking-tight font-medium text-gray-500">NODE FILTERS</p>

			<p class="w-full h-8 flex items-center justify-center text-xs text-gray-500">
				No node filter applied
			</p>
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />
	</div>

	<div class="flex-1 h-full bg-zinc-50 p-2 flex flex-col">
		<div class="w-full h-12 -mb-px z-10">
			<div
				class="bg-white rounded-t-lg flex h-full w-max p-2 justify-between items-center border border-b-0 gap-2 text-gray-700"
			>
				<div class="text-blue-500">
					<InformationCircleIcon />
				</div>
				<p class="text-sm font-medium">Path exploration</p>
				<div class="cursor-pointer">
					<DotsIcon />
				</div>
			</div>
		</div>
		<div class="w-full flex-1 border rounded-lg rounded-tl-none bg-white flex flex-col p-4">
			<p class="w-full border-b pb-0 box-border text-gray-700 border-gray-400">Page View Event</p>

			<Sankey />
		</div>
	</div>
</div>
