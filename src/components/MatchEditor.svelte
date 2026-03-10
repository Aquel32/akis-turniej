<script>
    import {X} from '@lucide/svelte'

    let { enabled,close,submit,p1Name,p2Name } = $props();

    let player1Name = $state("");
    let player2Name = $state("");
    let player1Score = $state("");
    let player2Score = $state("");

    $effect(() => {
        player1Name = p1Name ?? "";
        player2Name = p2Name ?? "";
    });

    function end()
    {
        try {
            if(player1Score === "" || player2Score === "")
            {
                alert("Please enter scores for both players.");
                return;
            }
            if(parseInt(player1Score) < 0 || parseInt(player2Score) < 0)
            {
                alert("Scores cannot be negative.");
                return;
            }
            submit(parseInt(player1Score) || 0, parseInt(player2Score) || 0)
        } catch (e) {
            alert("Please enter valid numbers for scores.");
            return;
        }
    }
</script>

{#if enabled}
<div class="flex justify-center items-center absolute w-full h-full top-0 left-0  backdrop-blur-xs">
    <div class="flex flex-col gap-2 items-center bg-red-100">
        <div class="bg-red-200 w-full text-center p-3 flex justify-between">
            <h1 class="">Edit Match</h1>
            <button onclick={close}><X /></button>
        </div>
            <div class="flex flex-col p-5">
                <label class="flex justify-between items-center">{player1Name}<input class="p-2 mx-2" type="number" placeholder="0" min="0" bind:value={player1Score}></label>
                <label class="flex justify-between items-center">{player2Name}<input class="p-2 mx-2" type="number" placeholder="0" min="0" bind:value={player2Score}></label>
            </div>
            <button onclick={end} class="bg-gray-300 px-10 py-2 mb-5">Submit</button>
    </div>
</div>
{/if}