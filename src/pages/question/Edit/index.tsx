import React, { FC } from 'react'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
const Edit: FC = () => {
  // const { loading, question } = useLoadQuestionData()
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            main
            <div className={styles['canvas-wrapper']}>
              <EditCanvas></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
