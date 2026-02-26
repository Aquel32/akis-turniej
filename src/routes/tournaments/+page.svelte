<script lang="ts">
	import type { User } from '$lib/types.js';
	import Modal from '../../components/Modal.svelte';
    import PlayerEditor from '../../components/PlayerEditor.svelte';
     import { Trash, Pencil,CirclePlus, Play } from '@lucide/svelte';
	import TournamentEditor from '../../components/TournamentEditor.svelte';

    let { data } = $props();
    let tournaments = $derived(data.tournaments);

    let selectedTournament = $state<any | null>(null);

    let editor = $state({
        enabled:false
    })

        let deleteModal = $state({
            enabled:false
        })
    
    function addTournament(participants:User[], name:string)
    {
        selectedTournament = null;
        editor.enabled = false;

        fetch("/api/addTournament",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                seeding: participants,
                name: name
            })
        }).then(() => {
            location.reload();
        })
    }

    function playTournament(tournament:any)
    {
        console.log("playing")
    }

    function deleteTournament()
    {
        deleteModal.enabled = false;
        if(selectedTournament != null)
        {
            fetch('/api/deleteTournament', {
                method: 'POST',
                body: JSON.stringify({ name:selectedTournament.name }),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(() => {
                location.reload();
            });
            selectedTournament = null;
        }
    }

</script>

<main class="flex flex-col gap-10 justify-center items-center">
    <div class="flex justify-between gap-30">
        <h1>List of tournaments</h1>
        <button onclick={()=>editor.enabled = true}><CirclePlus /></button>
    </div>
    <ul class="overflow-auto max-h-[80vh] gap-5 flex flex-col">
        {#each tournaments as tournament}
			<li class="">
                <div class="flex justify-between bg-red-200 p-5">
                    <h1 class="">{tournament.name}</h1>
                    <div class="flex gap-5">
                        <button onclick={()=>{deleteModal.enabled = true; selectedTournament = tournament}}><Trash/></button>
                    </div>
                </div>
                <div class="flex">
                    <div class="p-2 bg-red-100 flex flex-col gap-2 items-center">
                        <button class="px-10 py-2 bg-green-300" onclick={()=>playTournament(tournament)}><Play/></button>
                    </div>
                </div>
			</li>
		{/each}
    </ul>    
</main>

<TournamentEditor enabled={editor.enabled} players={data.players} selectedTournament={selectedTournament} close={() => editor.enabled = false} submit={addTournament} />
<Modal enabled={deleteModal.enabled} title="Delete tournament" description="Are you sure you want to delete this tournament?" submit={deleteTournament} cancel={() => { deleteModal.enabled = false; selectedTournament = undefined; }}/>