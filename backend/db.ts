import postgres from 'postgres'
import ck from 'ckey'


export const luciaClient = postgres({
    user: ck.PG_USER,
    database: 'lucia',
    hostname: 'db',
    port: 5432,
    password: ck.PG_PASSWORD,
})

