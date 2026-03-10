<script lang="ts">
    import 'brackets-viewer/dist/brackets-viewer.min.css';
    import type { MatchWithMetadata } from 'brackets-viewer';
	import MatchEditor from './MatchEditor.svelte';
	import { query } from '$app/server';

    let { tournamentData } = $props();
    let selectedMatch= $state<MatchWithMetadata | null>(null)

    $effect(() => {
        console.log(tournamentData)
        if (typeof window !== 'undefined' && tournamentData) {
            loadAndRender();
        }
    });

    async function loadAndRender() {
        await (window as any).bracketsViewer.render({
            stages: tournamentData.stage,
            matches: tournamentData.match,
            matchGames: tournamentData.match_game,
            participants: tournamentData.participant,
        }, {
            customReplacements: {
                'BYE': 'Wolny Los',
            },
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
        document.querySelectorAll("div.name.bye").forEach(el => {
            el.textContent = "EMPTY";
        })
    }

    function submit(op1Score:number, op2Score:number)
    {
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

<MatchEditor enabled={selectedMatch !== null} close={() => selectedMatch = null} submit={submit} p1Name={tournamentData.participant.find((p:any) => p.id === selectedMatch?.opponent1!.id)?.name} p2Name={tournamentData.participant.find((p:any) => p.id === selectedMatch?.opponent2!.id)?.name} />