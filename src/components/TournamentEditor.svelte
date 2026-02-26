<script lang="ts">
	import type { User } from "$lib/types";
	import { X } from "@lucide/svelte";

    let { enabled, players, selectedTournament, close, submit } = $props();
    
    let name = $state("");
    let participants = $state<User[]>([]);

    function end()
    {
        submit(participants, name);
    }

    function toggleParticipant(player:User)
    {
        if(participants.includes(player))
        {
            participants = participants.filter(p => p !== player);
        }
        else
        {
            participants = [...participants, player];
        }
    }

</script>

{#if enabled}
<div class="flex justify-center items-center absolute w-full h-full top-0 left-0  backdrop-blur-xs">
    <div class="flex flex-col gap-2 items-center bg-red-100">
        <div class="bg-red-200 w-full text-center p-3 flex justify-between">
            <h1 class="">Add/Edit tournament</h1>
            <button onclick={close}><X /></button>
        </div>
            <div class="flex flex-col p-5">
                <label class="flex justify-between items-center">Name<input class="p-2 mx-2" type="text" placeholder="New tournament" bind:value={name}></label>
            
                {#each players as player}
                    <label class="flex justify-between items-center">{player.name}<input class="p-2 mx-2" type="checkbox" onclick={()=>toggleParticipant(player)}></label>
                {/each}
            </div>
            <button onclick={end} class="bg-gray-300 px-10 py-2 mb-5">Submit</button>
    </div>
</div>
{/if}