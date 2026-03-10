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

function sortPlayers(criteria: 'name' | 'age' | 'rating', players: User[]): User[] {
    const result = [...players].sort((a:User, b:User) => {
        if (criteria === 'name') {
            return a.name.localeCompare(b.name);
        } else if (criteria === 'age') {
            return a.age - b.age;
        } else if (criteria === 'rating') {
            return b.rating - a.rating;
        }
        return 0;
    });
    return result;
}

export const POST: RequestHandler = async ({ request }) => {
    const tournamentData:{seeding: User[], name:string, selectedSort: 'name' | 'age' | 'rating'} = await request.json();
    
    const tournamentId = db.data.tournaments.length > 0 ? db.data.tournaments[db.data.tournaments.length - 1].id + 1 : 1;
    const sortedPlayers = sortPlayers(tournamentData.selectedSort, tournamentData.seeding);
    
    const bracketSize = getBracketSize(tournamentData.seeding.length)
    const seedingOrder = tournamentData.seeding.length == bracketSize ? 'natural' : 'inner_outer';

    const stage = await manager.create.stage({
        name: tournamentData.name,
        tournamentId: tournamentId,
        type: 'single_elimination',
        seeding: sortedPlayers.map(user => user.name),
        settings:{
            seedOrdering: [seedingOrder],
            size:bracketSize,
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