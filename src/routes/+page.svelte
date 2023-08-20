<script lang="ts">
	import { onMount } from 'svelte';
    import Bit from './bit.svelte'
    import { Card, Button } from 'flowbite-svelte';

    // let startDate = new Date(new Date().getFullYear(), 0, 1);
    // let endDate = new Date(new Date().getFullYear(), 11, 31);
    let startDate = new Date(2019, 1, 21);
    let endDate = new Date(2029, 1, 21);
    
    let daysTotal = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);

    onMount(() => {
        const anchor = document.getElementById("today");
        console.log(anchor);
        anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

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

<div class="flex align-center justify-center">
    <aside class="h-[90vh] w-1/5 left-0 mx-5">
        <Card class="text-center h-full" size="lg"></Card>
    </aside>
    <div class="flex flex-col">
        <div class="grid grid-cols-25 max-h-[90vh] no-scrollbar overflow-y-auto">
            {#each Array(daysTotal) as _, index (index)}
                <Bit dayState={getDayState(startDate, index)} day={addDays(startDate, index)}/> 
            {/each}
        </div>
    </div>
    <aside class="h-[90vh] w-1/5 right-0 mx-5">
        <Card class="text-center h-full w-full " size="lg"></Card>
    </aside>
</div>

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>

