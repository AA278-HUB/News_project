<script setup lang="ts">
import NewsCard from '../components/news/NewsCard.vue'
import { NEWS } from '../data/news'
import { useTheme } from '../composables/useTheme'

const { label } = useTheme()
</script>

<template>
  <main class="content">
    <section class="hero" aria-label="页面导语">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__inner">
        <div class="hero__kicker">Today’s Mood</div>
        <h1 class="hero__title">{{ label }}</h1>
        <p class="hero__desc">
          这是一个“模块化 + 登录态 + 路由”的新手友好示例：主题由 CSS 变量统一驱动，所有组件共享同一套视觉
          token，并在 0.5s 内完成丝滑过渡。
        </p>
      </div>
    </section>

    <section class="grid" aria-label="新闻列表">
      <NewsCard v-for="item in NEWS" :key="item.id" :item="item" />
    </section>
  </main>
</template>

<style scoped>
.content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 22px 18px 64px;
  transition: all var(--t);
}

.hero {
  position: relative;
  border-radius: var(--radius-card);
  border: var(--stroke) solid var(--border);
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--t);
}

.hero__bg {
  position: absolute;
  inset: -2px;
  background:
    radial-gradient(700px 320px at 12% 25%, color-mix(in srgb, var(--primary) 26%, transparent), transparent 60%),
    radial-gradient(520px 280px at 70% 20%, color-mix(in srgb, var(--primary-2) 22%, transparent), transparent 62%),
    linear-gradient(180deg, transparent, color-mix(in srgb, var(--surface-2) 65%, transparent));
  opacity: 1;
  transition: all var(--t);
}

.theme-negative .hero__bg {
  background:
    radial-gradient(600px 300px at 18% 22%, rgba(255, 70, 70, 0.16), transparent 62%),
    radial-gradient(560px 280px at 72% 22%, rgba(255, 180, 40, 0.1), transparent 62%),
    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.25));
}

.hero__inner {
  position: relative;
  padding: 26px 22px;
  transition: all var(--t);
}

.hero__kicker {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  transition: all var(--t);
}

.hero__title {
  margin: 10px 0 10px;
  font-size: clamp(26px, 3.2vw, 40px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 860;
  transition: all var(--t);
}

.hero__desc {
  margin: 0;
  max-width: 72ch;
  color: var(--muted);
  line-height: 1.7;
  transition: all var(--t);
}

.grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;
  transition: all var(--t);
}

@media (min-width: 760px) {
  .grid {
    gap: 16px;
  }
}
</style>

