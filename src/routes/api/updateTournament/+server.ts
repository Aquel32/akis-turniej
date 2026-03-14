import { manager } from '$lib/brackets';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const userData:any = await request.json();
    console.log(userData);

    await manager.update.match(userData);

    return new Response();
};