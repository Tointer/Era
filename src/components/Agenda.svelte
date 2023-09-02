<script lang="ts">
	import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { Card, Tabs, TabItem, Accordion, AccordionItem } from 'flowbite-svelte';
    import '../app.postcss';

    const beforeMount = Date.now()/1000;
    onMount(() => {
        const afterMount = Date.now()/1000;

        console.log("Agenda mounted in: " + (afterMount - beforeMount));
    });

    const tasks = [
        {
            id: 1,
            title: 'Do thing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...',
            daysLeft: 4,
        },
        {
            id: 2,
            title: 'Do small thing maybe',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...',
            daysLeft: 10,
        }
    ]
</script>

<div 
    class="h-[90vh] w-full right-0 mx-5 max-w-2xl" 
    transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
>
    <Card class="h-full w-full max-w-full">
        <Tabs>
            <TabItem open title="Dashboard">
                <Accordion flush>
                {#each tasks as task}
                    <AccordionItem>
                        <span class="text-lg" slot="header">{task.title}</span>
                        <div class="text-2xl" slot="arrowup">
                            {task.daysLeft}
                        </div>
                        <span class="text-2xl" slot="arrowdown">
                            {task.daysLeft}
                        </span>
                        <p class="mb-2 text-gray-500 dark:text-gray-400">{task.description}</p>
                    </AccordionItem>
                {/each}
                </Accordion>
            </TabItem>
            <TabItem title="Recurrent">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  <b>Settings:</b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </TabItem>
            <TabItem title="Tags">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  <b>Settings:</b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </TabItem>
            <TabItem title="Settings">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <b>Users:</b>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </TabItem>
          </Tabs>
    </Card>
</div>




