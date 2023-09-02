<script lang="ts">
	import { onMount } from 'svelte';
    import DayTable from './DayTable.svelte'
    import DayInfo from './DayInfo.svelte'
    import Agenda from './Agenda.svelte'
    import { Button, DarkMode } from 'flowbite-svelte';
    import '../app.postcss';

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;
        console.log("Main page mounted in: " + (afterMount - beforeMount));
    });

    let agendaToggled = true;
    let dayTableToggled = true;
    let dayInfoToggled = true;

    const pageContent = []

</script>

<div class="bg-white dark:bg-gray-900 w-full h-screen">
<DarkMode/>
<Button class="my-2" on:click={() => agendaToggled = !agendaToggled}>o--</Button>
<Button class="my-2" on:click={() => dayTableToggled = !dayTableToggled}>-o-</Button>
<Button class="my-2" on:click={() => dayInfoToggled = !dayInfoToggled}>--o</Button>
<Button class="my-2" on:click={() => {agendaToggled = false; dayInfoToggled = true; dayTableToggled = true;}}>xoo</Button>
<Button class="my-2" on:click={() => {agendaToggled = true; dayInfoToggled = false; dayTableToggled = true;}}>oox</Button>
<div class="flex align-center justify-center w-full">
    {#if agendaToggled}
        <Agenda/>
    {/if}
    {#if dayTableToggled}
        <DayTable/>
    {/if}
    {#if dayInfoToggled}
        <DayInfo/>
    {/if}
</div>
</div>




