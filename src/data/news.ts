export type Category = '科技' | '社会' | '财经' | '国际' | '体育' | '文化'

export type NewsItem = {
  id: string
  category: Category
  title: string
  excerpt: string
  content: string
  publishedAt: string
  author: {
    name: string
    handle: string
  }
  scores: {
    heat: number
    positivePct: number
    negativePct: number
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
    content:
      '在端侧推理成为常态后，产品体验的“瓶颈”正在从模型能力转向工程细节：启动时间、能耗与热管理、离线缓存策略、以及隐私边界的默认设计。\n\n业内普遍认为，轻量推理不是“削弱智能”，而是让系统更专注于高频任务，把复杂推理留给真正需要的场景。\n\n与此同时，开发者工具链也在进化：更好的量化策略、更透明的性能指标，让端侧 AI 从黑盒变成可调优的工程系统。',
    publishedAt: '2026-03-19',
    author: { name: '林栀', handle: 'linzhi' },
    scores: { heat: 92, positivePct: 68, negativePct: 12 },
    cover: { hueA: 138, hueB: 200 },
  },
  {
    id: 'n2',
    category: '财经',
    title: '市场回暖，但“高确定性”资产仍是主线',
    excerpt:
      '在波动中，资金更愿意为可验证的现金流付费。分析人士提示：别只看涨幅，更要看结构与韧性。',
    content:
      '回暖并不等同于风险消失。当前市场的关键词更接近“选择性乐观”：对盈利可见、现金流稳定的标的给出更高溢价。\n\n机构提示投资者避免追逐短期情绪，重点关注经营质量与政策预期之间的匹配度；同时留意资金在不同行业之间的再平衡路径。\n\n在配置策略上，“分层”比“押注”更重要：用确定性承接波动，用节奏控制回撤。',
    publishedAt: '2026-03-18',
    author: { name: '周放', handle: 'zhoufang' },
    scores: { heat: 76, positivePct: 41, negativePct: 29 },
    cover: { hueA: 40, hueB: 120 },
  },
  {
    id: 'n3',
    category: '社会',
    title: '城市夜跑回归：照明升级与安全联动成为关键',
    excerpt:
      '从“能跑”到“好跑”，人们对夜间公共空间的期待变得更细腻：光、路面、救援与社区共治缺一不可。',
    content:
      '夜跑人群的回归，把“可达性”与“安全感”推到同一张清单里：照明亮度、盲区、路面材质、以及紧急响应的联动机制。\n\n部分城市开始用更细颗粒度的方式治理夜间空间：在高频路线增设补光点位，利用智能摄像与巡逻协同，提供更清晰的安全反馈。\n\n社区共治同样重要：志愿者与物业、街道协作，才能让“安心运动”成为日常。',
    publishedAt: '2026-03-17',
    author: { name: '许淮', handle: 'xuhuai' },
    scores: { heat: 63, positivePct: 55, negativePct: 18 },
    cover: { hueA: 170, hueB: 220 },
  },
  {
    id: 'n4',
    category: '国际',
    title: '地缘风险加剧：供应链正在重新定义“距离”',
    excerpt:
      '企业把“最短路径”换成“最稳路径”。跨区域备份、关键零部件本地化与透明度成为新竞争力。',
    content:
      '供应链策略从“成本最优”转向“韧性最优”。企业更关注关键节点的可替代性与透明度，把单点依赖拆解成多路径备份。\n\n这带来两个直接变化：一是关键零部件的本地化与近岸化加速；二是对供应链可视化系统的投入增加，以便在风险出现前先完成预警。\n\n在新的语境下，“距离”不再是地理概念，而是风险与响应时间的函数。',
    publishedAt: '2026-03-16',
    author: { name: '陈诺', handle: 'chennuo' },
    scores: { heat: 88, positivePct: 22, negativePct: 54 },
    cover: { hueA: 10, hueB: 30 },
  },
  {
    id: 'n5',
    category: '体育',
    title: '新赛季数据化训练：从经验主义走向可解释',
    excerpt:
      '教练组不再只看“感觉”。可解释指标让训练更可控，也让运动员知道自己为什么进步、为什么疲惫。',
    content:
      '数据化训练并非简单“加传感器”。关键在于把指标体系做成“可解释”：让运动员理解训练负荷与恢复之间的关系。\n\n当指标被解释清楚后，训练计划更容易被执行，也更容易在反馈中迭代。许多团队开始强调“少而准”的指标组合，避免数据过载。\n\n对竞技体育而言，可解释不仅提高效率，也降低伤病风险。',
    publishedAt: '2026-03-15',
    author: { name: '唐屿', handle: 'tangyu' },
    scores: { heat: 57, positivePct: 61, negativePct: 15 },
    cover: { hueA: 210, hueB: 265 },
  },
  {
    id: 'n6',
    category: '文化',
    title: '慢阅读回潮：在碎片化时代夺回注意力',
    excerpt:
      '人们开始把阅读当作“时间的投资”。书店与社区空间用更舒展的节奏，帮助读者重新建立耐心。',
    content:
      '慢阅读的回潮，折射的是对注意力质量的再评估。许多读者不再追求“读得多”，而是更关注“读得深”。\n\n书店与社区空间也在做微创新：更舒适的座位、更明确的主题陈列、更少的噪声干扰，把阅读从消费行为变回一种生活方式。\n\n在碎片化信息洪流中，慢阅读提供了对抗焦虑的一种路径：让时间再次可感。',
    publishedAt: '2026-03-14',
    author: { name: '沈亦', handle: 'shenyi' },
    scores: { heat: 49, positivePct: 58, negativePct: 9 },
    cover: { hueA: 290, hueB: 330 },
  },
] as const

const EXTRA: NewsItem[] = Array.from({ length: 30 - NEWS.length }, (_, i) => {
  const base = NEWS[i % NEWS.length]!
  const idx = i + 7
  const heat = Math.max(12, Math.min(99, base.scores.heat - (i % 9) * 3 + (i % 4)))
  const pos = Math.max(5, Math.min(90, base.scores.positivePct + ((i * 7) % 21) - 10))
  const neg = Math.max(0, Math.min(95, 100 - pos - 10))

  return {
    ...base,
    id: `n${idx}`,
    title: `${base.title}（社区讨论版 #${idx}）`,
    excerpt: base.excerpt.slice(0, 46) + '…',
    publishedAt: `2026-03-${String(19 - (idx % 12)).padStart(2, '0')}`,
    scores: {
      heat,
      positivePct: pos,
      negativePct: neg,
    },
    author: {
      ...base.author,
      handle: `${base.author.handle}${idx}`,
    },
  }
})

export const ALL_NEWS: readonly NewsItem[] = [...NEWS, ...EXTRA]

