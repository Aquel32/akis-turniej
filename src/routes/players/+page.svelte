<script lang="ts">
	import type { User } from '$lib/types.js';
	import Modal from '../../components/Modal.svelte';
    import PlayerEditor from '../../components/PlayerEditor.svelte';
     import { Trash, Pencil,CirclePlus } from '@lucide/svelte';

    let { data } = $props();
    let players = $derived(data.players);

    let editor = $state({
        enabled:false
    })
    let deleteModal = $state({
        enabled:false
    })

    let selectedPlayer = $state(undefined as User|undefined);

    async function addPlayer(name:string,country:string,age:number,registrationDate:string)
    {
        editor.enabled = false;
        console.log(name,country,age,registrationDate);

        if(selectedPlayer != undefined)
        {
            const response = await fetch('/api/editUser', {
                method: 'POST',
                body: JSON.stringify({ id:selectedPlayer.id, name, country, age, registrationDate:selectedPlayer.registrationDate }),
                headers: {
                    'content-type': 'application/json'
                }
		    });
            selectedPlayer = undefined;
            return;
        }

        const response = await fetch('/api/addUser', {
			method: 'POST',
			body: JSON.stringify({ name, country, age, registrationDate }),
			headers: {
				'content-type': 'application/json'
			}
		});
        selectedPlayer = undefined;
    }

    function deletePlayer()
    {
        deleteModal.enabled = false;
        if(selectedPlayer != undefined)
        {
            fetch('/api/deleteUser', {
                method: 'POST',
                body: JSON.stringify({ id:selectedPlayer.id }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            selectedPlayer = undefined;
        }
    }

    function closeEditor()
    {
        editor.enabled = false;
        selectedPlayer = undefined;
    }
</script>

<main class="flex flex-col gap-10 justify-center items-center">
    <div class="flex justify-between gap-30">
        <h1>List of registered players</h1>
        <button onclick={()=>editor.enabled = true}><CirclePlus /></button>
    </div>
    <ul class="overflow-auto max-h-[80vh] gap-5 flex flex-col">
        {#each players as player}
			<li class="">
                <div class="flex justify-between bg-red-200 p-5">
                    <h1 class="">{player.name}</h1>
                    <div class="flex gap-5">
                        <button onclick={()=>{deleteModal.enabled = true; selectedPlayer = player}}><Trash/></button>
                        <button onclick={()=>{editor.enabled = true; selectedPlayer = player}}><Pencil /></button>
                    </div>
                </div>
                <div class="flex">
                    <div class="p-2 bg-red-100 flex flex-col gap-2 items-center">
                        <h1 class="px-10 py-2 bg-gray-300">Age</h1>
                        <h1>{player.age}</h1>
                    </div>
                    <div class="p-2 bg-red-100 flex flex-col gap-2 items-center">
                        <h1 class="px-10 py-2 bg-gray-300">Country</h1>
                        <h1>{player.country}</h1>
                    </div>
                    <div class="p-2 bg-red-100 flex flex-col gap-2 items-center">
                        <h1 class="px-10 py-2 bg-gray-300">Registration Date</h1>
                        <h1>{player.registrationDate}</h1>
                    </div>
                </div>
			</li>
		{/each}
    </ul>    
</main>

<PlayerEditor enabled={editor.enabled} close={closeEditor} submit={addPlayer} player={selectedPlayer}/>
<Modal enabled={deleteModal.enabled} title="Delete player" description="Are you sure you want to delete this player?" submit={deletePlayer} cancel={() => { deleteModal.enabled = false; selectedPlayer = undefined; }}/>