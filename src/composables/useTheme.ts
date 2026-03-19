import { computed, ref, watch } from 'vue'

export type ThemeMood = 'positive' | 'negative'

const STORAGE_KEY = 'news_theme_mood'

const mood = ref<ThemeMood>((localStorage.getItem(STORAGE_KEY) as ThemeMood) || 'positive')

watch(
  mood,
  (v) => {
    localStorage.setItem(STORAGE_KEY, v)
  },
  { flush: 'post' },
)

export function useTheme() {
  const themeClass = computed(() => (mood.value === 'positive' ? 'theme-positive' : 'theme-negative'))
  const label = computed(() => (mood.value === 'positive' ? '积极 (Positive)' : '消极 (Negative)'))

  function setMood(next: ThemeMood) {
    mood.value = next
  }

  function toggle() {
    mood.value = mood.value === 'positive' ? 'negative' : 'positive'
  }

  return {
    mood,
    themeClass,
    label,
    setMood,
    toggle,
  }
}

