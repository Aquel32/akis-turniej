<script>
    import {X} from '@lucide/svelte'

    let { enabled,close,submit } = $props();

    let playerName = $state("");
    let country = $state("");
    let age = $state(0);

    function end()
    {
        const date = new Date();
        const registrationDate = `${String(date.getDate()).padStart(2,"0")}.${String(date.getMonth() + 1).padStart(2,"0")}.${date.getFullYear()} ${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}`;
        submit(playerName,country,age,registrationDate)
    }
</script>

{#if enabled}
<div class="flex justify-center items-center absolute w-full h-full top-0 left-0  backdrop-blur-xs">
    <div class="flex flex-col gap-2 items-center bg-red-100">
        <div class="bg-red-200 w-full text-center p-3 flex justify-between">
            <h1 class="">Add/Edit player</h1>
            <button onclick={close}><X /></button>
        </div>
            <div class="flex flex-col p-5">
                <label class="flex justify-between items-center">Name<input class="p-2 mx-2" type="text" placeholder="Jan Kowalski" bind:value={playerName}></label>
                <label class="flex justify-between items-center">Country<input class="p-2 mx-2" type="text" placeholder="Poland" bind:value={country}></label>
                <label class="flex justify-between items-center">Age<input class="p-2 mx-2" type="number" placeholder="18" bind:value={age}></label>
            </div>
            <button onclick={end} class="bg-gray-300 px-10 py-2 mb-5">Submit</button>
    </div>
</div>
{/if}