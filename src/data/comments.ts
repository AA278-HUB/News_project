export type CommentUser = {
  id: string
  name: string
  avatarText: string
}

export type Comment = {
  id: string
  newsId: string
  user: CommentUser
  content: string
  createdAt: string
  likes: number
  replies: Array<{
    id: string
    user: CommentUser
    content: string
    createdAt: string
    likes: number
  }>
}

const U = (id: string, name: string): CommentUser => ({ id, name, avatarText: name.slice(0, 1) })

export const COMMENTS_BY_NEWS: Record<string, Comment[]> = {
  n1: [
    {
      id: 'c1',
      newsId: 'n1',
      user: U('u2', '阿澈'),
      content: '端侧模型这波真的有意义：隐私 + 延迟都能落地，关键还是要把体验做“可解释”。',
      createdAt: '2026-03-19 09:10',
      likes: 23,
      replies: [
        {
          id: 'c1r1',
          user: U('u3', '小雨'),
          content: '同意，很多产品的问题不是模型不够强，而是工程细节太糙。',
          createdAt: '2026-03-19 09:24',
          likes: 7,
        },
      ],
    },
    {
      id: 'c2',
      newsId: 'n1',
      user: U('u4', 'Rex'),
      content: '“轻量推理不是削弱智能”这句总结很到位。希望多给一些具体指标口径。',
      createdAt: '2026-03-19 10:02',
      likes: 11,
      replies: [],
    },
  ],
  n4: [
    {
      id: 'c3',
      newsId: 'n4',
      user: U('u5', '方舟'),
      content: '供应链韧性是对的，但现实是成本上升谁来买单？最后还是消费者。',
      createdAt: '2026-03-16 13:18',
      likes: 35,
      replies: [
        {
          id: 'c3r1',
          user: U('u6', 'Nora'),
          content: '短期会贵，但黑天鹅一次就够把账算清楚了。',
          createdAt: '2026-03-16 13:40',
          likes: 16,
        },
      ],
    },
  ],
}

