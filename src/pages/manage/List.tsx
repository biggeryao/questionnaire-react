import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月10日 12:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3月15日 12:23',
  },
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月13日 12:23',
  },
]
const List: FC = () => {
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>H3</div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q
          return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List
