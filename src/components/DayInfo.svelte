<script lang="ts">
	import { onMount } from 'svelte';
    import { Card, Input } from 'flowbite-svelte';
    import { selectedDay, setDayTag, getDayTag, EE } from "../lib/dayStore";
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import '../app.postcss';

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;

        console.log("DayInfo mounted in: " + (afterMount - beforeMount));

        EE.on("selectedDayChanged", () => tagInput = getDayTag($selectedDay));
    });

    function onTagChange(e: any) {
        console.log(e.target.value)
        setDayTag($selectedDay, e.target.value);
    }

    let tagInput = "";

</script>

<div class="h-[90vh] w-full right-0 mx-5 max-w-2xl" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
    <Card class="h-full w-full max-w-full">
        <div class="flex flex-row justify-center content-center">
            <Input on:change={onTagChange} bind:value={tagInput} class="w-12 h-12 text-center text-lg mx-4" type="text" placeholder="-" />
            <div class="text-2xl">
                {$selectedDay.toLocaleDateString("en-US", { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </div>
    </Card>
</div>




