<script setup lang="ts">
import NewsCard from '../components/news/NewsCard.vue'
import { ALL_NEWS } from '../data/news'
import Pagination from '../components/common/Pagination.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pageSize = 20
const page = ref(1)

const total = computed(() => ALL_NEWS.length)
const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return ALL_NEWS.slice(start, start + pageSize)
})

async function openNews(id: string) {
  await router.push({ name: 'news-detail', params: { id } })
}
</script>

<template>
  <main class="page">
    <div class="wrap">
      <div class="listHead">
        <div class="listHead__title">搜索式热榜</div>
        <div class="listHead__hint">15-20 条/屏 · #f0f0f0 分割线 · 点缀色随主题切换</div>
      </div>

      <section class="list" aria-label="新闻列表">
        <button v-for="item in paged" :key="item.id" class="list__item" type="button" @click="openNews(item.id)">
          <NewsCard :item="item" />
        </button>
      </section>

      <Pagination v-model:page="page" :page-size="pageSize" :total="total" />
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

.listHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
}

.listHead__title {
  font-weight: 900;
  color: var(--text);
  font-size: 16px;
}

.listHead__hint {
  color: var(--muted);
  font-size: 12px;
}

.list {
  border: 1px solid var(--border);
  background: var(--surface);
}

.list__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
}

.list__item + .list__item {
  border-top: 1px solid var(--border);
}

.list__item:hover {
  background: var(--surfaceHover);
}
</style>

