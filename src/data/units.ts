import type { SemesterData } from '../types'

export const semesters: SemesterData[] = [
  {
    id: 'grade1-s1',
    title: '一年级（上）',
    units: [
      { id: 'grade1-s1-u1', title: 'Unit 1', wordKeys: ['apple', 'hello'] },
      { id: 'grade1-s1-u2', title: 'Unit 2', wordKeys: ['kite', 'have'] },
    ],
  },
  {
    id: 'grade1-s2',
    title: '一年级（下）',
    units: [
      { id: 'grade1-s2-u1', title: 'Unit 1', wordKeys: ['who', 'stand'] },
    ],
  },
  {
    id: 'grade2-s1',
    title: '二年级（上）',
    units: [
      {
        id: 'grade2-s1-u1', title: 'Unit 1',
        wordKeys: ['eye', 'face', 'mouth', 'nose', 'snowman', 'same', 'twin', 'big', 'small', 'people', 'often', 'us', 'wrong', 'can', 'idea', 'long', 'hair', 'short', 'different', 'now'],
      },
      {
        id: 'grade2-s1-u2', title: 'Unit 2',
        wordKeys: ['put', 'head', 'neck', 'arm', 'body', 'leg'],
      },
      {
        id: 'grade2-s1-u3', title: 'Unit 3',
        wordKeys: ['go', 'zoo', 'tiger', 'fox', 'monkey', 'eat', 'king', 'of', 'animal', 'show', 'come', 'with', 'run', 'deer', 'fly'],
      },
      {
        id: 'grade2-s1-u4', title: 'Unit 4',
        wordKeys: ['apple', 'banana', 'milk', 'about', 'picnic', 'day', 'bread', 'meat', 'food', 'shopping', 'list'],
      },
      {
        id: 'grade2-s1-u5', title: 'Unit 5',
        wordKeys: ['festival', 'best', 'wish', 'celebrate', 'wear', 'clothes', 'mean', 'luck', 'these', 'lantern', 'they', 'beautiful', 'also', 'wow', 'some', 'candy', 'lucky', 'new', 'year', 'interesting'],
      },
    ],
  },
]
