import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Manage.module.scss'
import { Space, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess({ id }) {
      nav(`/question/edit/${id}`)
    },
  })
  return (
    <div className={styles.container}>
      <Space className={styles.left} direction="vertical">
        <Button type="primary" size="large" loading={loading} onClick={handleCreateClick}>
          创建问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/list') ? 'primary' : 'default'}
          size="large"
          onClick={() => {
            nav('/manage/list')
          }}
        >
          我的问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/star') ? 'primary' : 'default'}
          size="large"
          onClick={() => {
            nav('/manage/star')
          }}
        >
          星标问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/trash') ? 'primary' : 'default'}
          size="large"
          onClick={() => {
            nav('/manage/trash')
          }}
        >
          回收站
        </Button>
      </Space>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
export default ManageLayout
