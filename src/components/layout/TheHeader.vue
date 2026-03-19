<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useAuthStore } from '../../stores/auth'
import UserDropdown from '../user/UserDropdown.vue'

const route = useRoute()
const router = useRouter()
const { mood, setMood } = useTheme()
const auth = useAuthStore()

const isHome = computed(() => route.name === 'home')

async function goHome() {
  await router.push({ name: 'home' })
}
</script>

<template>
  <header class="topbar">
    <div class="topbar__inner">
      <button class="brand" type="button" @click="goHome" :aria-current="isHome ? 'page' : undefined">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__text">
          <span class="brand__title">News Atmosphere</span>
          <span class="brand__subtitle">带登录态 · 路由 · 双主题</span>
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
            Positive
          </button>
          <button
            class="mood-switch__btn"
            :class="{ 'is-active': mood === 'negative' }"
            type="button"
            @click="setMood('negative')"
          >
            Negative
          </button>
          <span class="mood-switch__glow" aria-hidden="true"></span>
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
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: color-mix(in srgb, var(--surface) 74%, transparent);
  border-bottom: var(--stroke) solid var(--border);
  transition: all var(--t);
}

.topbar__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: all var(--t);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  user-select: none;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: calc(var(--radius) + 6px);
  transition: all var(--t);
}

.brand:hover {
  background: color-mix(in srgb, var(--surface) 55%, transparent);
}

.brand__mark {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background:
    radial-gradient(18px 18px at 30% 35%, color-mix(in srgb, var(--primary) 70%, #ffffff), transparent 68%),
    radial-gradient(22px 20px at 70% 65%, color-mix(in srgb, var(--primary-2) 72%, #ffffff), transparent 66%),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface) 70%, transparent),
      color-mix(in srgb, var(--surface-2) 65%, transparent)
    );
  border: var(--stroke) solid var(--border);
  box-shadow: var(--shadow-2);
  transition: all var(--t);
}

.brand__text {
  display: grid;
  gap: 2px;
  text-align: left;
  transition: all var(--t);
}

.brand__title {
  font-weight: 760;
  letter-spacing: 0.2px;
  line-height: 1.15;
  color: var(--text);
  transition: all var(--t);
}

.brand__subtitle {
  font-size: 12px;
  color: var(--muted);
  transition: all var(--t);
}

.right {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all var(--t);
}

.divider {
  width: 1px;
  height: 28px;
  background: color-mix(in srgb, var(--border) 85%, transparent);
  transition: all var(--t);
}

/* Segmented mood switch */
.mood-switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 260px;
  padding: 6px;
  border-radius: calc(var(--radius) + 6px);
  background: color-mix(in srgb, var(--surface) 68%, transparent);
  border: var(--stroke) solid var(--border);
  box-shadow: var(--shadow-2);
  transition: all var(--t);
  overflow: hidden;
}

.mood-switch__btn {
  position: relative;
  z-index: 2;
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 10px 12px;
  border-radius: var(--radius);
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: all var(--t);
}

.mood-switch__btn:hover {
  color: var(--text);
}

.mood-switch__btn.is-active {
  color: var(--text);
}

.mood-switch__glow {
  position: absolute;
  inset: 6px;
  width: calc(50% - 6px);
  border-radius: var(--radius);
  background:
    radial-gradient(60px 60px at 30% 35%, color-mix(in srgb, var(--primary) 45%, transparent), transparent 70%),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface) 25%, transparent),
      color-mix(in srgb, var(--surface-2) 35%, transparent)
    );
  border: var(--stroke) solid color-mix(in srgb, var(--border) 65%, transparent);
  box-shadow: 0 18px 55px var(--ring);
  transform: translateX(0%);
  transition: all var(--t);
  pointer-events: none;
}

.theme-negative .mood-switch__glow {
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.55);
}

.mood-switch:has(.mood-switch__btn:last-child.is-active) .mood-switch__glow {
  transform: translateX(100%);
}

.login {
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

.login:hover {
  transform: translateY(-1px);
  box-shadow: 0 24px 70px color-mix(in srgb, var(--ring) 42%, transparent);
}

@media (max-width: 520px) {
  .topbar__inner {
    padding: 12px 14px;
  }

  .mood-switch {
    width: 210px;
  }

  .divider {
    display: none;
  }
}
</style>

