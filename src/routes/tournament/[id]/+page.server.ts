import { manager } from '$lib/brackets';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const data = await manager.get.stageData(Number(params.id));

    if (!data) throw error(404, 'Tournament data not found');

    return { tournamentData: data };
};