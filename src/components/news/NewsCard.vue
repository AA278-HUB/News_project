<script setup lang="ts">
import { computed } from 'vue'
import type { NewsItem } from '../../data/news'
import { Flame, MessageSquare } from 'lucide-vue-next'
import { useTheme, type ThemeMood } from '../../composables/useTheme'

const props = defineProps<{
  item: NewsItem
}>()

const { mood } = useTheme()

function getMoodIcon(score: number, type: ThemeMood): string {
  if (type === 'positive') {
    if (score >= 80) return '🌟'
    if (score >= 40) return '😊'
    return '🙂'
  }
  if (score >= 80) return '💀'
  if (score >= 40) return '😨'
  return '🙁'
}

const moodScore = computed(() => (mood.value === 'positive' ? props.item.scores.positivePct : props.item.scores.negativePct))
const moodLabel = computed(() => (mood.value === 'positive' ? '积极' : '消极'))
const moodIcon = computed(() => getMoodIcon(moodScore.value, mood.value))
</script>

<template>
  <article class="it">
    <div class="it__left">
      <div class="it__meta">
        <span class="tag">{{ props.item.category }}</span>
        <span class="sep" aria-hidden="true">·</span>
        <span class="date">{{ props.item.publishedAt }}</span>
        <span class="sep" aria-hidden="true">·</span>
        <span class="author">{{ props.item.author.name }}</span>
      </div>

      <div class="it__mainLine">
        <h2 class="title">{{ props.item.title }}</h2>
        <span class="dash" aria-hidden="true">—</span>
        <p class="excerpt">{{ props.item.excerpt }}</p>
      </div>
    </div>

    <div class="it__right" aria-label="指数">
      <span class="stat stat--heat" title="热度">
        <Flame :size="14" />
        热度 {{ props.item.scores.heat }}
      </span>
      <span class="stat stat--mood" :title="`${moodLabel}指数`">
        <span class="moodIcon" aria-hidden="true">{{ moodIcon }}</span>
        <span class="pill" :class="{ 'pill--neg': mood === 'negative' }">{{ moodLabel }} {{ moodScore }}%</span>
      </span>
      <span class="stat" title="评论">
        <MessageSquare :size="14" />
        {{ 12 + (Number(props.item.id.slice(1)) || 0) }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.it {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 8px 10px;
  min-height: 64px;
}

.it__left {
  min-width: 0;
}

.it__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--mutedBg);
  color: var(--text);
  font-weight: 650;
}

.sep {
  color: var(--muted);
}

.it__mainLine {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 15px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  font-weight: 800;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dash {
  color: var(--muted);
  flex: none;
}

.excerpt {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.25;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.it__right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 12px;
  white-space: nowrap;
}

.stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.stat--heat {
  color: var(--accent2);
}

.stat--mood {
  color: var(--accent);
}

.moodIcon {
  font-size: 14px;
  line-height: 1;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--accent);
  font-weight: 700;
}

.pill--neg {
  color: var(--danger);
}

@media (max-width: 860px) {
  .it {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .it__right {
    justify-content: flex-start;
    flex-wrap: wrap;
    row-gap: 6px;
  }
}
</style>
