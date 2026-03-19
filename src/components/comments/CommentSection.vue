<script setup lang="ts">
import { computed, ref } from 'vue'
import CommentItem from './CommentItem.vue'
import type { Comment } from '../../data/comments'
import { COMMENTS_BY_NEWS } from '../../data/comments'

const props = defineProps<{
  newsId: string
}>()

const local = ref<Record<string, Comment[]>>({})

const comments = computed(() => {
  const base = COMMENTS_BY_NEWS[props.newsId] ?? []
  const extra = local.value[props.newsId] ?? []
  return [...base, ...extra]
})

const newText = ref('')

function addComment() {
  const text = newText.value.trim()
  if (!text) return

  const c: Comment = {
    id: `local_${Date.now()}`,
    newsId: props.newsId,
    user: { id: 'me', name: '我', avatarText: '我' },
    content: text,
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    likes: 0,
    replies: [],
  }

  local.value[props.newsId] = [...(local.value[props.newsId] ?? []), c]
  newText.value = ''
}

function like(commentId: string) {
  const list = local.value[props.newsId] ?? []
  const idx = list.findIndex((x) => x.id === commentId)
  if (idx === -1) return
  const target = list[idx]
  if (!target) return
  const next: Comment = { ...target, likes: target.likes + 1 }
  const updated = [...list]
  updated[idx] = next
  local.value[props.newsId] = updated
}

function reply(commentId: string, content: string) {
  const list = local.value[props.newsId] ?? []
  const idx = list.findIndex((x) => x.id === commentId)
  if (idx === -1) return
  const target = list[idx]
  if (!target) return
  const next: Comment = {
    ...target,
    replies: [
      ...(target.replies ?? []),
    {
      id: `local_r_${Date.now()}`,
      user: { id: 'me', name: '我', avatarText: '我' },
      content,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      likes: 0,
    },
    ],
  }
  const updated = [...list]
  updated[idx] = next
  local.value[props.newsId] = updated
}

function likeReply(commentId: string, replyId: string) {
  const list = local.value[props.newsId] ?? []
  const idx = list.findIndex((x) => x.id === commentId)
  if (idx === -1) return
  const target = list[idx]
  if (!target) return
  const next: Comment = {
    ...target,
    replies: (target.replies ?? []).map((r) => (r.id === replyId ? { ...r, likes: r.likes + 1 } : r)),
  }
  const updated = [...list]
  updated[idx] = next
  local.value[props.newsId] = updated
}
</script>

<template>
  <section class="cs">
    <div class="cs__head">
      <div class="cs__title">评论区</div>
      <div class="cs__count">{{ comments.length }} 条</div>
    </div>

    <div class="cs__composer">
      <input v-model="newText" class="cs__input" placeholder="发一条评论（支持楼层）…" />
      <button class="cs__send" type="button" @click="addComment">发送</button>
    </div>

    <div class="cs__list">
      <CommentItem
        v-for="(c, i) in comments"
        :key="c.id"
        :comment="c"
        :floor="i + 1"
        @like="like"
        @reply="reply"
        @like-reply="likeReply"
      />
    </div>
  </section>
</template>

<style scoped>
.cs {
  display: grid;
  gap: 10px;
}

.cs__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0;
}

.cs__title {
  font-weight: 850;
  color: var(--text);
}

.cs__count {
  color: var(--muted);
  font-size: 12px;
}

.cs__composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.cs__input {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #fff;
  color: var(--text);
}

.cs__send {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid var(--accent);
  background: var(--surface);
  cursor: pointer;
  font-weight: 750;
  color: var(--text);
}

.cs__list {
  display: grid;
  gap: 8px;
}
</style>

