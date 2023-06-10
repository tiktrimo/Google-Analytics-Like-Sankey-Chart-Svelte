<script lang="ts">
	import SankeyLink from './SankeyLink.svelte';
	type Levels = {
		group: string;
		nodes: { name: string; value: number; acc: number; parent: number[]; show : boolean, ref?: HTMLElement }[];
	}[];

	const levels: Levels = [
		{
			group: 'Event name',
			nodes: [{ name: 'session_start', parent: [-1, -1], value: 28761, acc: 0, show : true }]
		},
		{
			group: 'Event name',
			nodes: [
				{ name: 'page_view', parent: [0, 0], value: 3758, acc: 0, show : false },
				{ name: '+16 More', parent: [0, 0], value: 24012, acc: 3758, show : false }
			]
		},
		{
			group: 'Event name',
			nodes: [
				{ name: 'view_promotion', parent: [1, 0], value: 1355, acc: 0, show : false },
				{ name: 'new_recent_active_user', parent: [1, 0], value: 559, acc: 1355, show : false },
				{ name: 'new_engaged_user', parent: [1, 0], value: 467, acc: 1914, show : false },
				{ name: 'scroll', parent: [1, 0], value: 246, acc: 2381, show : false },
				{ name: 'session_start', parent: [1, 0], value: 206, acc: 2587, show : false },
				{ name: 'view_cart', parent: [1, 0], value: 153, acc: 2740, show : false }
			]
		}
	];

    let render = 0;
    

	let containerRef: HTMLElement;
    $: containerHeight = containerRef?.getBoundingClientRect().height;
    function getHeight(value : number) {
        return Math.max(value / levels[0].nodes[0].value * containerHeight, 2)
    }
</script>

<div class="w-full h-full p-4">
	<div class="w-full h-full relative flex" bind:this={containerRef}>
		{#each levels as level, depth}
			<div class="w-48 h-full flex flex-col items-start justify-start gap-6">
				{#each level.nodes as node, index}
                    {#if node.show}
                        <button
                            bind:this={node.ref}
                            class="bg-blue-200 w-4 relative hover:bg-blue-300"
                            style="height: {getHeight(node.value)}px;"
                            on:click={() => {
                                if(depth >= levels.length - 1) return;
                                levels[depth + 1].nodes.forEach((node) => {
                                    if(node.parent[1] === index) node.show = true;
                                })

                                render++;
                            }}
                        >
                            <p class="text-xs absolute left-6 -top-1 text-gray-500 whitespace-nowrap">
                                {node.name}
                            </p>
                            <p class="text-xs absolute left-6 top-2 font-semibold whitespace-nowrap">
                                {node.value}
                            </p>
                        </button>
                    {/if}
				{/each}
			</div>
		{/each}

		{#each levels as level}
			{#each level.nodes as node}
				{#if node.parent[0] >= 0 && node.show}
					{@const parent = levels[node.parent[0]].nodes[node.parent[1]]}
					<SankeyLink
						{containerRef}
						fromRef={parent.ref}
						toRef={node.ref}
						fromVal={(node.acc / parent.value) * 100}
						toVal={((node.acc + node.value) / parent.value) * 100}
						straight={50}
					/>
				{/if}
			{/each}
		{/each}
	</div>
</div>
