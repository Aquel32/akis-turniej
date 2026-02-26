import { BracketsManager } from 'brackets-manager';
import { JsonDatabase } from 'brackets-json-db';

const storage = new JsonDatabase('brackets-db.json');
export const manager = new BracketsManager(storage);