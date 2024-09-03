<script lang="ts">
	import { onMount } from "svelte";
    import Bit from './Bit.svelte'
    import { DayState } from "./types";
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
	import type { MouseEventHandler } from "svelte/elements";
    export const prerender = true;

    let startDate = new Date(2020, 1, 1);
    let endDate = new Date(2030, 1, 1);
    let mounted = false;
    
    let daysTotal = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;
        console.log("Day table mounted in: " + (afterMount - beforeMount));

        mounted = true;
    });

    function scrollToToday(){
        const anchor = document.getElementById("today");
        anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function addDays(date: Date, days: number): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function getDayState(startDate: Date, offset: number): DayState{
        let day = addDays(startDate, offset);
        let currentDay = Math.floor(Date.now()/1000/60/60/24);
        let dayNumber = Math.floor(day.getTime()/1000/60/60/24);
        if(dayNumber < currentDay){
            return DayState.Passed;
        }
        else if(dayNumber == currentDay){
            return DayState.Current;
        }
        else{
            return DayState.Future;
        }
    }

</script>

{#if mounted}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
    class="w-full flex flex-wrap"
    transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
    on:introend={scrollToToday}>
        {#each Array(daysTotal) as _, index (index)}
            <Bit id={index.toString()} dayState={getDayState(startDate, index)} day={addDays(startDate, index)} tag={""} onDayClick={()=>{}}/> 
        {/each}
    </div>
{/if}

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>
