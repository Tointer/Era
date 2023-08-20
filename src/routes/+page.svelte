<script lang="ts">
	import { onMount } from 'svelte';
    import DayTable from './dayTable.svelte'
    import { Card } from 'flowbite-svelte';
    import { selectedDay } from "$lib/dayStore";

    console.log("before mount " + Date.now()/1000)
    onMount(() => {
        console.log("on mount "  + Date.now()/1000)
    });

</script>

<div class="flex align-center justify-center">
    <aside class="h-[90vh] w-1/5 left-0 mx-5">
        <Card class="text-center h-full" size="lg"></Card>
    </aside>
    <DayTable/>
    <aside class="h-[90vh] w-1/5 right-0 mx-5">
        <Card class="text-center h-full w-full " size="lg">
            {$selectedDay.toLocaleDateString("en-US", { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' })}
        </Card>
    </aside>
</div>


