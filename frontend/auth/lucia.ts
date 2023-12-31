import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import client from '../db'

export const auth = lucia({
    adapter: postgresAdapter(client, {
        user: 'auth_user',
        key: 'user_key',
        session: 'user_session',
    }),
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD", // "PROD" if deployed to HTTPS
    middleware: nextjs_future(),
    getUserAttributes: (data:any) => {
        return {
            display: data.display,
			icon:data.icon,
			user_id:data.user_id,
			role:data.role
        }
    },
})

export type Auth = typeof auth
