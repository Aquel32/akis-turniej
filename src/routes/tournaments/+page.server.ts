import db from '$lib/db';
import type { User } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        tournaments: db.data.tournaments,
        players: db.data.users
	};
};