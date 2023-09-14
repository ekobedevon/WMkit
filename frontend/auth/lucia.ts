import { lucia } from 'lucia'
import { nextjs } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import client from '../db'

export const auth = lucia({
    adapter: postgresAdapter(client, {
        user: 'auth_user',
        key: 'user_key',
        session: 'user_session',
    }),
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD", // "PROD" if deployed to HTTPS
    middleware: nextjs(),
    getUserAttributes: (data:any) => {
        return {
            username: data.username,
        }
    },
	csrfProtection:{allowedSubdomains:"*"}
})

export type Auth = typeof auth