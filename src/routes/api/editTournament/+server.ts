import type { RequestHandler } from '@sveltejs/kit';
import { getDataSource } from '$lib/dataSource';
import { Tournament } from '$lib/typeormEntities';

export const POST: RequestHandler = async ({ request }) => {
    const tournamentData:Tournament = await request.json();

    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(Tournament);
    await repository.update({ id: tournamentData.id }, tournamentData);

	return new Response();
};