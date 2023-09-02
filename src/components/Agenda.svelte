<script lang="ts">
	import { onMount } from 'svelte';
    import { Card, Input } from 'flowbite-svelte';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import '../app.postcss';

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;

        console.log("Agenda mounted in: " + (afterMount - beforeMount));
    });
</script>

<div 
    class="h-[90vh] w-full right-0 mx-5 max-w-2xl" 
    transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
>
    <Card class="h-full w-full max-w-full">
        <div class="flex flex-row justify-center content-center">
        </div>
    </Card>
</div>




