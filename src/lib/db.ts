import { JSONFilePreset } from 'lowdb/node'
import type { User } from './types'

const defaultData = { users: [] } as { users: User[] }
const db = await JSONFilePreset('db.json', defaultData)

export default db;