import type { RequestHandler } from '@sveltejs/kit';
import { getDataSource } from '$lib/dataSource';
import { Tournament } from '$lib/typeormEntities';

export const GET: RequestHandler = async ({ request }) => {
    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(Tournament);

    return new Response(JSON.stringify(await repository.find()));
};