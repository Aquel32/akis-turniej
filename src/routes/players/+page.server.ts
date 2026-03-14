import { getDataSource } from '$lib/dataSource';
import { User } from '$lib/typeormEntities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(User);

    return {
		players: JSON.parse(JSON.stringify(await repository.find()))
	};
};