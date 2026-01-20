<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import Aside from "$lib/components/Aside.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import { accountRoutes, routes } from "$lib/routes";
    import { signout } from "$lib/betterauth/auth-client";
    import { getUserState } from "$lib/app-state/user.svelte";
    import { LucideLogOut, LucideMoon, LucideSun } from "@lucide/svelte";
    import type { NavProps } from "./navigation";
    import ThemeToggle from "./ThemeToggle.svelte";
    let showState = $state(false);
    let userState = $state(getUserState());

    let propsAside = {
        direction: "right",
    };
   
    let propsNav: NavProps = {
        navPosition: "top",
        linkPosition: "center",
    };
   
</script>

<header>
    <Navigation {routes} props={propsNav}></Navigation>
    <Avatar bind:showState></Avatar>
</header>
<Aside bind:showState routes={accountRoutes} props={propsAside}>
    {#snippet extra()}
        <ul class="extra">
            {#if userState.isAuthenticated()}
                <li class="auth">
                    <button
                        class="btn btn-logout"
                        onclick={() => {
                            signout();
                            showState = false;
                        }}
                    >
                        <LucideLogOut></LucideLogOut>
                    </button>
                </li>
                <li class="toggle-theme">
                    <ThemeToggle></ThemeToggle>
                </li>
            {/if}
        </ul>
    {/snippet}
</Aside>

<style>
    header {
        position: relative;
        height: var(--header-height);
        width: 100%;
        z-index: 1;
    }
    .extra {
        height: 100%;
        width: 100%;
        display: flex;
        margin-top: 2rem;
        flex-direction: column;
        .btn-logout {
            margin-block: 0.5rem;
            justify-self: right;
            margin-right: 3rem;
        }
        .toggle-theme{
            display: flex;
            margin-right: 3rem;
            justify-content: right;
        }
    }
</style>
