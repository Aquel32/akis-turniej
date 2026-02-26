import { JSONFilePreset } from 'lowdb/node'
import type { User } from './types'

const defaultData = { users: [], tournaments:[] } as { users: User[], tournaments: any[] }
const db = await JSONFilePreset('db.json', defaultData)

export default db;