<script setup lang="ts">
import type { NewsItem } from '../../data/news'

defineProps<{
  item: NewsItem
}>()
</script>

<template>
  <article class="card">
    <div
      class="card__cover"
      :style="{
        '--hA': item.cover.hueA,
        '--hB': item.cover.hueB,
      }"
      aria-hidden="true"
    >
      <div class="card__coverNoise" aria-hidden="true"></div>
      <div class="card__coverEdge" aria-hidden="true"></div>
    </div>

    <div class="card__body">
      <div class="meta">
        <span class="tag" :data-category="item.category">{{ item.category }}</span>
        <span class="dot" aria-hidden="true"></span>
        <span class="date">{{ item.publishedAt }}</span>
      </div>

      <h2 class="title">{{ item.title }}</h2>
      <p class="excerpt">{{ item.excerpt }}</p>

      <div class="author">
        <div class="avatar" aria-hidden="true">
          <span class="avatar__initial">{{ item.author.name.slice(0, 1) }}</span>
        </div>
        <div class="author__text">
          <div class="author__name">
            {{ item.author.name }}
            <span class="author__handle">@{{ item.author.handle }}</span>
          </div>
          <div class="author__hint">记者 / 特约撰稿</div>
        </div>
        <button class="read" type="button">阅读</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  grid-column: span 12;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  border-radius: var(--radius-card);
  border: var(--stroke) solid var(--border);
  background: color-mix(in srgb, var(--surface) 62%, transparent);
  box-shadow: var(--shadow-2);
  overflow: hidden;
  transition: all var(--t);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.theme-negative .card:hover {
  transform: translateY(-1px);
}

.card__cover {
  position: relative;
  min-height: 168px;
  background: linear-gradient(
      135deg,
      hsl(calc(var(--hA) * 1deg) 88% 56% / 0.9),
      hsl(calc(var(--hB) * 1deg) 90% 54% / 0.9)
    ),
    radial-gradient(90px 90px at 18% 20%, rgba(255, 255, 255, 0.35), transparent 70%),
    radial-gradient(120px 90px at 85% 75%, rgba(0, 0, 0, 0.18), transparent 62%);
  filter: var(--cover-filter);
  transition: all var(--t);
}

.card__coverNoise {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 14px 14px;
  opacity: 0;
  transition: all var(--t);
}

.theme-negative .card__coverNoise {
  opacity: 0.35;
}

.card__coverEdge {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.16),
    transparent 28%,
    transparent 72%,
    rgba(255, 255, 255, 0.12)
  );
  opacity: 0.35;
  transition: all var(--t);
}

.theme-negative .card__coverEdge {
  opacity: 0.55;
}

.card__body {
  padding: 16px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all var(--t);
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 12px;
  transition: all var(--t);
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--muted) 60%, transparent);
  transition: all var(--t);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  border: var(--stroke) solid var(--border);
  background: color-mix(in srgb, var(--surface-2) 72%, transparent);
  color: var(--text);
  font-weight: 700;
  transition: all var(--t);
}

.theme-negative .tag {
  border-color: color-mix(in srgb, var(--border) 95%, transparent);
  background: rgba(0, 0, 0, 0.18);
}

.tag::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 99px;
  margin-right: 8px;
  background: var(--primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 18%, transparent);
  transition: all var(--t);
}

.theme-negative .tag::before {
  background: var(--danger);
  box-shadow: 0 0 0 4px rgba(255, 59, 59, 0.16);
}

.title {
  margin: 0;
  font-size: 18px;
  line-height: 1.28;
  letter-spacing: -0.01em;
  font-weight: 820;
  transition: all var(--t);
}

.excerpt {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
  font-size: 14px;
  transition: all var(--t);
}

.author {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 8px;
  border-top: var(--stroke) solid color-mix(in srgb, var(--border) 70%, transparent);
  transition: all var(--t);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(16px 16px at 30% 30%, color-mix(in srgb, var(--primary) 55%, transparent), transparent 70%),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface) 70%, transparent),
      color-mix(in srgb, var(--surface-2) 70%, transparent)
    );
  border: var(--stroke) solid var(--border);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08);
  transition: all var(--t);
}

.theme-negative .avatar {
  border-radius: 10px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}

.avatar__initial {
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--text);
  font-size: 14px;
  transition: all var(--t);
}

.author__text {
  min-width: 0;
  flex: 1;
  transition: all var(--t);
}

.author__name {
  font-size: 13px;
  font-weight: 760;
  line-height: 1.2;
  transition: all var(--t);
}

.author__handle {
  margin-left: 8px;
  color: var(--muted-2);
  font-weight: 650;
  transition: all var(--t);
}

.author__hint {
  margin-top: 3px;
  font-size: 12px;
  color: var(--muted);
  transition: all var(--t);
}

.read {
  border: 0;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: calc(var(--radius) - 2px);
  font-weight: 780;
  letter-spacing: 0.2px;
  color: var(--text);
  background:
    radial-gradient(70px 50px at 30% 30%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 70%),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface) 36%, transparent),
      color-mix(in srgb, var(--surface-2) 52%, transparent)
    );
  border: var(--stroke) solid color-mix(in srgb, var(--border) 80%, transparent);
  box-shadow: 0 18px 52px color-mix(in srgb, var(--ring) 35%, transparent);
  transition: all var(--t);
  white-space: nowrap;
}

.read:hover {
  transform: translateY(-1px);
  box-shadow: 0 24px 70px color-mix(in srgb, var(--ring) 42%, transparent);
}

.theme-negative .read {
  background:
    radial-gradient(70px 50px at 30% 30%, rgba(255, 90, 61, 0.22), transparent 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.18));
  border-color: rgba(255, 255, 255, 0.12);
}

@media (min-width: 760px) {
  .card {
    grid-column: span 6;
    grid-template-columns: 1fr;
  }

  .card__cover {
    min-height: 170px;
  }
}

@media (min-width: 1060px) {
  .card {
    grid-column: span 4;
  }
}

@media (max-width: 520px) {
  .card {
    grid-template-columns: 1fr;
  }
}
</style>
