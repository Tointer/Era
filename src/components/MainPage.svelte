<script lang="ts">
	import { onMount } from 'svelte';
    import DayTable from './DayTable.svelte'
    import DayInfo from './DayInfo.svelte'
    import { DarkMode } from 'flowbite-svelte';
    import '../app.postcss';

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;
        console.log("Main page mounted in: " + (afterMount - beforeMount));
    });

</script>

<div class="bg-white dark:bg-gray-900 w-full h-screen">
<DarkMode/>
<div class="flex align-center justify-center w-full">
    <!-- <div class="h-[90vh] w-full left-0 mx-5 max-w-2xl"">
        <Card class="text-center h-full w-full max-w-full" size="lg"></Card>
    </div> -->
    <DayTable/>
    <DayInfo/>
</div>
</div>




