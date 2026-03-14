import { manager } from '$lib/brackets';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const tournamentId = Number(params.id);

    try {
        const currentStage = await manager.get.currentStage(tournamentId);
        const tournamentData = await manager.get.tournamentData(tournamentId);

        return {
            tournamentData: JSON.parse(JSON.stringify(tournamentData)),
            currentStage: currentStage ? JSON.parse(JSON.stringify(currentStage)) : null
        };
    } catch (e) {
        console.error(e);
        throw error(404, 'Tournament not found');
    }
};