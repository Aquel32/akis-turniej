import { manager } from '$lib/brackets';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    // params.id - tournament id

    const stage = await manager.get.currentStage(Number(params.id));
    const tournamentData = await manager.get.stageData(stage!.id);

    return { tournamentData };
};