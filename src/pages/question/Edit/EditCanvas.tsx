import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { changeSelectedId, ComponentInfoType } from '../../../store/componentsReducer'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
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
  const { componentList, selectedId } = useGetComponentsInfo()
  const dispatch = useDispatch()
  function handleClick(event: React.MouseEvent<HTMLDivElement>, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const LockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedId === fe_id,
            [LockedClassName]: isLocked,
          })
          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={e => {
                handleClick(e, fe_id)
              }}
            >
              <div className={styles['component']}>{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
