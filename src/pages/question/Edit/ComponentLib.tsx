import React, { FC } from 'react'
import { componentConfigGroup, ComponentConfigType } from '../../../components/QuestionComponents'
import Title from 'antd/lib/typography/Title'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'
const ComponentLib: FC = () => {
  function genComponent(config: ComponentConfigType) {
    const { title, type, Component, defaultProps } = config
    const dispatch = useDispatch()

    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          props: defaultProps,
        })
      )
    }
    return (
      <div
        className={styles.wrapper}
        onClick={() => {
          handleClick()
        }}
      >
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfigGroup.map((group, index) => {
        const { groupName, components } = group
        return (
          <div key={index}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : 0 }}>
              {groupName}
            </Title>
            {components.map(c => genComponent(c))}
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
