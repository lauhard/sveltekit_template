<script lang="ts">
    import Aside from "$lib/components/Aside.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import { accountRoutes, routes } from "$lib/routes";
    import { signout } from "$lib/betterauth/auth-client";
    import { getUserState } from "$lib/app-state/user.svelte";
    import { LucideLogOut } from "@lucide/svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import Navigation from "./Navigation.svelte";
    let showAsideUser = $state(false);
    let userState = $state(getUserState());
    let { innerWidth }:{innerWidth:number} =$props();
    let propsAside = {
        direction: "right",
    };
</script>

<header class="header">
    <Navigation {routes} {innerWidth}></Navigation>
    <Avatar bind:showState={showAsideUser}></Avatar>
</header>

<Aside
    bind:showState={showAsideUser}
    routes={accountRoutes}
    {propsAside}
>
    {#snippet extra()}
        <ul class="extra">
            {#if userState.isAuthenticated()}
                <li class="toggle-theme">
                    <ThemeToggle></ThemeToggle>
                </li>
                <li class="auth">
                    <button
                        class="btn btn-logout"
                        onclick={() => {
                            signout("/auth/login");
                            showAsideUser = false;
                        }}
                    >
                        <LucideLogOut></LucideLogOut>
                    </button>
                </li>
            {/if}
        </ul>
    {/snippet}
</Aside>

<style>
    header {
        height: var(--header-height);
        width: 100%;
        z-index: 1;
        display: flex;
        position: relative;
        flex-direction: row-reverse;
    }
    .extra {
        height: 100%;
        width: 100%;
        display: flex;
        margin-top: 0.5rem;
        flex-direction: column;
        .auth {
            .btn-logout {
                bottom: 1rem;
                position: fixed;
                margin-block: 0.5rem;
                justify-self: right;
                margin-right: 1rem;
            }
        }
        .toggle-theme {
            display: flex;
            padding-right: 2.5rem;
            justify-content: right;
        }
    }
</style>
