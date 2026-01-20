<script lang="ts">
    import { type Route } from "$lib/routes";
    import { LucideX } from "@lucide/svelte";
    import { type User } from "$lib/betterauth/auth";
    import { onMount, type Snippet } from "svelte";
    import NavigationItem from "./NavigationItem.svelte";
    import { getUserState } from "$lib/app-state/user.svelte";
    let {
        extra,
        routes,
        showState = $bindable(false),
        propsAside,
        ...props
    }: {
        extra?: Snippet;
        routes?: Route[];
        showState?: boolean;
        propsAside?: { direction: string };
    } = $props();

    let direction = $derived(propsAside?.direction ?? "left");
    let navElement: HTMLElement;
    let hasFocus = $state(false);
    let userState = $state(getUserState());
    let user = $derived(userState.userInfo) as User;
  
    $effect(() => {
        if (showState && navElement) {
            hasFocus = true;
        }
    });

    const onClickOutside = (element: HTMLElement) => {
        const handleClick = (event: MouseEvent | TouchEvent) => {
            if (
                !element.contains(event.target as Node)
            ) {
                showState = false;
            }
        };
        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    };
    

    const onKeyDown = () => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key == "Escape") showState = false;
        };
        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    };
</script>

<nav
    bind:this={navElement}
    {...props}
    class="aside-nav"
    tabindex="-1"
    class:left={direction === "left"}
    class:right={direction === "right"}
    class:open={showState === true}
    {@attach onClickOutside}
    {@attach onKeyDown}
>
    <button
        class="btn btn-close"
        onclick={() => {
            if (hasFocus) {
                showState = false;
            }
        }}><LucideX size="1rem"></LucideX></button
    >
    <ul class="aside-nav-items">
        {#each routes as route}
            <NavigationItem classPrefix="aside-" {route}></NavigationItem>
        {/each}
    </ul>
    {@render extra?.()}
</nav>

<style>
</style>
