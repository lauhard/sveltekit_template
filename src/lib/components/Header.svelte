<script lang="ts">
    import type { NavProps } from "$lib/components/navigation";
    import Navigation from "$lib/components/Navigation.svelte";
    import Aside from "$lib/components/Aside.svelte";
    import Avatar from "$lib/components/Avatar.svelte";

    let showState = $state(false);
    let navProps = $derived<NavProps>({
        linkPosition: "center",
        navPosition: "top",
        navHeight: 80,
    });
</script>

<header>
    <Navigation {navProps}></Navigation>
    <Avatar bind:showState></Avatar>
</header>
<Aside bind:showState={showState}></Aside>

<style>
    header {
        position: relative;
        height: var(--header-height);
        width: 100%;
        z-index: 1;
    }
</style>
