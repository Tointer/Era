<script lang="ts">
    import { storage } from "../storage";
    import '../app.postcss';
    import MainPage from "./MainPage.svelte";

    export let count: number;
    let successMessage: string | null = null;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }

    function save() {
        storage.set({ count }).then(() => {
            successMessage = "Options saved!";

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }

    enum DayState{
        Passed, Current, Future
    }
</script>

<div class="container">
    <p>Current count: <b>{count}</b></p>
    <div class="bg-red-300" >
        <button on:click={decrement}>-</button>
        <button on:click={increment}>+</button>
        <button on:click={save}>Save</button>
        {#if successMessage}<span class="success">{successMessage}</span>{/if}
    </div>
    <div class="h-16 w-16 border-pink-300 border-4"></div>
    <MainPage />

</div>

<style>
    .container {
        min-width: 250px;
    }

    button {
        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        background-color: #2ecc71;
        color: #ecf0f1;
        transition: background-color 0.3s;
        padding: 5px 10px;
        border: none;
    }

    button:hover,
    button:focus {
        background-color: #27ae60;
    }

    .success {
        color: #2ecc71;
        font-weight: bold;
    }
</style>
