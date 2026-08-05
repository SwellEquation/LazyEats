import pg from 'pg'
import './dotenv.js'

// return DATE columns as 'YYYY-MM-DD' strings instead of JS Date objects,
// so JSON serialization can't shift the day across timezones
pg.types.setTypeParser(pg.types.builtins.DATE, (value) => value)

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
  }

export const pool = new pg.Pool(config)
