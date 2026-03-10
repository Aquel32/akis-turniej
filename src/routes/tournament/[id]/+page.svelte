<script lang="ts">
	import { onMount } from "svelte";
    import Brackets from "../../../components/Brackets.svelte";
let { data } = $props();

let winnerName = $state("");

onMount(() => {
    if(data.currentStage !== null)
    {
        return;
    }

    console.log(data)
    const match = data.tournamentData.match[data.tournamentData.match.length - 1];
    if(match.opponent1?.result === "win")
    {
        winnerName = data.tournamentData.participant.find((p:any) => p.id === match.opponent1!.id)?.name ?? "";
    }
    else if(match.opponent2?.result === "win")
    {
        winnerName = data.tournamentData.participant.find((p:any) => p.id === match.opponent2!.id)?.name ?? "";
    }
})
</script>

<main class="flex flex-col items-center justify-center gap-4">
    {#if data.tournamentData}
        <Brackets tournamentData={data.tournamentData} />
    {/if}

    {#if winnerName !== ""}
        Winner: {winnerName}
    {/if}
</main>