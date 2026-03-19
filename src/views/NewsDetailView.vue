<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ALL_NEWS } from '../data/news'
import ScoreBar from '../components/news/ScoreBar.vue'
import CommentSection from '../components/comments/CommentSection.vue'
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const id = computed(() => String(route.params.id ?? ''))
const item = computed(() => ALL_NEWS.find((n) => n.id === id.value))

async function back() {
  await router.push({ name: 'home' })
}
</script>

<template>
  <main class="page">
    <div class="wrap">
      <div class="top">
        <button class="back" type="button" @click="back">
          <ArrowLeft :size="16" />
          返回
        </button>
      </div>

      <section v-if="item" class="detail">
        <div class="detail__meta">
          <span class="tag">{{ item.category }}</span>
          <span class="sep" aria-hidden="true">·</span>
          <span class="date">{{ item.publishedAt }}</span>
          <span class="sep" aria-hidden="true">·</span>
          <span class="author">{{ item.author.name }}</span>
        </div>

        <h1 class="detail__title">{{ item.title }}</h1>
        <p class="detail__excerpt">{{ item.excerpt }}</p>

        <div class="detail__grid">
          <div class="detail__body">
            <div class="content">{{ item.content }}</div>
          </div>
          <aside class="detail__side">
            <div class="box">
              <div class="box__title">多维评分</div>
              <ScoreBar
                :heat="item.scores.heat"
                :positive-pct="item.scores.positivePct"
                :negative-pct="item.scores.negativePct"
              />
            </div>
          </aside>
        </div>
      </section>

      <section v-else class="notfound">
        <div class="notfound__title">未找到新闻</div>
        <div class="notfound__desc">请返回首页从列表进入。</div>
      </section>

      <section v-if="item" class="comments">
        <CommentSection :news-id="item.id" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 12px 12px 40px;
}

.wrap {
  max-width: 1120px;
  margin: 0 auto;
}

.top {
  display: flex;
  justify-content: space-between;
  padding: 6px 0 10px;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  color: var(--text);
  font-weight: 700;
}

.back:hover {
  border-color: var(--accent);
}

.detail {
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 12px;
}

.detail__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 12px;
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

.detail__title {
  margin: 8px 0 6px;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 850;
  color: var(--text);
}

.detail__excerpt {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.detail__grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.detail__body {
  min-width: 0;
}

.content {
  white-space: pre-wrap;
  color: var(--text);
  line-height: 1.65;
}

.box {
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 10px;
}

.box__title {
  font-weight: 850;
  margin-bottom: 8px;
  color: var(--text);
}

.comments {
  margin-top: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 12px;
}

.notfound {
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 14px;
}

.notfound__title {
  font-weight: 850;
  color: var(--text);
}

.notfound__desc {
  margin-top: 6px;
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 960px) {
  .detail__grid {
    grid-template-columns: 1fr;
  }
}
</style>

