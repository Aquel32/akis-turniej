import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';
import type { User } from '$lib/types';

export const GET: RequestHandler = async ({ request }) => {
    return new Response(JSON.stringify(db.data.users));
};