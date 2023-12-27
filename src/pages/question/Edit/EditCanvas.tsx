import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles['component']}>
          <QuestionTitle text="1" level={1} isCenter={true}></QuestionTitle>
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles['component']}>
          <QuestionInput></QuestionInput>
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
