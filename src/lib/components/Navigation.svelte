<script lang="ts">
    import type { Route } from "$lib/routes";
    import { LucideMenu } from "@lucide/svelte";
    import NavigationItem from "./NavigationItem.svelte";
    import Aside from "./Aside.svelte";
    let { routes, innerWidth=700, ...props}:{routes:Route[], innerWidth?:number} =$props();
    let showAsideNav = $state(false);
</script>

<nav class="nav " {...props} >
    {#if innerWidth > 600}
        <ul class="nav-items center">
            {#each routes as route}
                <NavigationItem {route}
                ></NavigationItem>
            {/each}
        </ul>
    {:else}
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
    {/if}
</nav>

<style></style>
