import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';
import type { User } from '$lib/types';
import { manager } from '$lib/brackets';

export const POST: RequestHandler = async ({ request }) => {
    
    const tournamentData:{seeding: User[], name:string} = await request.json();

    const tournamentId = db.data.tournaments.length > 0 ? db.data.tournaments[db.data.tournaments.length - 1].id + 1 : 1;
    const stage = await manager.create.stage({
        name: tournamentData.name,
        tournamentId: tournamentId,
        type: 'single_elimination',
        seeding: tournamentData.seeding.map(user => user.name)
    });
    

    db.data.tournaments.push({
        id: tournamentId,
        name: tournamentData.name,
        participants: tournamentData.seeding.map(user => user.id)
    });
    await db.write();

	return new Response(JSON.stringify({ success: true, tournamentId }));
};