import type { SemesterData } from '../types'

export const semesters: SemesterData[] = [
  {
    id: '1a',
    title: '一年级（上）',
    color: '#2d8a4e',
    description: '4个单词 · 2个单元',
    units: [
      { id: 'u1', title: 'Unit 1', wordKeys: ['apple', 'hello'] },
      { id: 'u2', title: 'Unit 2', wordKeys: ['kite', 'have'] },
    ],
  },
  {
    id: '1b',
    title: '一年级（下）',
    color: '#7b3fa0',
    description: '2个单词 · 1个单元',
    units: [
      { id: 'u1', title: 'Unit 1', wordKeys: ['who', 'stand'] },
    ],
  },
  {
    id: '2a',
    title: '二年级（上）',
    color: '#1b6ca8',
    description: '58个单词 · 5个单元',
    units: [
      {
        id: 'u1', title: 'Unit 1',
        wordKeys: ['eye', 'face', 'mouth', 'nose', 'snowman', 'same', 'twin', 'big', 'small', 'people', 'often', 'us', 'wrong', 'can', 'idea', 'long', 'hair', 'short', 'different', 'now'],
      },
      {
        id: 'u2', title: 'Unit 2',
        wordKeys: ['put', 'head', 'neck', 'arm', 'body', 'leg'],
      },
      {
        id: 'u3', title: 'Unit 3',
        wordKeys: ['go', 'zoo', 'tiger', 'fox', 'monkey', 'eat', 'king', 'of', 'animal', 'show', 'come', 'with', 'run', 'deer', 'fly'],
      },
      {
        id: 'u4', title: 'Unit 4',
        wordKeys: ['apple', 'banana', 'milk', 'about', 'picnic', 'day', 'bread', 'meat', 'food', 'shopping', 'list'],
      },
      {
        id: 'u5', title: 'Unit 5',
        wordKeys: ['festival', 'best', 'wish', 'celebrate', 'wear', 'clothes', 'mean', 'luck', 'these', 'lantern', 'they', 'beautiful', 'also', 'wow', 'some', 'candy', 'lucky', 'new', 'year', 'interesting'],
      },
    ],
  },
]
