import type { RequestHandler } from '@sveltejs/kit';
import { getDataSource } from '$lib/dataSource';
import { Tournament, User } from '$lib/typeormEntities';
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

    // tworzymy mape uzytkownikow aby pozbyc sie duplaktów
    const uniqueUsers = Array.from(new Map(tournamentData.seeding.map((user) => [user.id, user])).values());

    const dataSource = await getDataSource();
    const tournamentRepository = dataSource.getRepository(Tournament);

    const existingTournaments = await tournamentRepository.find();
    const existingIds = existingTournaments.map((tournament) => tournament.id);
    const tournamentId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const sortedPlayers = sortPlayers(tournamentData.selectedSort, uniqueUsers);
    const participantIds: number[] = [];
    for (const player of sortedPlayers) {
        const participantId = await manager.storage.insert('participant', {
            tournament_id: tournamentId,
            name: player.name,
        });
        participantIds.push(participantId);
    }

    const bracketSize = getBracketSize(sortedPlayers.length)
    const seedingOrder = sortedPlayers.length == bracketSize ? 'natural' : 'inner_outer';
    await manager.create.stage({
        name: tournamentData.name,
        tournamentId: tournamentId,
        type: 'single_elimination',
        seedingIds: participantIds,
        settings:{
            seedOrdering: [seedingOrder],
            size:bracketSize,
        } 
    });

    await tournamentRepository.save({
        id: tournamentId,
        name: tournamentData.name,
    });

	return new Response(JSON.stringify({ success: true, tournamentId }));
};