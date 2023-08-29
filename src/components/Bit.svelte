<script lang="ts">
    import clsx from "clsx";
	import { onMount } from "svelte";
    import { selectedDay, getDayTag, EE} from "../lib/dayStore";
    export const prerender = true;

    enum DayState{
        Passed, Current, Future
    }

    enum ViewState{
        Passed, PassedHover, Future, FutureHover
    }

    export let dayState: DayState;
    export let day: Date;

    let tag = "";
    let viewState: ViewState;

    onMount(() => {
        if(dayState == DayState.Future){
            viewState = ViewState.Future;
        }
        else if(dayState == DayState.Passed){
            viewState = ViewState.Passed;
        }

        tag = getDayTag(day);
        if(!tag){
            tag = "";
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
        //set my day as selected
        selectedDay.select(day);

        const onTagChage = (newTag: {date: Date, tag: string}) => {
            console.log("on tag change on " + newTag.date.getTime() + " my time:" + day.getTime() + " tag:" + newTag.tag);
            if(newTag.date.getTime() === day.getTime()){
                tag = newTag.tag;
            }
        }

        EE.on("dayChange:tag", onTagChage);

        const unsubscribeDay = selectedDay.subscribe((value) => {
            if(value.getTime() !== day.getTime()){
                console.log("unsubscribing");
                unsubscribeDay();
                EE.off("dayChange:tag", onTagChage);
            }
        })
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
        'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center align-middle',
        getDayColor(),
        viewState === ViewState.Passed && 'h-5/6 w-5/6 text-lg',
        viewState === ViewState.PassedHover && 'h-4/6 w-4/6 text-base',
        viewState === ViewState.Future &&'h-5/6 w-5/6 text-lg',
        viewState === ViewState.FutureHover && 'h-5/6 w-5/6 text-lg',
      )}>
        {tag}
    </div>
</div>
