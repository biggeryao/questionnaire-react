import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { Empty, Typography } from 'antd'
import { useTitle } from 'ahooks'

const rawQuestionList = [
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '3月15日 12:23',
  },
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月13日 12:23',
  },
]
const { Title } = Typography
const Star: FC = () => {
  useTitle('问卷星球-星标问卷')
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}
export default Star
