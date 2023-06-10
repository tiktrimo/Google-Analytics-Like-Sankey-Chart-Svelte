<script lang="ts">
	type Rect = {
		top: number;
		left: number;
		width: number;
		height: number;
	};
	const defaultRect = {
		top: 0,
		left: 0,
		width: 0,
		height: 0
	};
    
    export let containerRef: HTMLElement, fromRef: HTMLElement | undefined, toRef: HTMLElement | undefined;
    export let fromVal: number = 0
    export let toVal: number = 100;
    export let straight : number = 50;

	$: from = getRelativeClientRect(
		fromRef?.getBoundingClientRect(),
		containerRef?.getBoundingClientRect(),
        "FROM"
	);
	$: to = getRelativeClientRect(
		toRef?.getBoundingClientRect(),
		containerRef?.getBoundingClientRect(),
        "TO"
	);
    
    const MAGIC_NUMBER = 0.5 // You can delete this number. Sole purpose is to make thing more aligned = look better
	function getRelativeClientRect(element: Rect = defaultRect, container: Rect = defaultRect, position : string): Rect {
         if(position === "FROM")
            return {
                top: element.top - container.top + element.height * fromVal / 100 + MAGIC_NUMBER,
                left: element.left - container.left + element.width,
                width : element.width,
                height : element.height - MAGIC_NUMBER
            };
        if(position === "TO")
            return {
                top: element.top - container.top + MAGIC_NUMBER,
                left: element.left - container.left,
                width : element.width,
                height : element.height - MAGIC_NUMBER
            };
        else return defaultRect
	}
</script>


<svg class="w-full h-full absolute pointer-events-none">
    <path
        d={`M ${from.left} ${from.top} 
            C ${from.left + straight} ${from.top} ${to.left - straight} ${to.top} ${to.left} ${to.top}
            L ${to.left} ${to.top + to.height}
            C ${to.left - straight} ${to.top + to.height} ${from.left + straight} ${from.top + from.height * (toVal - fromVal) / 100} ${from.left} ${from.top + from.height * (toVal - fromVal) / 100}`}
        fill-opacity="0.1"
        fill="skyblue"
    />
</svg>

