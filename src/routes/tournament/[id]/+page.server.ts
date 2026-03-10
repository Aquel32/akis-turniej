import { manager } from '$lib/brackets';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    // params.id - tournament id

    const currentStage = await manager.get.currentStage(Number(params.id));
    const tournamentData = await manager.get.tournamentData(Number(params.id));
    
    return { tournamentData, currentStage };
};