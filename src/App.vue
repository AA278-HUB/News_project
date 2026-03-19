<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue'
import { useTheme } from './composables/useTheme'

const { themeClass } = useTheme()
</script>

<template>
  <div class="app-root" :class="themeClass">
    <TheHeader />
    <RouterView />
  </div>
</template>

<style>
.app-root {
  min-height: 100vh;
  color: var(--text);
  background: var(--bg);
  font-size: 14px;
  line-height: 1.5;
}

/* Theme tokens (CSS variables) */
.theme-positive {
  --bg: #f9fafb;
  --surface: #ffffff;
  --surfaceHover: #f9fafb;
  --mutedBg: #f3f4f6;
  --border: #f0f0f0;
  --text: #111827;
  --muted: #6b7280;

  /* Accents (semantic): positive = ink green */
  --accent: #14532d;
  --accent2: #b45309;
  --danger: #b91c1c;
}

.theme-negative {
  --bg: #f9fafb;
  --surface: #ffffff;
  --surfaceHover: #f9fafb;
  --mutedBg: #f3f4f6;
  --border: #f0f0f0;
  --text: #111827;
  --muted: #6b7280;

  /* Accents (semantic): negative = dark brick red */
  --accent: #7f1d1d;
  --accent2: #9a3412;
  --danger: #7f1d1d;
}

/* Baseline tweaks */
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background: #f9fafb;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    Apple Color Emoji,
    Segoe UI Emoji;
}

a {
  color: inherit;
}
</style>
