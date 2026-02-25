import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
    const userData:User = await request.json();
    console.log(userData);
    const index = db.data.users.findIndex(user => user.id === userData.id);
    if(index !== -1)
    {
        db.data.users.splice(index, 1);
        await db.write();
    }

	return new Response();
};