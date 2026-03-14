import { getDataSource } from '$lib/dataSource';
import { Tournament, User } from '$lib/typeormEntities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const dataSource = await getDataSource();
    const tournamentRepository = dataSource.getRepository(Tournament);
    const userRepository = dataSource.getRepository(User);

    return {
		tournaments: JSON.parse(JSON.stringify(await tournamentRepository.find())),
		players: JSON.parse(JSON.stringify(await userRepository.find()))
	};
};