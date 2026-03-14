import type { RequestHandler } from '@sveltejs/kit';
import { getDataSource } from '$lib/dataSource';
import { Tournament } from '$lib/typeormEntities';
import { manager } from '$lib/brackets';

export const POST: RequestHandler = async ({ request }) => {
    const tournamentData:{name:string} = await request.json();

    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(Tournament);
    const tournament = await repository.findOne({ where: { name: tournamentData.name } });

    if(!tournament) {
        return new Response(JSON.stringify({ success: false, message: 'Tournament not found' }), { status: 404 });
    }
    const tournamentId = tournament.id;

    await repository.delete({ id: tournamentId });
    await manager.delete.tournament(tournamentId);
    await manager.storage.delete('participant', { tournament_id: tournamentId });

	return new Response();
};