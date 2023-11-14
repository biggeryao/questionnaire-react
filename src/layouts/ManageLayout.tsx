import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Manage.module.scss'
import { Button } from 'yao-react-ui'
import { Space } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className={styles.container}>
      <Space className={styles.left} direction="vertical">
        <Button btnType="primary" size="lg">
          创建问卷
        </Button>
        <Button
          btnType={pathname.startsWith('/manage/list') ? 'primary' : 'default'}
          size="lg"
          onClick={() => {
            nav('/manage/list')
          }}
        >
          我的问卷
        </Button>
        <Button
          btnType={pathname.startsWith('/manage/star') ? 'primary' : 'default'}
          size="lg"
          onClick={() => {
            nav('/manage/star')
          }}
        >
          星标问卷
        </Button>
        <Button
          btnType={pathname.startsWith('/manage/trash') ? 'primary' : 'default'}
          size="lg"
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
