<script lang="ts">
    import clsx from "clsx";
	import { onMount } from "svelte";

    enum DayState{
        Passed, Current, Future
    }

    enum ViewState{
        Passed, PassedHover, Future, FutureHover
    }

    export let dayState: DayState;
    export let day: Date;

    let viewState = ViewState.Future;

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
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id = "{dayState === DayState.Current?"today":""}" class="w-8 h-8 relative" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
    <div class={clsx(
        'day-common',
        viewState === ViewState.Passed && 'h-5/6 w-5/6 bg-zinc-700',
        viewState === ViewState.PassedHover && 'h-4/6 w-4/6 bg-zinc-700',
        viewState === ViewState.Future &&'h-5/6 w-5/6 bg-red-300 border-zinc-700 border-2',
        viewState === ViewState.FutureHover && 'h-5/6 w-5/6 border-zinc-700 border-4',
      )}></div>
</div>

<style>
    #today {
    }
</style>
