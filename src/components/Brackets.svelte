<script lang="ts">
    import 'brackets-viewer/dist/brackets-viewer.min.css';
    import type { MatchWithMetadata } from 'brackets-viewer';

    let { tournamentData } = $props();
    let selectedMatch= $state<MatchWithMetadata | null>(null)

    $effect(() => {
        console.log(tournamentData)
        if (typeof window !== 'undefined' && tournamentData) {
            loadAndRender();
        }
    });

    async function loadAndRender() {
        (window as any).bracketsViewer.render({
            stages: tournamentData.stage,
            matches: tournamentData.match,
            matchGames: tournamentData.match_game,
            participants: tournamentData.participant,
        }, {
            onMatchClick: (match: MatchWithMetadata) => {
                if(match.opponent1!.id === null || match.opponent2!.id === null) {
                    return;
                }
                if(match!.status == 4 || match!.status == 5)
                {
                    return;
                }
                selectedMatch = match;
            },
        });
    }

    function submit()
    {
        

        console.log(tournamentData)
        const op1Score = parseInt((document.querySelector('input#opponent1-score') as HTMLInputElement).value);
        const op2Score = parseInt((document.querySelector('input#opponent2-score') as HTMLInputElement).value);

        fetch("/api/updateTournament",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: selectedMatch!.id,
                opponent1: {score : op1Score, result: op1Score > op2Score ? 'win' : undefined},
                opponent2: {score : op2Score, result: op2Score > op1Score ? 'win' : undefined},
            })
        }).then(() => {
            location.reload();
        })
        selectedMatch = null;
    }
</script>

<div class="brackets-viewer"></div>

{#if selectedMatch}
    <div class="match-details">
        <h2>Match Details</h2>
        <br>
        <br>
        <p><strong>Opponent 1:</strong> {tournamentData.participant.find((p:any) => p.id === selectedMatch!.opponent1!.id)?.name}</p>
        <input type="text" placeholder="Score for Opponent 1" id="opponent1-score" />
        <br>
        <p><strong>Opponent 2:</strong> {tournamentData.participant.find((p:any) => p.id === selectedMatch!.opponent2!.id)?.name}</p>
        <input type="text" placeholder="Score for Opponent 2" id="opponent2-score" />
        <br>
        <br>
        <p><strong>Status:</strong> {selectedMatch!.status}</p>
        <button onclick={submit}>Submit Score</button>
        <button onclick={() => selectedMatch = null}>Close</button>
    </div>
{/if}