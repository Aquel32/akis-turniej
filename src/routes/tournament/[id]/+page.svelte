<script lang="ts">
    import Brackets from "../../../components/Brackets.svelte";
let { data } = $props();
</script>

<main class="flex flex-col items-center justify-center gap-4">
    {#if data.tournamentData}
        <Brackets tournamentData={data.tournamentData} />
    {/if}
</main>