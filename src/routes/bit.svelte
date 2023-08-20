<script lang="ts">
    import clsx from "clsx";
	import { onMount } from "svelte";
    import { selectedDay } from "$lib/dayStore";

    enum DayState{
        Passed, Current, Future
    }

    enum ViewState{
        Passed, PassedHover, Future, FutureHover
    }

    export let dayState: DayState;
    export let day: Date;
    export let text: string = "";

    let viewState: ViewState;

    onMount(() => {
        if(dayState == DayState.Future){
            viewState = ViewState.Future;
        }
        else if(dayState == DayState.Passed){
            viewState = ViewState.Passed;
        }
    });

    function onMouseEnter() {
        if(dayState == DayState.Future){
            viewState = ViewState.FutureHover;
        }
        else if(dayState == DayState.Passed){
            viewState = ViewState.PassedHover;
        }
    }

    function onMouseLeave() {
        if(dayState == DayState.Future){
            viewState = ViewState.Future;
        }
        else if(dayState == DayState.Passed){
            viewState = ViewState.Passed;
        }
    }

    function onClick() {
        selectedDay.select(day);
    }

    function getDayColor() {
        const yearMod = day.getFullYear() % 10;
        return clsx(
            yearMod == 0 && 'bg-red-300',
            yearMod == 1 && 'bg-orange-300',
            yearMod == 2 && 'bg-fuchsia-300',
            yearMod == 3 && 'bg-green-300',
            yearMod == 4 && 'bg-pink-300',
            yearMod == 5 && 'bg-blue-300',
            yearMod == 6 && 'bg-rose-300',
            yearMod == 7 && 'bg-purple-300',
            yearMod == 8 && 'bg-teal-300',
            yearMod == 9 && 'bg-gray-300',
        )
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id = "{dayState === DayState.Current?"today":""}" class="w-8 h-8 relative" 
    on:mouseenter={onMouseEnter} 
    on:mouseleave={onMouseLeave}
    on:click={onClick}
    >
    <div class={clsx(
        'day-common',
        getDayColor(),
        viewState === ViewState.Passed && 'h-5/6 w-5/6',
        viewState === ViewState.PassedHover && 'h-4/6 w-4/6',
        viewState === ViewState.Future &&'h-5/6 w-5/6 ',
        viewState === ViewState.FutureHover && 'h-5/6 w-5/6  ',
      )}>
        {text}
    </div>
</div>
