<script lang="ts">
	import PlayerEditor from '../../components/PlayerEditor.svelte';
	import type { PageProps } from './$types';
     import { Trash, Pencil,CirclePlus } from '@lucide/svelte';

	let { data } = $props();

    let players = $state([...data.players]);

    let editor = $state({
        enabled:false
    })

    function addPlayer(name:string,country:string,age:number,registrationDate:string)
    {
        console.log(name,country,age,registrationDate);
        players.push({name,age,country,registrationDate});
        editor.enabled = false;
    }
</script>

<main class="flex flex-col gap-10 justify-center items-center">
    <div class="flex justify-between gap-30">
        <h1>List of registered players</h1>
        <button onclick={()=>editor.enabled = true}><CirclePlus /></button>
    </div>
    <ul>
        {#each players as player}
			<li class="">
                <div class="flex justify-between bg-red-200 p-5">
                    <h1 class="">{player.name}</h1>
                    <div class="flex gap-5">
                        <button><Trash/></button>
                        <button><Pencil /></button>
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

<PlayerEditor enabled={editor.enabled} close={()=>editor.enabled = false} submit={addPlayer}/>