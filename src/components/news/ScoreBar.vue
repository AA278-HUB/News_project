<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  heat: number
  positivePct: number
  negativePct: number
}>()

const safeHeat = computed(() => Math.max(0, Math.min(100, props.heat)))
const safePositive = computed(() => Math.max(0, Math.min(100, props.positivePct)))
const safeNegative = computed(() => Math.max(0, Math.min(100, props.negativePct)))
</script>

<template>
  <div class="score" aria-label="评分">
    <div class="score__row">
      <div class="score__label">
        <span class="score__icon" aria-hidden="true">🔥</span>
        <span>热度</span>
      </div>
      <div class="score__bar" role="progressbar" :aria-valuenow="safeHeat" aria-valuemin="0" aria-valuemax="100">
        <span class="score__fill score__fill--heat" :style="{ width: `${safeHeat}%` }" />
      </div>
      <div class="score__val">{{ safeHeat }}</div>
    </div>

    <div class="score__row">
      <div class="score__label">
        <span class="score__icon" aria-hidden="true">😊</span>
        <span>积极</span>
      </div>
      <div
        class="score__bar"
        role="progressbar"
        :aria-valuenow="safePositive"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span class="score__fill score__fill--pos" :style="{ width: `${safePositive}%` }" />
      </div>
      <div class="score__val">{{ safePositive }}%</div>
    </div>

    <div class="score__row">
      <div class="score__label">
        <span class="score__icon" aria-hidden="true">😟</span>
        <span>负面</span>
      </div>
      <div
        class="score__bar"
        role="progressbar"
        :aria-valuenow="safeNegative"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span class="score__fill score__fill--neg" :style="{ width: `${safeNegative}%` }" />
      </div>
      <div class="score__val">{{ safeNegative }}%</div>
    </div>
  </div>
</template>

<style scoped>
.score {
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.score__row {
  display: grid;
  grid-template-columns: 70px 1fr 52px;
  gap: 8px;
  align-items: center;
}

.score__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
}

.score__icon {
  width: 16px;
  text-align: center;
}

.score__bar {
  height: 8px;
  background: var(--mutedBg);
  border: 1px solid var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.score__fill {
  display: block;
  height: 100%;
  border-radius: 999px;
}

.score__fill--heat {
  background: #f97316;
}

.score__fill--pos {
  background: var(--accent);
}

.score__fill--neg {
  background: var(--accent2);
}

.score__val {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
</style>

