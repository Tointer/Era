
<script lang="ts">
    import clsx from "clsx";
	import { onMount } from "svelte";
    import { DayState, ViewState } from "./types";
    import { inview } from 'svelte-5-inview';
    export const prerender = true;

    export let id: string;
    export let dayState: DayState;
    export let day: Date;
    export let tag: string;
    export let onDayClick: (day: Date) => void;

    let viewState: ViewState;
    let visible = false;

    onMount(() => {
        if(dayState == DayState.Future){
            viewState = ViewState.Future;
        }
        else if(dayState == DayState.Passed){
            viewState = ViewState.Passed;
        }
        else if (dayState == DayState.Current){
            viewState = ViewState.Current;
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
        onDayClick(day);
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
<div class="w-8 h-8 relative" use:inview={{rootMargin: '300px'}}
    on:inview_enter={() => {
        visible = true;
    }}
    on:inview_leave={() => {
        visible = false;
    }}
>
    {#if visible}
        <div id = {id} 
            class="w-8 h-8 relative" 
            on:mouseenter={onMouseEnter} 
            on:mouseleave={onMouseLeave}
            on:click={onClick}
            >
            <div class={clsx(
                'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center align-middle',
                getDayColor(),
                viewState === ViewState.Passed && 'h-5/6 w-5/6 text-lg opacity-60',
                viewState === ViewState.PassedHover && 'h-4/6 w-4/6 text-base opacity-60',
                viewState === ViewState.Future &&'h-5/6 w-5/6 text-lg',
                viewState === ViewState.FutureHover && 'h-4/6 w-4/6 text-lg',
                viewState === ViewState.Current && 'h-full w-full text-lg border-1 border-black',
            )}>
                {tag}
            </div>
        </div>
    {/if}

</div>