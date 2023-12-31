import React, { FC } from 'react'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import {
  ComponentPropsType,
  getComponentConfigByType,
} from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}
const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentsInfo()
  if (selectedComponent == null) {
    return <NoProp />
  }
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) {
    return <NoProp />
  }
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  const { PropComponent } = componentConfig
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp
