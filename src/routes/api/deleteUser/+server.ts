import type { RequestHandler } from '@sveltejs/kit';
import { getDataSource } from '$lib/dataSource';
import { User } from '$lib/typeormEntities';

export const POST: RequestHandler = async ({ request }) => {
    const userData:User = await request.json();

    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(User);
    await repository.delete({ id: userData.id });

	return new Response();
};