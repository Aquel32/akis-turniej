import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
    const userData:User = await request.json();
    
    userData.id = db.data.users.length > 0 ? db.data.users[db.data.users.length - 1].id + 1 : 1;

    db.data.users.push(userData);
    await db.write();

	return new Response();
};