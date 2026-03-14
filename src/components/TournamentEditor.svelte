<script lang="ts">
	import type { User } from "$lib/typeormEntities";
	import { X } from "@lucide/svelte";

    let { enabled, players, selectedTournament, close, submit } = $props();
    
    let name = $state("");
    let participants = $state<User[]>([]);
    let selectedSort = $state('rating');
    let submitting = $state(false);

    $effect(() => {
        if (enabled) {
            return;
        }

        name = "";
        participants = [];
        selectedSort = 'rating';
        submitting = false;
    });

    async function end()
    {
        if (submitting) {
            return;
        }

        submitting = true;
        try {
            await submit(participants, name, selectedSort);
        } finally {
            submitting = false;
        }
    }

    function toggleParticipant(player:User)
    {
        if(participants.some((participant) => participant.id === player.id))
        {
            participants = participants.filter((participant) => participant.id !== player.id);
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
                    <label class="flex justify-between items-center">{player.name}<input class="p-2 mx-2" type="checkbox" checked={participants.some((participant) => participant.id === player.id)} onclick={()=>toggleParticipant(player)}></label>
                {/each}
            </div>

            <label class="flex justify-between items-center">
                Sort participants
                <select class="p-2 mx-2 border-0" bind:value={selectedSort}>
                    <option value="name">by name</option>
                    <option value="age">by age</option>
                    <option value="rating">by rating</option>
                </select>
            </label>

            <button onclick={end} class="bg-gray-300 px-10 py-2 mb-5" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
    </div>
</div>
{/if}