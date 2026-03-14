import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '$env/static/private';
import { DataSource } from "typeorm";
import { Group, Participant, Stage, Round, Match, MatchGame, Tournament, User } from "./typeormEntities";
import "reflect-metadata";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT) || 3306,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Participant, Stage, Group, Round, Match, MatchGame, User, Tournament],
    subscribers: [],
    migrations: [],
})

let initializationPromise: Promise<DataSource> | null = null;

export async function getDataSource(): Promise<DataSource> {
    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }

    if (!initializationPromise) {
        initializationPromise = AppDataSource.initialize().catch((error) => {
            initializationPromise = null;
            throw error;
        });
    }

    return initializationPromise;
}

try {
    await getDataSource();
} catch (error) {
    console.log("Cannot connect: ", error)
}