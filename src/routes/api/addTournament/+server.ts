import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';
import type { User } from '$lib/types';
import { manager } from '$lib/brackets';

function getBracketSize(n: number): number {
    if (n <= 1) return 1;
    
    const exponent = Math.ceil(Math.log2(n));
    
    return Math.pow(2, exponent);
}

export const POST: RequestHandler = async ({ request }) => {
    
    const tournamentData:{seeding: User[], name:string} = await request.json();

    const tournamentId = db.data.tournaments.length > 0 ? db.data.tournaments[db.data.tournaments.length - 1].id + 1 : 1;
    const stage = await manager.create.stage({
        name: tournamentData.name,
        tournamentId: tournamentId,
        type: 'single_elimination',
        seeding: tournamentData.seeding.map(user => user.name),
        settings:{
            size:getBracketSize(tournamentData.seeding.length),
        } 
    });
    

    db.data.tournaments.push({
        id: tournamentId,
        name: tournamentData.name,
        participants: tournamentData.seeding.map(user => user.id)
    });
    await db.write();

	return new Response(JSON.stringify({ success: true, tournamentId }));
};