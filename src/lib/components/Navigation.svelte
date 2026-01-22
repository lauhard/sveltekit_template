<script lang="ts">
    import type { Route } from "$lib/routes";
    import { LucideMenu } from "@lucide/svelte";
    import NavigationItem from "./NavigationItem.svelte";
    import Aside from "./Aside.svelte";
    let { routes, ...props}:{routes:Route[]} =$props();
    let showAsideNav = $state(false);
</script>

<nav class="nav " {...props} >
        <ul class="nav-items center">
            {#each routes as route}
                <NavigationItem {route}
                ></NavigationItem>
            {/each}
        </ul>
        <div class="nav-burger-menu">
            <button
                class="btn btn-burger"
                onclick={() => {
                    showAsideNav = true;
                }}
            >
                <LucideMenu></LucideMenu>
            </button>
        </div>
        <Aside bind:showState={showAsideNav} {routes}></Aside>
</nav>

<style></style>
