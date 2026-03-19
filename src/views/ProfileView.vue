<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const title = computed(() => (auth.isLoggedIn ? '个人信息中心' : '尚未登录'))
</script>

<template>
  <main class="content">
    <section class="panel">
      <div class="panel__bg" aria-hidden="true"></div>

      <div class="panel__inner">
        <div class="kicker">Profile</div>
        <h1 class="title">{{ title }}</h1>

        <div v-if="auth.isLoggedIn" class="card">
          <div class="row">
            <div class="label">姓名</div>
            <div class="value">{{ auth.user?.name }}</div>
          </div>
          <div class="row">
            <div class="label">账号</div>
            <div class="value">@{{ auth.user?.handle }}</div>
          </div>
          <div class="row">
            <div class="label">邮箱</div>
            <div class="value">{{ auth.user?.email }}</div>
          </div>
          <div class="actions">
            <button class="btn btn--ghost" type="button" @click="auth.logout()">退出登录</button>
          </div>
        </div>

        <div v-else class="empty">
          <p class="empty__text">你可以回到首页右上角点击“登录”，我们用 Pinia 模拟了一个最小登录态。</p>
        </div>
      </div>
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

.panel {
  position: relative;
  border-radius: var(--radius-card);
  border: var(--stroke) solid var(--border);
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--t);
}

.panel__bg {
  position: absolute;
  inset: -2px;
  background:
    radial-gradient(700px 320px at 10% 25%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 60%),
    radial-gradient(520px 280px at 76% 18%, color-mix(in srgb, var(--primary-2) 18%, transparent), transparent 62%),
    linear-gradient(180deg, transparent, color-mix(in srgb, var(--surface-2) 65%, transparent));
  transition: all var(--t);
}

.theme-negative .panel__bg {
  background:
    radial-gradient(600px 300px at 18% 22%, rgba(255, 70, 70, 0.14), transparent 62%),
    radial-gradient(560px 280px at 72% 22%, rgba(255, 180, 40, 0.08), transparent 62%),
    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.25));
}

.panel__inner {
  position: relative;
  padding: 26px 22px;
  transition: all var(--t);
}

.kicker {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  transition: all var(--t);
}

.title {
  margin: 10px 0 16px;
  font-size: clamp(22px, 2.8vw, 34px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 860;
  transition: all var(--t);
}

.card {
  border-radius: calc(var(--radius-card) - 4px);
  border: var(--stroke) solid color-mix(in srgb, var(--border) 80%, transparent);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  box-shadow: var(--shadow-2);
  padding: 14px 14px 10px;
  display: grid;
  gap: 10px;
  transition: all var(--t);
}

.row {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px 10px;
  border-radius: calc(var(--radius) - 2px);
  background: color-mix(in srgb, var(--surface-2) 65%, transparent);
  transition: all var(--t);
}

.label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 760;
  transition: all var(--t);
}

.value {
  color: var(--text);
  font-weight: 760;
  transition: all var(--t);
  word-break: break-all;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 6px 2px 2px;
  transition: all var(--t);
}

.btn {
  border: 0;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: calc(var(--radius) - 2px);
  font-weight: 780;
  letter-spacing: 0.2px;
  color: var(--text);
  transition: all var(--t);
  white-space: nowrap;
}

.btn--ghost {
  background: transparent;
  border: var(--stroke) solid color-mix(in srgb, var(--border) 85%, transparent);
}

.btn--ghost:hover {
  background: color-mix(in srgb, var(--surface-2) 70%, transparent);
}

.empty {
  border-radius: calc(var(--radius) - 2px);
  border: var(--stroke) dashed color-mix(in srgb, var(--border) 85%, transparent);
  padding: 14px;
  color: var(--muted);
  transition: all var(--t);
}

.empty__text {
  margin: 0;
  line-height: 1.7;
}
</style>

