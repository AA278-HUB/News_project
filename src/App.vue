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
  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --t: 0.5s var(--ease);

  min-height: 100vh;
  color: var(--text);
  background: var(--bg);
  transition: all var(--t);
}

/* Theme tokens (CSS variables) */
.theme-positive {
  --bg: radial-gradient(1200px 700px at 18% 18%, rgba(125, 255, 190, 0.18), transparent 55%),
    radial-gradient(1000px 600px at 85% 20%, rgba(95, 200, 255, 0.18), transparent 55%),
    linear-gradient(180deg, #f6fffb 0%, #f6fbff 45%, #ffffff 100%);
  --surface: rgba(255, 255, 255, 0.78);
  --surface-2: rgba(255, 255, 255, 0.55);
  --border: rgba(25, 65, 55, 0.12);
  --shadow: 0 18px 60px rgba(15, 60, 45, 0.12);
  --shadow-2: 0 10px 28px rgba(15, 60, 45, 0.12);
  --text: rgba(15, 30, 25, 0.92);
  --muted: rgba(15, 30, 25, 0.62);
  --muted-2: rgba(15, 30, 25, 0.45);
  --primary: #11b981;
  --primary-2: #3aa6ff;
  --ring: rgba(17, 185, 129, 0.35);
  --danger: #ff4d6d;

  --radius: 20px;
  --radius-card: 22px;
  --radius-media: 18px;
  --stroke: 1px;
  --cover-filter: saturate(1.1) contrast(1.05);
}

.theme-negative {
  --bg: radial-gradient(900px 520px at 18% 10%, rgba(255, 75, 75, 0.08), transparent 55%),
    radial-gradient(800px 520px at 88% 18%, rgba(255, 160, 45, 0.06), transparent 58%),
    linear-gradient(180deg, #0a0c10 0%, #0b0f16 55%, #07080b 100%);
  --surface: rgba(15, 18, 26, 0.72);
  --surface-2: rgba(10, 12, 16, 0.62);
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 22px 70px rgba(0, 0, 0, 0.55);
  --shadow-2: 0 12px 34px rgba(0, 0, 0, 0.6);
  --text: rgba(245, 247, 255, 0.92);
  --muted: rgba(245, 247, 255, 0.62);
  --muted-2: rgba(245, 247, 255, 0.42);
  --primary: #ff5a3d;
  --primary-2: #ffb020;
  --ring: rgba(255, 90, 61, 0.28);
  --danger: #ff3b3b;

  --radius: 10px;
  --radius-card: 14px;
  --radius-media: 8px;
  --stroke: 1px;
  --cover-filter: grayscale(0.85) contrast(1.15) saturate(0.9);
}

/* Baseline tweaks */
html,
body {
  height: 100%;
}

body {
  margin: 0;
}
</style>
