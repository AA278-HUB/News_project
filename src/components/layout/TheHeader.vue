<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useAuthStore } from '../../stores/auth'
import UserDropdown from '../user/UserDropdown.vue'
import { CloudRain, Sun } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { mood, setMood } = useTheme()
const auth = useAuthStore()

const isHome = computed(() => route.name === 'home')

function pickDaily(texts: string[]) {
  const key = new Date().toISOString().slice(0, 10)
  let h = 0
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return texts[h % texts.length] ?? ''
}

const doodleIcon = computed(() => (mood.value === 'positive' ? Sun : CloudRain))
const slogan = computed(() =>
  mood.value === 'positive' ? '今天也是阳光明媚的一天！' : '深渊在凝视着你...',
)
const dailyTail = computed(() =>
  pickDaily([
    '新闻先看事实，再看观点。',
    '1 分钟扫榜，3 分钟深读。',
    '热度会变，信息结构更重要。',
    '今天也做一个慢判断的人。',
    '别急着站队，先把样本看够。',
  ]),
)

async function goHome() {
  await router.push({ name: 'home' })
}
</script>

<template>
  <header class="topbar">
    <div class="topbar__inner">
      <button class="brand" type="button" @click="goHome" :aria-current="isHome ? 'page' : undefined">
        <span class="doodle" :class="{ 'is-negative': mood === 'negative' }" aria-hidden="true">
          <component :is="doodleIcon" :size="18" class="doodle__icon" :class="{ 'is-sun': mood === 'positive' }" />
        </span>
        <span class="brand__text">
          <span class="brand__title">News Atmosphere</span>
          <span class="brand__subtitle">社区型信息密度示例</span>
          <span class="brand__doodle" :class="{ 'is-negative': mood === 'negative' }">
            {{ slogan }} {{ dailyTail }}
          </span>
        </span>
      </button>

      <div class="right">
        <div class="mood-switch" role="group" aria-label="主题切换">
          <button
            class="mood-switch__btn"
            :class="{ 'is-active': mood === 'positive' }"
            type="button"
            @click="setMood('positive')"
          >
            积极
          </button>
          <button
            class="mood-switch__btn"
            :class="{ 'is-active': mood === 'negative' }"
            type="button"
            @click="setMood('negative')"
          >
            消极
          </button>
        </div>

        <div class="divider" aria-hidden="true"></div>

        <UserDropdown v-if="auth.isLoggedIn" />
        <button v-else class="login" type="button" @click="auth.login()">登录</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.topbar__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
}

.brand:hover {
  background: var(--surfaceHover);
}

.brand__text {
  display: grid;
  gap: 2px;
  text-align: left;
}

.brand__title {
  font-weight: 800;
  line-height: 1.2;
  color: var(--text);
}

.brand__subtitle {
  font-size: 12px;
  color: var(--muted);
}

.brand__doodle {
  margin-top: 2px;
  font-size: 12px;
  color: var(--muted);
  font-family:
    ui-rounded,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial;
}

.doodle {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: #fff;
  display: grid;
  place-items: center;
}

.doodle__icon {
  color: var(--accent);
}

.doodle__icon.is-sun {
  animation: spinSun 5.5s linear infinite;
}

.doodle.is-negative {
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--danger) 24%, transparent),
    0 0 10px color-mix(in srgb, var(--danger) 26%, transparent);
}

.brand__doodle.is-negative {
  color: var(--danger);
  text-shadow: 0 0 6px color-mix(in srgb, var(--danger) 35%, transparent);
  animation: neonFlicker 1.25s linear infinite;
}

.right {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.divider {
  width: 1px;
  height: 28px;
  background: var(--border);
}

/* Segmented mood switch */
.mood-switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 140px;
  padding: 2px;
  border-radius: 6px;
  background: var(--mutedBg);
  border: 1px solid var(--border);
  overflow: hidden;
}

.mood-switch__btn {
  position: relative;
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  padding: 6px 10px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
}

.mood-switch__btn:hover {
  color: var(--text);
}

.mood-switch__btn.is-active {
  color: var(--text);
  background: var(--surface);
  border-color: var(--accent);
}

.login {
  border: 1px solid var(--border);
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 750;
  color: var(--text);
  background: var(--surface);
  white-space: nowrap;
}

.login:hover {
  border-color: var(--accent);
}

@media (max-width: 520px) {
  .topbar__inner {
    padding: 10px 10px;
  }

  .divider {
    display: none;
  }
}

@keyframes spinSun {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes neonFlicker {
  0%,
  18%,
  22%,
  62%,
  64%,
  100% {
    opacity: 1;
  }
  20%,
  63% {
    opacity: 0.62;
  }
}
</style>

