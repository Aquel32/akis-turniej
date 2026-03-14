import type { CrudInterface, DataTypes, Table } from 'brackets-manager';
import type { Id } from 'brackets-model';
import { DataSource, Repository } from 'typeorm';
import { Participant, Stage, Group, Round, Match, MatchGame } from './typeormEntities';

export class TypeORMStorage implements CrudInterface {
    constructor(private db: DataSource) {}

    private async ensureInitialized(): Promise<void> {
        if (!this.db.isInitialized) {
            await this.db.initialize();
        }
    }

    private getRepo(table: Table): Repository<any> {
        const mapping: Record<Table, any> = {
            'participant': Participant,
            'stage': Stage,
            'group': Group,
            'round': Round,
            'match': Match,
            'match_game': MatchGame
        };
        return this.db.getRepository(mapping[table]);
    }

    async insert<T extends Table>(table: T, value: Omit<DataTypes[T], 'id'>): Promise<number>;
    async insert<T extends Table>(table: T, value: Omit<DataTypes[T], 'id'>[]): Promise<boolean>;
    async insert<T extends Table>(table: T, value: Omit<DataTypes[T], 'id'> | Omit<DataTypes[T], 'id'>[]): Promise<number | boolean> {
        await this.ensureInitialized();
        const repo = this.getRepo(table);

        if (Array.isArray(value)) {
            await repo.save(value);
            return true;
        }

        const res = await repo.save(value);
        return res.id;
    }

    async select<T extends Table>(table: T): Promise<Array<DataTypes[T]> | null>;
    async select<T extends Table>(table: T, id: Id): Promise<DataTypes[T] | null>;
    async select<T extends Table>(table: T, filter: Partial<DataTypes[T]>): Promise<Array<DataTypes[T]> | null>;
    async select<T extends Table>(table: T, filter?: Id | Partial<DataTypes[T]>): Promise<Array<DataTypes[T]> | DataTypes[T] | null> {
        await this.ensureInitialized();
        const repo = this.getRepo(table);

        if (filter === undefined) {
            return await repo.find();
        }

        if (typeof filter === 'number' || typeof filter === 'string') {
            return await repo.findOne({ where: { id: filter } as any }) || null;
        }

        const res = await repo.find({ where: filter });
        return res;
    }

    async update<T extends Table>(table: T, idOrFilter: Id, value: DataTypes[T]): Promise<boolean>;
    async update<T extends Table>(table: T, idOrFilter: Partial<DataTypes[T]>, value: Partial<DataTypes[T]>): Promise<boolean>;
    async update<T extends Table>(table: T, idOrFilter: Id | Partial<DataTypes[T]>, value: DataTypes[T] | Partial<DataTypes[T]>): Promise<boolean> {
        await this.ensureInitialized();
        const repo = this.getRepo(table);

        if (typeof idOrFilter === 'number' || typeof idOrFilter === 'string') {
            await repo.update(idOrFilter, value);
        } else {
            await repo.update(idOrFilter, value);
        }

        return true;
    }

    async delete<T extends Table>(table: T): Promise<boolean>;
    async delete<T extends Table>(table: T, filter: Partial<DataTypes[T]>): Promise<boolean>;
    async delete<T extends Table>(table: T, filter?: Partial<DataTypes[T]>): Promise<boolean> {
        await this.ensureInitialized();
        const repo = this.getRepo(table);

        if (filter === undefined) {
            await repo.clear();
        } else {
            await repo.delete(filter as any);
        }

        return true;
    }
}