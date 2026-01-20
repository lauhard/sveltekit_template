<script lang="ts">
    import { resolve } from "$app/paths";
    import { LucideMenu } from "@lucide/svelte";
    import { getUserState } from "$lib/app-state/user.svelte";
    import { getRouteLevel, showRoute, type NavProps } from "$lib/components/navigation";
    import { type Route } from "../routes";
    import { type User } from "$lib/betterauth/auth";
    import Aside from "./Aside.svelte";
    
    let { routes, props } = $props<{
        routes: Route[];
        props?:NavProps
    }>();

    let userState = $state(getUserState());
    let navPosition = $derived(props?.navPosition ?? "top")
    let linkPosition =  $derived(props?.linkPosition ?? "center")
    let innerWidth = $state<number>(700);
    let showState = $state(false);

    let propsAside={
        direction:"left"
    }
</script>

<svelte:window bind:innerWidth />

{#snippet GetIconFromRoute(route: Route)}
    {#if route?.icon != undefined}
        {@const Icon = route.icon}
        <Icon size="1.5rem" />
    {/if}
{/snippet}

{#snippet RenderRoute(route: Route, index: number)}
    {#if showRoute(userState.userInfo as User, route)}
        <li
            class="route"
            data-hasChildren={route?.subRoutes ? "true" : "false"}
            data-route-name={route.name}
            data-index={index}
        >
            <a class="route-link" href={resolve(route.path as any)}>
                {@render GetIconFromRoute(route)}
                {route.name}
            </a>
        </li>
    {/if}
{/snippet}

{#snippet RenderRoutes(routes: Route[])}
    {#each routes as route}
        {#if route?.path != undefined}
            {@render RenderRoute(route, getRouteLevel(route.path))}
        {/if}
    {/each}
{/snippet}

<nav
    class="nav"
    class:top={navPosition === "top"}
    class:bottom={navPosition === "bottom"}
    style=" --nav-height: 80px;"
>
    <ul
        class="main-routes"
        class:center={linkPosition === "center"}
        class:left={linkPosition === "left"}
        class:right={linkPosition === "right"}
    >
        {@render RenderRoutes(routes)}
    </ul>
    <Aside {routes} bind:showState props={propsAside}></Aside>
    <ul class="auth"></ul>
    <ul class="burger-menu">
        <li>
            <button class="btn btn-burger" onclick={()=>{showState=true; console.log("showstate", showState)}}>
                <LucideMenu></LucideMenu>
            </button>
        </li>
    </ul>
</nav>

<style>
    .nav {
        position: fixed;
        width: 100%;
        height: var(--nav-height, 80px);
        z-index: 500;
        background-color: var(--color-black-400);
        clip-path: inset(-9999px -5px -9999px -5px);

        .main-routes {
            display: grid;
            grid-template-rows: var(--nav-height, 80px);
            grid-template-columns: repeat(auto-fill, minmax(0px, max-content));
            @media (width < 600px) {
                display: none;
            }
        }
        .burger-menu {
            .btn-burger {
                border: none;
                background: var(--color-black-400);
                color: var(--color-white-500);
                transition-property: color, background;
                transition-duration: var(--transition-base);
                transition-timing-function: ease-in-out;
                
            }
            .btn-burger:hover {
                color: var(--color-ld-accent-500);
                transition-property: color, background;
                transition-duration: var(--transition-base);
                transition-timing-function: ease-in-out;
            }
        }
        .auth,
        .burger-menu {
            position: absolute;
            transform: translateY(-50%);
            display: none;
            @media (width < 600px) {
                display: block;
            }
            top: 50%;
            .btn {
                margin-inline: 0.8rem;
            }
        }
        .burger-menu{
            left:0;
        }

        .route,
        .route-link {
            position: relative;
            width: fit-content;
            display: grid;
            place-content: center center;
            min-width: 140px;
            width: 100%;
        }
        .route-link {
            width: 100%;
            height: 100%;
            color: var(--color-white-500);
            text-decoration: none;
            display: flex;
            flex-direction: column;
            flex: 1;
            transition-property: color, background;
            transition-duration: var(--transition-base);
            transition-timing-function: ease-in-out;
        }
        .route-link:hover {
            background: var(--color-black-400);
            color: var(--color-ld-accent-500);
            transition-property: color, background;
            transition-duration: var(--transition-base);
            transition-timing-function: ease-in-out;
        }
    }

    .nav.top {
        top: 0%;
        left: 0%;
        box-shadow: 1px 3px 8px rgba(26, 26, 26, 0.354);
    }

    .nav.bottom {
        bottom: 0;
    }

    .nav:has(.main-routes.center) {
        .auth,
        .burger-menu {
            right: 0;
        }
    }
    .nav:has(.main-routes.right) {
        .auth,
        .burger-menu {
            left: 0;
        }
    }
    .nav:has(.main-routes.left) {
        .auth,
        .burger-menu {
            right: 0;
        }
    }
    .main-routes.center {
        place-content: center center;
    }
    .main-routes.right {
        place-content: center right;
    }
    .main-routes.left {
        place-content: center left;
    }
</style>
