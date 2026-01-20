<script lang="ts">
    import { getUserState } from "$lib/app-state/user.svelte";
    import { type Route } from "$lib/routes";
    import { getRouteLevel, showRoute } from "$lib/components/navigation";
    import { resolve } from "$app/paths";
    import { LucideX } from "@lucide/svelte";
    import { type User } from "$lib/betterauth/auth";
    import type { Snippet } from "svelte";

    let {
        extra,
        showState = $bindable(false),
        routes,
        props,
    } = $props<{
        extra?: Snippet;
        showState: boolean;
        routes: Route[];
        props?: {
            direction: string;
        };
    }>();

    let userState = $state(getUserState());
    let direction = $derived(props?.direction ?? "left");
</script>

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
            <a
                class="route-link"
                href={resolve(route.path as any)}
                onmousedown={() => (showState = false)}
            >
                {@render GetIconFromRoute(route)}
                {route.name}
            </a>
            {#if route.subRoutes}
                <ul class="sub-routes">
                    {@render RenderRoutes(route.subRoutes)}
                </ul>
            {/if}
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
    class="aside"
    class:left={direction === "left"}
    class:right={direction === "right"}
    class:open={showState === true}
>
    <button
        class="btn btn-close"
        onclick={() => {
            showState = false;
        }}><LucideX size="1rem"></LucideX></button
    >
    <ul class="aside-routes">
        {@render RenderRoutes(routes)}
    </ul>
    {@render extra?.()}
</nav>

<style>
    .aside {
        position: fixed;
        top: 0;
        bottom: 0;
        height: 100svh;
        width: 40svw;
        min-width: 250px;
        max-width: 350px;
        background-color: var(--color-black-300);
        z-index: 20;
        transition: all 300ms ease-in-out;
        .aside-routes {
            position: relative;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-top: 5rem;
            align-items: center;
            .route,
            .route-link {
                width: 100%;
                min-height: 40px;
            }
            .route-link {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row-reverse;
                justify-content: end;
                color: var(--color-white-500);
            }
            .route {
                margin-right: 5rem;
            }
            .route-link:hover {
                color: var(--color-ld-accent-500);
            }
        }
        .btn-close {
            color: var(--color-white-500);
            border-color: var(--color-white-500);
            border-radius: 100vw;
            width: 35px;
            height: 35px;
            padding: 0;
            margin: 1rem;
            position: absolute;
            &:hover {
                color: var(--color-ld-accent-500);
                border-color: var(--color-ld-accent-500);
            }
        }
    }
    .aside.right {
        right: 0;
        transform: translateX(400svw);
    }
    .aside.left {
        left: 0;
        transform: translateX(-400svw);
        .btn-close {
            right: 0;
        }

        .route-link {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: start;
            color: var(--color-white-500);
        }
        .route {
            margin-right: 0rem;
            margin-left: 5rem;
        }
    }
    .aside.open {
        transform: translateX(0svw);
        transition: all 300ms ease-in-out;
    }
</style>
