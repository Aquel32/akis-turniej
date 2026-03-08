import { manager } from '$lib/brackets';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const userData:any = await request.json();
    console.log(userData);

    manager.update.match(userData);

    return new Response();
};