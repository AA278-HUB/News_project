<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Comment } from '../../data/comments'
import { Heart, CornerDownRight } from 'lucide-vue-next'

const props = defineProps<{
  comment: Comment
  floor: number
}>()

const emit = defineEmits<{
  (e: 'like', id: string): void
  (e: 'reply', id: string, content: string): void
  (e: 'like-reply', commentId: string, replyId: string): void
}>()

const replying = ref(false)
const replyText = ref('')

const floorLabel = computed(() => `#${props.floor}`)

function toggleReply() {
  replying.value = !replying.value
}

function submitReply() {
  const text = replyText.value.trim()
  if (!text) return
  emit('reply', props.comment.id, text)
  replyText.value = ''
  replying.value = false
}
</script>

<template>
  <div class="ci">
    <div class="ci__avatar" aria-hidden="true">{{ comment.user.avatarText }}</div>

    <div class="ci__body">
      <div class="ci__top">
        <div class="ci__name">
          {{ comment.user.name }}
          <span class="ci__floor">{{ floorLabel }}</span>
        </div>
        <div class="ci__time">{{ comment.createdAt }}</div>
      </div>

      <div class="ci__content">{{ comment.content }}</div>

      <div class="ci__actions">
        <button class="ci__btn" type="button" @click="emit('like', comment.id)">
          <Heart :size="14" />
          <span>点赞</span>
          <span class="ci__count">{{ comment.likes }}</span>
        </button>
        <button class="ci__btn" type="button" @click="toggleReply">
          <CornerDownRight :size="14" />
          <span>回复</span>
        </button>
      </div>

      <div v-if="replying" class="ci__replyBox">
        <input v-model="replyText" class="ci__input" placeholder="写下回复…" />
        <button class="ci__submit" type="button" @click="submitReply">发送</button>
      </div>

      <div v-if="comment.replies.length" class="ci__replies">
        <div v-for="r in comment.replies" :key="r.id" class="ci__reply">
          <div class="ci__avatar ci__avatar--sm" aria-hidden="true">{{ r.user.avatarText }}</div>
          <div class="ci__replyBody">
            <div class="ci__replyTop">
              <div class="ci__name">{{ r.user.name }}</div>
              <div class="ci__time">{{ r.createdAt }}</div>
            </div>
            <div class="ci__content">{{ r.content }}</div>
            <div class="ci__actions">
              <button class="ci__btn" type="button" @click="emit('like-reply', comment.id, r.id)">
                <Heart :size="14" />
                <span>点赞</span>
                <span class="ci__count">{{ r.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ci {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.ci__avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--mutedBg);
  display: grid;
  place-items: center;
  color: var(--text);
  font-weight: 800;
  font-size: 12px;
}

.ci__avatar--sm {
  width: 26px;
  height: 26px;
  font-weight: 750;
}

.ci__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.ci__name {
  font-weight: 750;
  color: var(--text);
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  font-size: 13px;
}

.ci__floor {
  color: var(--muted);
  font-weight: 650;
  font-size: 12px;
}

.ci__time {
  color: var(--muted);
  font-size: 12px;
  white-space: nowrap;
}

.ci__content {
  margin-top: 6px;
  color: var(--text);
  font-size: 14px;
  line-height: 1.55;
  white-space: pre-wrap;
}

.ci__actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  color: var(--muted);
}

.ci__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text);
  font-size: 12px;
}

.ci__btn:hover {
  border-color: var(--accent);
}

.ci__count {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.ci__replyBox {
  margin-top: 8px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.ci__input {
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #fff;
  color: var(--text);
}

.ci__submit {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid var(--accent);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  font-weight: 700;
}

.ci__replies {
  margin-top: 10px;
  display: grid;
  gap: 8px;
  padding-left: 10px;
  border-left: 2px solid var(--mutedBg);
}

.ci__reply {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
}

.ci__replyTop {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
</style>

