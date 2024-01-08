import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent,
} from '../../../store/componentsReducer'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragsComponents/SortableContainer'
import SortableItem from '../../../components/DragsComponents/SortableItem'
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
  //SortableContainer 组件的Items属性 ，需要 每个 item 都有id
  const componentsListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  function handleClick(event: React.MouseEvent<HTMLDivElement>, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  useBindCanvasKeyPress()
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  //拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentsListWithId} onDragEnd={handleDragEnd}>
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
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => {
                    handleClick(e, fe_id)
                  }}
                >
                  <div className={styles['component']}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
