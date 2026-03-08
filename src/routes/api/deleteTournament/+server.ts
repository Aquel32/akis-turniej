import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';
import type { User } from '$lib/types';
import { manager } from '$lib/brackets';

export const POST: RequestHandler = async ({ request }) => {
    const tournamentData:{name:string} = await request.json();

    const tournamentIndex = db.data.tournaments.findIndex(t => t.name === tournamentData.name);
    if(tournamentIndex === -1) {
        return new Response(JSON.stringify({ success: false, message: 'Tournament not found' }), { status: 404 });
    }
    const tournamentId = db.data.tournaments.find(t => t.name === tournamentData.name).id;

    console.log(tournamentId);

    db.data.tournaments.splice(tournamentIndex, 1);
    await db.write();

    const st = await manager.get.currentStage(tournamentId);
    console.log(st)
    if(st)
    {
        manager.delete.stage(st.id);
    }
    manager.delete.tournament(tournamentId);

	return new Response();
};