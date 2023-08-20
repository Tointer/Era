<script lang="ts">
    import clsx from "clsx";
	import { onMount } from "svelte";
    import Bit from './bit.svelte'
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let startDate = new Date(2019, 1, 21);
    let endDate = new Date(2029, 1, 21);
    let mounted = false;
    
    let daysTotal = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);

    onMount(() => {
        console.log("DayTable mounted "  + Date.now()/1000);
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

    enum DayState{
        Passed, Current, Future
    }
</script>

{#if mounted}
    <div 
    class="grid grid-cols-25 max-h-[90vh] no-scrollbar overflow-y-auto"
    transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
    on:introend={scrollToToday}>
        {#each Array(daysTotal) as _, index (index)}
            <Bit dayState={getDayState(startDate, index)} day={addDays(startDate, index)}/> 
        {/each}
    </div>
{/if}

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>

