import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { auth } from "$lib/betterauth/auth";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const cookieHandle: Handle = async ({ event, resolve }) => {
    const session = await auth({platform: event.platform}).api.getSession({
        headers: event.request.headers
    });

    if(session) {
        event.locals.session = session.session;
        event.locals.user = session.user;        
    }
    return resolve(event);
}

const authHandle: Handle = async ({ event, resolve }) => {
    return svelteKitHandler({ event, resolve, auth: auth(event.platform), building });
}

export const handle: Handle = sequence(cookieHandle, authHandle);