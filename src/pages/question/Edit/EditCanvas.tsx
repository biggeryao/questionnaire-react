import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { ComponentInfoType } from '../../../store/componentsReducer'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import { Spin } from 'antd'
type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) return

  const { Component } = componentConfig
  return <Component {...props} />
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentsInfo()
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        return (
          <div className={styles['component-wrapper']} key={fe_id}>
            <div className={styles['component']}>{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
