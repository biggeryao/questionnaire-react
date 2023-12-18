import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import { Spin } from 'antd'
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()

  return (
    <>
      QuestionLayout
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}
export default QuestionLayout
