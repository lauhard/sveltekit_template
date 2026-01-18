import { page } from "$app/state";
import type { User } from "$lib/betterauth/auth";
import type { Route } from "$lib/routes";

type ValueOf<T> = T[keyof T];

export const NavType = {
    normal: "normal",
    aside: "aside",
} as const satisfies Record<string, string>;
export type NavType = ValueOf<typeof NavType>;

export const LinkPosition = {
    left: "left",
    center: "center",
    right: "right",
} as const satisfies Record<string, string>;

export type LinkPosition = keyof (typeof LinkPosition);

export const NavPosition = {
    top: "top",
    bottom: "bottom",
} as const satisfies Record<string, string>;
export type NavPosition = ValueOf<typeof NavPosition>;


export interface NavProps {
    navPosition: NavPosition;
    linkPosition: LinkPosition;
    navHeight: number;
}

export const showRoute = (user: User | undefined, route: Route): boolean => {
    if (!route.public) {
        return user?.role === route.role && user?.id !== undefined ? true : false;
    } else {
        return true;
    }
};

export const isRouteActive = (routePath: string) => {
    if (
        page.url.pathname == routePath ||
        (page.url.pathname.includes(routePath.toLowerCase()) &&
            routePath.toLowerCase() != "/")
    ) {
        return true;
    }
};

export const getRouteLevel = (v: string) => v.split("/").length - 1;