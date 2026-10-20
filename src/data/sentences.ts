import type { SentenceTemplate } from '../types'

/**
 * 句型模板库
 *
 * en/zh 中 {slotName} 为替换槽位，渲染时用 slots[slotName] 中的词替换。
 * 渲染规则：
 *   - 当前学习的词高亮显示
 *   - slots 中每个词轮流替换，生成多个变体句
 *   - 无 slots 的句子直接展示
 */
export const sentences: Record<string, SentenceTemplate> = {

  // ── Pre-Primer ────────────────────────────────────────────────────────────

  'i-see-a-color-fruit': {
    id: 'i-see-a-color-fruit',
    en: 'I see a {color} {fruit}.',
    zh: '我看到一个{color}{fruit}。',
    slots: {
      color: ['red', 'blue', 'yellow', 'green'],
      fruit: ['apple', 'banana'],
    },
    level: 'pre-primer',
  },

  'i-see-it': {
    id: 'i-see-it',
    en: 'I see it.',
    zh: '我看到它了。',
    level: 'pre-primer',
  },

  'it-is-big': {
    id: 'it-is-big',
    en: 'It is {size}.',
    zh: '它{size}。',
    slots: {
      size: ['big', 'little'],
    },
    level: 'pre-primer',
  },

  'look-at-the-color-animal': {
    id: 'look-at-the-color-animal',
    en: 'Look at the {color} {animal}.',
    zh: '看那只{color}{animal}。',
    slots: {
      color: ['red', 'blue', 'yellow'],
      animal: ['dog', 'cat', 'bird'],
    },
    level: 'pre-primer',
  },

  'i-can-run': {
    id: 'i-can-run',
    en: 'I can {action}.',
    zh: '我会{action}。',
    slots: {
      action: ['run', 'jump', 'play'],
    },
    level: 'pre-primer',
  },

  'we-go-to-school': {
    id: 'we-go-to-school',
    en: 'We go to school.',
    zh: '我们去上学。',
    level: 'pre-primer',
  },

  'the-color-one': {
    id: 'the-color-one',
    en: 'The {color} one is {size}.',
    zh: '{color}的那个{size}。',
    slots: {
      color: ['red', 'blue', 'yellow', 'green'],
      size: ['big', 'little'],
    },
    level: 'pre-primer',
  },

  'i-find-my-thing': {
    id: 'i-find-my-thing',
    en: 'I find my {thing}.',
    zh: '我找到了我的{thing}。',
    slots: {
      thing: ['book', 'apple', 'ball'],
    },
    level: 'pre-primer',
  },

  'come-and-play': {
    id: 'come-and-play',
    en: 'Come and play with me.',
    zh: '来和我一起玩吧。',
    level: 'pre-primer',
  },

  'where-is-the-thing': {
    id: 'where-is-the-thing',
    en: 'Where is the {thing}?',
    zh: '{thing}在哪里？',
    slots: {
      thing: ['apple', 'book', 'ball', 'dog'],
    },
    level: 'pre-primer',
  },

  'help-me-find': {
    id: 'help-me-find',
    en: 'Help me find it.',
    zh: '帮我找一下。',
    level: 'pre-primer',
  },

  'not-big-but-little': {
    id: 'not-big-but-little',
    en: 'It is not big. It is little.',
    zh: '它不大，它很小。',
    level: 'pre-primer',
  },

  'up-and-down': {
    id: 'up-and-down',
    en: 'It goes up and down.',
    zh: '它上上下下地动。',
    level: 'pre-primer',
  },

  'i-like-color': {
    id: 'i-like-color',
    en: 'I like {color}.',
    zh: '我喜欢{color}。',
    slots: {
      color: ['red', 'blue', 'yellow', 'green'],
    },
    level: 'pre-primer',
  },

  // ── Primer ────────────────────────────────────────────────────────────────

  'he-she-can-action': {
    id: 'he-she-can-action',
    en: '{pronoun} can {action}.',
    zh: '{pronoun}会{action}。',
    slots: {
      pronoun: ['he', 'she', 'we'],
      action: ['run', 'jump', 'play', 'eat'],
    },
    level: 'primer',
  },

  'what-is-this': {
    id: 'what-is-this',
    en: 'What is this? It is a {thing}.',
    zh: '这是什么？这是一个{thing}。',
    slots: {
      thing: ['apple', 'book', 'ball', 'dog'],
    },
    level: 'primer',
  },

  'the-thing-is-color': {
    id: 'the-thing-is-color',
    en: 'The {thing} is {color}.',
    zh: '那个{thing}是{color}的。',
    slots: {
      thing: ['apple', 'ball', 'book', 'flower'],
      color: ['red', 'blue', 'green', 'yellow', 'white', 'black', 'brown'],
    },
    level: 'primer',
  },

  'we-want-food': {
    id: 'we-want-food',
    en: 'We want some {food}.',
    zh: '我们想要一些{food}。',
    slots: {
      food: ['apple', 'banana', 'milk', 'bread', 'meat'],
    },
    level: 'primer',
  },

  'she-said-that': {
    id: 'she-said-that',
    en: 'She said that it was {adj}.',
    zh: '她说那个{adj}。',
    slots: {
      adj: ['good', 'big', 'little', 'pretty'],
    },
    level: 'primer',
  },

  'soon-they-will': {
    id: 'soon-they-will',
    en: 'Soon they will {action}.',
    zh: '他们很快就会{action}了。',
    slots: {
      action: ['come', 'go', 'run', 'eat', 'play'],
    },
    level: 'primer',
  },

  'please-eat-food': {
    id: 'please-eat-food',
    en: 'Please eat your {food}.',
    zh: '请吃你的{food}。',
    slots: {
      food: ['apple', 'banana', 'bread', 'meat'],
    },
    level: 'primer',
  },

  'the-animal-went-away': {
    id: 'the-animal-went-away',
    en: 'The {animal} went away.',
    zh: '那只{animal}走了。',
    slots: {
      animal: ['dog', 'cat', 'bird', 'deer'],
    },
    level: 'primer',
  },

  // ── Grade 1 ───────────────────────────────────────────────────────────────

  'after-school-action': {
    id: 'after-school-action',
    en: 'After school, I {action}.',
    zh: '放学后，我{action}。',
    slots: {
      action: ['run', 'play', 'eat', 'read'],
    },
    level: 'grade1',
  },

  'do-you-know': {
    id: 'do-you-know',
    en: 'Do you know {name}?',
    zh: '你认识{name}吗？',
    slots: {
      name: ['him', 'her', 'them'],
    },
    level: 'grade1',
  },

  'i-think-it-is': {
    id: 'i-think-it-is',
    en: 'I think it is a {thing}.',
    zh: '我觉得这是一个{thing}。',
    slots: {
      thing: ['apple', 'book', 'dog', 'flower'],
    },
    level: 'grade1',
  },

  'may-i-have': {
    id: 'may-i-have',
    en: 'May I have some {food}?',
    zh: '我可以要一些{food}吗？',
    slots: {
      food: ['apple', 'banana', 'milk', 'bread', 'meat', 'food'],
    },
    level: 'grade1',
  },

  'let-us-action-together': {
    id: 'let-us-action-together',
    en: 'Let us {action} together.',
    zh: '我们一起{action}吧。',
    slots: {
      action: ['run', 'play', 'sing', 'eat', 'walk'],
    },
    level: 'grade1',
  },

  'once-there-was': {
    id: 'once-there-was',
    en: 'Once there was a {animal}.',
    zh: '从前有一只{animal}。',
    slots: {
      animal: ['tiger', 'fox', 'monkey', 'deer', 'dog'],
    },
    level: 'grade1',
  },

  'thank-you-for': {
    id: 'thank-you-for',
    en: 'Thank you for the {thing}.',
    zh: '谢谢你给的{thing}。',
    slots: {
      thing: ['apple', 'book', 'help', 'food'],
    },
    level: 'grade1',
  },

  // ── Grade 2 ───────────────────────────────────────────────────────────────

  'because-it-is': {
    id: 'because-it-is',
    en: 'I like it because it is {adj}.',
    zh: '我喜欢它，因为它{adj}。',
    slots: {
      adj: ['good', 'big', 'beautiful', 'interesting', 'funny'],
    },
    level: 'grade2',
  },

  'always-before-action': {
    id: 'always-before-action',
    en: 'Always {action} before you {action2}.',
    zh: '{action}之前要先{action2}。',
    slots: {
      action: ['wash', 'read', 'think'],
      action2: ['eat', 'sleep', 'write'],
    },
    level: 'grade2',
  },

  'both-color-things': {
    id: 'both-color-things',
    en: 'Both the {color1} and {color2} ones are {adj}.',
    zh: '{color1}的和{color2}的都很{adj}。',
    slots: {
      color1: ['red', 'blue', 'green'],
      color2: ['yellow', 'white', 'black'],
      adj: ['good', 'big', 'pretty'],
    },
    level: 'grade2',
  },

  'would-you-like': {
    id: 'would-you-like',
    en: 'Would you like some {food}?',
    zh: '你想要一些{food}吗？',
    slots: {
      food: ['apple', 'banana', 'milk', 'bread', 'meat', 'food'],
    },
    level: 'grade2',
  },

  'first-then': {
    id: 'first-then',
    en: 'First {action1}, then {action2}.',
    zh: '先{action1}，然后{action2}。',
    slots: {
      action1: ['wash', 'read', 'eat'],
      action2: ['eat', 'sleep', 'play', 'run'],
    },
    level: 'grade2',
  },

  // ── Grade 3 ───────────────────────────────────────────────────────────────

  'keep-it-clean': {
    id: 'keep-it-clean',
    en: 'Keep your {thing} clean.',
    zh: '保持你的{thing}干净。',
    slots: {
      thing: ['home', 'school', 'book', 'clothes'],
    },
    level: 'grade3',
  },

  'try-to-be-better': {
    id: 'try-to-be-better',
    en: 'Try to be better every day.',
    zh: '每天都要努力变得更好。',
    level: 'grade3',
  },

  'never-give-up': {
    id: 'never-give-up',
    en: 'Never give up.',
    zh: '永不放弃。',
    level: 'grade3',
  },

  'together-we-can': {
    id: 'together-we-can',
    en: 'Together we can do it.',
    zh: '我们一起可以做到。',
    level: 'grade3',
  },

  'grow-your-own-food': {
    id: 'grow-your-own-food',
    en: 'You can grow your own {food}.',
    zh: '你可以自己种{food}。',
    slots: {
      food: ['apple', 'banana', 'food', 'tree'],
    },
    level: 'grade3',
  },

  // ── Fry 扩展 ─────────────────────────────────────────────────────────────

  'the-family-is-at-home': {
    id: 'the-family-is-at-home',
    en: 'The family is at home.',
    zh: '全家人都在家。',
    level: 'fry',
  },

  'go-to-school-every-day': {
    id: 'go-to-school-every-day',
    en: 'We go to school every day.',
    zh: '我们每天去上学。',
    level: 'fry',
  },

  'the-children-play': {
    id: 'the-children-play',
    en: 'The children {action} together.',
    zh: '孩子们一起{action}。',
    slots: {
      action: ['play', 'run', 'sing', 'eat'],
    },
    level: 'fry',
  },

  'water-the-tree': {
    id: 'water-the-tree',
    en: 'Water the {plant} every day.',
    zh: '每天给{plant}浇水。',
    slots: {
      plant: ['tree', 'flower', 'plant'],
    },
    level: 'fry',
  },

  'the-story-of-animal': {
    id: 'the-story-of-animal',
    en: 'This is a story about a {animal}.',
    zh: '这是一个关于{animal}的故事。',
    slots: {
      animal: ['tiger', 'fox', 'monkey', 'deer', 'dog'],
    },
    level: 'fry',
  },
}
