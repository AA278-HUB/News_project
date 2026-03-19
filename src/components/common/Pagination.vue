<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  page: number
  pageSize: number
  total: number
  maxButtons?: number
}>()

const emit = defineEmits<{
  (e: 'update:page', next: number): void
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const current = computed(() => Math.min(Math.max(1, props.page), totalPages.value))
const maxButtons = computed(() => Math.max(5, props.maxButtons ?? 7))

const range = computed(() => {
  const pages: Array<number | '...'> = []
  const tp = totalPages.value
  const c = current.value
  const btn = maxButtons.value

  if (tp <= btn) {
    for (let i = 1; i <= tp; i += 1) pages.push(i)
    return pages
  }

  const side = Math.floor((btn - 3) / 2)
  let start = Math.max(2, c - side)
  let end = Math.min(tp - 1, c + side)

  const leftGap = start > 2
  const rightGap = end < tp - 1

  if (!leftGap) end = Math.min(tp - 1, start + (btn - 3))
  if (!rightGap) start = Math.max(2, end - (btn - 3))

  pages.push(1)
  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i += 1) pages.push(i)
  if (end < tp - 1) pages.push('...')
  pages.push(tp)
  return pages
})

function go(next: number) {
  const n = Math.min(Math.max(1, next), totalPages.value)
  if (n === current.value) return
  emit('update:page', n)
}
</script>

<template>
  <nav class="pg" aria-label="分页">
    <div class="pg__nums" aria-label="页码">
      <button class="pg__icon" type="button" :disabled="current <= 1" @click="go(current - 1)" aria-label="上一页">
        <ChevronLeft :size="16" />
      </button>

      <template v-for="(p, idx) in range" :key="`${p}-${idx}`">
        <span v-if="p === '...'" class="pg__dots" aria-hidden="true">…</span>
        <button
          v-else
          class="pg__num"
          type="button"
          :class="{ 'is-active': p === current }"
          @click="go(p)"
          :aria-current="p === current ? 'page' : undefined"
        >
          {{ p }}
        </button>
      </template>

      <button
        class="pg__icon"
        type="button"
        :disabled="current >= totalPages"
        @click="go(current + 1)"
        aria-label="下一页"
      >
        <ChevronRight :size="16" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pg {
  display: flex;
  justify-content: center;
  padding: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.pg__nums {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.pg__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  border-radius: 6px;
  cursor: pointer;
}

.pg__icon:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pg__num {
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  border-radius: 6px;
  cursor: pointer;
  font-variant-numeric: tabular-nums;
}

.pg__num.is-active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 14%, transparent);
}

.pg__dots {
  display: inline-flex;
  align-items: center;
  color: var(--muted);
  padding: 0 6px;
}
</style>

