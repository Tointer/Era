<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
    import { get } from 'svelte/store';
    import DayTable from './dayTable.svelte'
    import { Card, Input } from 'flowbite-svelte';
    import { selectedDay, setDayTag, getDayTag, EE } from "$lib/dayStore";

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

<div class="flex align-center justify-center">
    <aside class="h-[90vh] w-1/5 left-0 mx-5">
        <Card class="text-center h-full" size="lg"></Card>
    </aside>
    <DayTable/>
    <aside class="h-[90vh] w-1/5 right-0 mx-5">
        <Card class="text-center h-full w-full " size="lg">
            <div class="flex flex-row justify-between content-center">
                <Input on:change={onTagChange} bind:value={tagInput} class="w-16" type="text" placeholder="tag" />
                {$selectedDay.toLocaleDateString("en-US", { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </Card>
    </aside>
</div>


