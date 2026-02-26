<script lang="ts">
    import 'brackets-viewer/dist/brackets-viewer.min.css';
    import type { MatchWithMetadata } from 'brackets-viewer';

    let { tournamentData } = $props();

    $effect(() => {
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
                console.log('Match clicked:', match);
            },
        });
    }
</script>

<div class="brackets-viewer"></div>