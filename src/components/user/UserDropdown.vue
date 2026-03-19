<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const initials = computed(() => auth.user?.name?.slice(0, 1) ?? '?')

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocPointerDown(e: PointerEvent) {
  const el = rootEl.value
  if (!el) return
  if (e.target instanceof Node && !el.contains(e.target)) close()
}

async function goProfile() {
  close()
  await router.push({ name: 'profile' })
}

function doLogout() {
  auth.logout()
  close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointerDown)
})
</script>

<template>
  <div ref="rootEl" class="ud">
    <button class="ud__trigger" type="button" @click="toggle" :aria-expanded="open" aria-haspopup="menu">
      <span class="ud__avatar" aria-hidden="true">
        <span class="ud__initial">{{ initials }}</span>
      </span>
      <span class="ud__chev" aria-hidden="true"></span>
    </button>

    <div v-if="open" class="ud__menu" role="menu" aria-label="个人菜单">
      <div class="ud__top">
        <div class="ud__name">{{ auth.user?.name }}</div>
        <div class="ud__sub">@{{ auth.user?.handle }} · {{ auth.user?.email }}</div>
      </div>

      <button class="ud__item" type="button" role="menuitem" @click="goProfile">个人中心</button>
      <button class="ud__item ud__danger" type="button" role="menuitem" @click="doLogout">退出登录</button>
    </div>
  </div>
</template>

<style scoped>
.ud {
  position: relative;
  transition: all var(--t);
}

.ud__trigger {
  appearance: none;
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px;
  border-radius: calc(var(--radius) + 6px);
  transition: all var(--t);
}

.ud__trigger:hover {
  background: color-mix(in srgb, var(--surface) 55%, transparent);
}

.ud__avatar {
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
  box-shadow: var(--shadow-2);
  transition: all var(--t);
}

.theme-negative .ud__avatar {
  border-radius: 10px;
}

.ud__initial {
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--text);
  font-size: 14px;
  transition: all var(--t);
}

.ud__chev {
  width: 10px;
  height: 10px;
  border-right: 2px solid color-mix(in srgb, var(--muted) 70%, transparent);
  border-bottom: 2px solid color-mix(in srgb, var(--muted) 70%, transparent);
  transform: rotate(45deg);
  margin-right: 4px;
  transition: all var(--t);
}

.ud__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  width: 280px;
  border-radius: var(--radius-card);
  border: var(--stroke) solid var(--border);
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  transition: all var(--t);
}

.ud__top {
  padding: 14px 14px 12px;
  border-bottom: var(--stroke) solid color-mix(in srgb, var(--border) 70%, transparent);
  transition: all var(--t);
}

.ud__name {
  font-weight: 820;
  letter-spacing: -0.01em;
  transition: all var(--t);
}

.ud__sub {
  margin-top: 4px;
  font-size: 12px;
  color: var(--muted);
  transition: all var(--t);
  word-break: break-all;
}

.ud__item {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--text);
  font-weight: 720;
  transition: all var(--t);
}

.ud__item:hover {
  background: color-mix(in srgb, var(--surface-2) 70%, transparent);
}

.ud__danger {
  color: color-mix(in srgb, var(--danger) 92%, var(--text));
}
</style>
