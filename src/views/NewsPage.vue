<script setup lang="ts">
import { computed, ref } from 'vue'

type Mood = 'positive' | 'negative'
type Category = '科技' | '社会' | '财经' | '国际' | '体育' | '文化'

type NewsItem = {
  id: string
  category: Category
  title: string
  excerpt: string
  publishedAt: string
  author: {
    name: string
    handle: string
  }
  cover: {
    hueA: number
    hueB: number
  }
}

const NEWS: readonly NewsItem[] = [
  {
    id: 'n1',
    category: '科技',
    title: '本地 AI 助手进入“轻量推理”时代：更快，也更懂你',
    excerpt:
      '新一代端侧模型在能耗与体验之间找到平衡点：离线可用、响应更快，并把隐私保护从口号变成默认。',
    publishedAt: '2026-03-19',
    author: { name: '林栀', handle: 'linzhi' },
    cover: { hueA: 138, hueB: 200 },
  },
  {
    id: 'n2',
    category: '财经',
    title: '市场回暖，但“高确定性”资产仍是主线',
    excerpt:
      '在波动中，资金更愿意为可验证的现金流付费。分析人士提示：别只看涨幅，更要看结构与韧性。',
    publishedAt: '2026-03-18',
    author: { name: '周放', handle: 'zhoufang' },
    cover: { hueA: 40, hueB: 120 },
  },
  {
    id: 'n3',
    category: '社会',
    title: '城市夜跑回归：照明升级与安全联动成为关键',
    excerpt:
      '从“能跑”到“好跑”，人们对夜间公共空间的期待变得更细腻：光、路面、救援与社区共治缺一不可。',
    publishedAt: '2026-03-17',
    author: { name: '许淮', handle: 'xuhuai' },
    cover: { hueA: 170, hueB: 220 },
  },
  {
    id: 'n4',
    category: '国际',
    title: '地缘风险加剧：供应链正在重新定义“距离”',
    excerpt:
      '企业把“最短路径”换成“最稳路径”。跨区域备份、关键零部件本地化与透明度成为新竞争力。',
    publishedAt: '2026-03-16',
    author: { name: '陈诺', handle: 'chennuo' },
    cover: { hueA: 10, hueB: 30 },
  },
  {
    id: 'n5',
    category: '体育',
    title: '新赛季数据化训练：从经验主义走向可解释',
    excerpt:
      '教练组不再只看“感觉”。可解释指标让训练更可控，也让运动员知道自己为什么进步、为什么疲惫。',
    publishedAt: '2026-03-15',
    author: { name: '唐屿', handle: 'tangyu' },
    cover: { hueA: 210, hueB: 265 },
  },
  {
    id: 'n6',
    category: '文化',
    title: '慢阅读回潮：在碎片化时代夺回注意力',
    excerpt:
      '人们开始把阅读当作“时间的投资”。书店与社区空间用更舒展的节奏，帮助读者重新建立耐心。',
    publishedAt: '2026-03-14',
    author: { name: '沈亦', handle: 'shenyi' },
    cover: { hueA: 290, hueB: 330 },
  },
] as const

const mood = ref<Mood>('positive')

const rootThemeClass = computed(() =>
  mood.value === 'positive' ? 'theme-positive' : 'theme-negative',
)

function setMood(next: Mood) {
  mood.value = next
}

const moodLabel = computed(() => (mood.value === 'positive' ? '积极 (Positive)' : '消极 (Negative)'))
</script>

<template>
  <div class="page" :class="rootThemeClass">
    <header class="topbar">
      <div class="topbar__inner">
        <div class="brand">
          <div class="brand__mark" aria-hidden="true"></div>
          <div class="brand__text">
            <div class="brand__title">News Atmosphere</div>
            <div class="brand__subtitle">情绪化双主题新闻页</div>
          </div>
        </div>

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
      </div>
    </header>

    <main class="content">
      <section class="hero" aria-label="页面导语">
        <div class="hero__bg" aria-hidden="true"></div>
        <div class="hero__inner">
          <div class="hero__kicker">Today’s Mood</div>
          <h1 class="hero__title">{{ moodLabel }}</h1>
          <p class="hero__desc">
            同一组新闻，截然不同的氛围表达：通过 CSS 变量驱动的主题系统，让色彩、阴影、边角与警示色在
            0.5s 里完成电影般的转场。
          </p>
        </div>
      </section>

      <section class="grid" aria-label="新闻列表">
        <article v-for="item in NEWS" :key="item.id" class="card">
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
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --t: 0.5s var(--ease);

  /* Layout */
  min-height: 100vh;
  color: var(--text);
  background: var(--bg);
  transition: all var(--t);
}

/* ------------------------------
   Theme tokens (CSS variables)
-------------------------------- */
.theme-positive {
  --bg: radial-gradient(1200px 700px at 18% 18%, rgba(125, 255, 190, 0.18), transparent 55%),
    radial-gradient(1000px 600px at 85% 20%, rgba(95, 200, 255, 0.18), transparent 55%),
    linear-gradient(180deg, #f6fffb 0%, #f6fbff 45%, #ffffff 100%);
  --surface: rgba(255, 255, 255, 0.78);
  --surface-2: rgba(255, 255, 255, 0.55);
  --border: rgba(25, 65, 55, 0.12);
  --shadow: 0 18px 60px rgba(15, 60, 45, 0.12);
  --shadow-2: 0 10px 28px rgba(15, 60, 45, 0.12);
  --text: rgba(15, 30, 25, 0.92);
  --muted: rgba(15, 30, 25, 0.62);
  --muted-2: rgba(15, 30, 25, 0.45);
  --primary: #11b981;
  --primary-2: #3aa6ff;
  --ring: rgba(17, 185, 129, 0.35);
  --danger: #ff4d6d;

  --radius: 20px;
  --radius-card: 22px;
  --radius-media: 18px;
  --stroke: 1px;
  --cover-filter: saturate(1.1) contrast(1.05);
}

.theme-negative {
  --bg: radial-gradient(900px 520px at 18% 10%, rgba(255, 75, 75, 0.08), transparent 55%),
    radial-gradient(800px 520px at 88% 18%, rgba(255, 160, 45, 0.06), transparent 58%),
    linear-gradient(180deg, #0a0c10 0%, #0b0f16 55%, #07080b 100%);
  --surface: rgba(15, 18, 26, 0.72);
  --surface-2: rgba(10, 12, 16, 0.62);
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 22px 70px rgba(0, 0, 0, 0.55);
  --shadow-2: 0 12px 34px rgba(0, 0, 0, 0.6);
  --text: rgba(245, 247, 255, 0.92);
  --muted: rgba(245, 247, 255, 0.62);
  --muted-2: rgba(245, 247, 255, 0.42);
  --primary: #ff5a3d;
  --primary-2: #ffb020;
  --ring: rgba(255, 90, 61, 0.28);
  --danger: #ff3b3b;

  --radius: 10px;
  --radius-card: 14px;
  --radius-media: 8px;
  --stroke: 1px;
  --cover-filter: grayscale(0.85) contrast(1.15) saturate(0.9);
}

/* ------------------------------
   Topbar
-------------------------------- */
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
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
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

.brand__title {
  font-weight: 760;
  letter-spacing: 0.2px;
  line-height: 1.15;
}

.brand__subtitle {
  margin-top: 3px;
  font-size: 12px;
  color: var(--muted);
  transition: all var(--t);
}

/* ------------------------------
   Segmented mood switch
-------------------------------- */
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

/* ------------------------------
   Page content + hero
-------------------------------- */
.content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 22px 18px 64px;
  transition: all var(--t);
}

.hero {
  position: relative;
  border-radius: var(--radius-card);
  border: var(--stroke) solid var(--border);
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--t);
}

.hero__bg {
  position: absolute;
  inset: -2px;
  background:
    radial-gradient(700px 320px at 12% 25%, color-mix(in srgb, var(--primary) 26%, transparent), transparent 60%),
    radial-gradient(520px 280px at 70% 20%, color-mix(in srgb, var(--primary-2) 22%, transparent), transparent 62%),
    linear-gradient(180deg, transparent, color-mix(in srgb, var(--surface-2) 65%, transparent));
  opacity: 1;
  transition: all var(--t);
}

.theme-negative .hero__bg {
  background:
    radial-gradient(600px 300px at 18% 22%, rgba(255, 70, 70, 0.16), transparent 62%),
    radial-gradient(560px 280px at 72% 22%, rgba(255, 180, 40, 0.1), transparent 62%),
    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.25));
}

.hero__inner {
  position: relative;
  padding: 26px 22px;
  transition: all var(--t);
}

.hero__kicker {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  transition: all var(--t);
}

.hero__title {
  margin: 10px 0 10px;
  font-size: clamp(26px, 3.2vw, 40px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 860;
  transition: all var(--t);
}

.hero__desc {
  margin: 0;
  max-width: 72ch;
  color: var(--muted);
  line-height: 1.7;
  transition: all var(--t);
}

/* ------------------------------
   Grid
-------------------------------- */
.grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;
  transition: all var(--t);
}

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

/* ------------------------------
   Responsive
-------------------------------- */
@media (min-width: 760px) {
  .grid {
    gap: 16px;
  }

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
  .topbar__inner {
    padding: 12px 14px;
  }

  .mood-switch {
    width: 210px;
  }

  .card {
    grid-template-columns: 1fr;
  }
}
</style>
