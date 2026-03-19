export type Category = '科技' | '社会' | '财经' | '国际' | '体育' | '文化'

export type NewsItem = {
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

export const NEWS: readonly NewsItem[] = [
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

