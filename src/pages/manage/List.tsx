import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const List: FC = () => {
  const { Title } = Typography
  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [] } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List
