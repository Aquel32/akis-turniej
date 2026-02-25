import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		players: [{
            name:"Adam Kowalski",
            age:12,
            country:"Polska",
            registrationDate:"24.05.2024 07:05",
        }]
	};
};