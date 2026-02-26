<script lang="ts">
    import Brackets from "../../../components/Brackets.svelte";
let { data } = $props();
</script>

<main>
    <h1>Tournament View</h1>
    {#if data.tournamentData}
        <Brackets tournamentData={data.tournamentData} />
    {/if}
</main>