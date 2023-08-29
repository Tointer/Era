<script lang="ts">
	import { onMount } from 'svelte';
    import DayTable from './DayTable.svelte'
    import { Card, Input } from 'flowbite-svelte';
    import { selectedDay, setDayTag, getDayTag, EE } from "../lib/dayStore";
    import { DarkMode } from 'flowbite-svelte';
    import '../app.postcss';

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;

        console.log("Page mounted in: " + (afterMount - beforeMount));

        EE.on("selectedDayChanged", () => tagInput = getDayTag($selectedDay));
    });

    function onTagChange(e: any) {
        console.log(e.target.value)
        setDayTag($selectedDay, e.target.value);
    }

    let tagInput = "";

</script>

<div class="bg-white dark:bg-gray-900 w-full h-screen">
<DarkMode/>
<div class="flex align-center justify-center w-full">
    <!-- <div class="h-[90vh] w-full left-0 mx-5 max-w-2xl"">
        <Card class="text-center h-full w-full max-w-full" size="lg"></Card>
    </div> -->
    <DayTable/>
    <div class="h-[90vh] w-full right-0 mx-5 max-w-2xl">
        <Card class="text-center h-full w-full max-w-full">
            <div class="flex flex-row justify-between content-center">
                <Input on:change={onTagChange} bind:value={tagInput} class="w-16" type="text" placeholder="tag" />
                {$selectedDay.toLocaleDateString("en-US", { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </Card>
    </div>
</div>
</div>




