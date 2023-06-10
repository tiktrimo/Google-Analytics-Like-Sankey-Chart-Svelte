<script lang="ts">
    import CavetUnderSmall from '../assets/CavetUnderSmall.svelte';
	import DotsIcon from '../assets/DotsIcon.svelte';
	import InformationCircleIcon from '../assets/InformationCircleIcon.svelte';
	import PlusIcon from '../assets/PlusIcon.svelte';
	import Draggable from '../components/Draggable.svelte';
	import Droppable from '../components/Droppable.svelte';
	import Sankey from '../components/Sankey.svelte';

</script>

<div class="w-full h-screen flex font-roboto select-none">
	<div data-FirstColumn class="w-56 h-full border">
		<p class="font-semibold text-sm text-white bg-zinc-600 p-2">Variables</p>

		<div class="w-full h-16 p-4 flex justify-center flex-col">
			<p class="text-sm tracking-tighter text-gray-600">Exploration Name:</p>
			<p class="text-sm tracking-tight">Path exploration</p>
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full h-16 p-4 flex justify-center flex-col">
			<p
				class="tracking-tighter text-xs bg-gray-100 text-gray-500 font-semibold w-max rounded-sm px-1"
			>
				Custom
			</p>
			<div class="text-gray-500 text-sm px-1 cursor-pointer tracking-tighter">
				Apr 3 - Apr 17, 2023
			</div>
		</div>

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

        <Droppable  title='SEGMENT' label='Drop or select segment' />

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

        <Droppable  title='BREAKDOWN' label='Drop or select segment' />

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

		<Droppable  title='FILTERS' label='Drop or select dimmension or metric' />

		<div data-Divider class="w-full h-px bg-gray-200" />

		<div class="w-full p-4 flex justify-center flex-col gap-2">
			<p class="text-xs tracking-tight font-medium text-gray-500">NODE FILTERS</p>

			<p class="w-full h-8 flex items-center justify-center text-xs text-gray-500">
				No node filter applied
			</p>
		</div>

		<div data-Divider class="w-full h-px bg-gray-200" />
	</div>

	<div class="flex-1 h-full bg-zinc-50 p-2 flex flex-col" >
        <div class="w-full h-12 -mb-px z-10">
            <div class="bg-white rounded-t-lg flex h-full w-max p-2 justify-between items-center border border-b-0 gap-2 text-gray-700">
                <div class="text-blue-500">
                    <InformationCircleIcon />
                </div>
                <p class="text-sm font-medium">
                    Path exploration
                </p>
                <div class="cursor-pointer">
                    <DotsIcon />
                </div>
            </div>
        </div>
        <div class="w-full flex-1 border rounded-lg rounded-tl-none bg-white flex flex-col p-4">
            <p class="w-full border-b pb-0 box-border text-gray-700 border-gray-400">
                Page View Event
            </p>

            <Sankey />
        </div>

    </div>
</div>
