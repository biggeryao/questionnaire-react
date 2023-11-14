import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
const { Header, Footer, Content } = Layout
import styles from './MainLayout.module.scss'
const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>logo</div>
        <div className={styles.right}>用户信息</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>问卷 2023</Footer>
    </Layout>
  )
}
export default MainLayout
