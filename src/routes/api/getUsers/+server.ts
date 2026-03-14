import type { RequestHandler } from '@sveltejs/kit';
import { getDataSource } from '$lib/dataSource';
import { User } from '$lib/typeormEntities';

export const GET: RequestHandler = async ({ request }) => {
    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(User);

    return new Response(JSON.stringify(await repository.find()));
};