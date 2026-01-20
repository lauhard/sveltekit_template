<script lang="ts">
    import { LucideMoon, LucideSun } from "@lucide/svelte";

    let theme = $state<string | null>("");
    $effect(() => {
        theme = localStorage.getItem("theme");
    });

    const toggleTheme = () => {
        theme = theme === "light" ? "dark" : "light";
        //set theme to local storage
        localStorage.setItem("theme", theme);
        document.documentElement.style.colorScheme = theme;
    };
</script>

<button class="btn btn-theme" onclick={toggleTheme}>
    <div class="theme light" class:light={theme === "light"}>
        <LucideSun size="1.2rem"></LucideSun>
    </div>
    <div class="theme dark" class:dark={theme === "dark"}>
        <LucideMoon size="1.2rem"></LucideMoon>
    </div>
</button>

<style>
    .btn-theme {
        display: flex;
        width: 80px;
        max-width: 80px;
        height: 38px;
        padding: 0;
        overflow: hidden;
        border-radius: 100vw;
        border: 2px solid var(--color-ld-accent-500);
        .theme {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 38px;
            width: 38px;
            border-radius: 50%;
            
            z-index: 100;
            opacity: 5%;
            background-color: var(--color-ld-accent-500);
            color: var(--color-black-500);
            transition-duration: 300ms;
            transition-property: transform, color, background-color;
            transition-timing-function: ease-in-out;
        }
        .light,
        .dark {
            transform: translateX(0px);
            z-index: 100;
            opacity: 100%;
        }
    }
    .btn:has(.light) {
        .dark {
            display: none;
        }
    }
</style>
