import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Manage.module.scss'
const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>ManageLayout left</div>
      <div>
        <Outlet />
      </div>
      <div className={styles.right}>ManageLayout right</div>
    </div>
  )
}
export default ManageLayout
