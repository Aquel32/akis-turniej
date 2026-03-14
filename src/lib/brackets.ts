import { BracketsManager } from 'brackets-manager';
import { TypeORMStorage } from './typeormStorage';
import { AppDataSource } from './dataSource';

const storage = new TypeORMStorage(AppDataSource);
export const manager = new BracketsManager(storage);