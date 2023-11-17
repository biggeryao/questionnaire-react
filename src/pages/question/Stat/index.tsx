import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, question } = useLoadQuestionData()
  return (
    <div>
      <h3>stat</h3>
      {loading ? <p>loading</p> : <p>{JSON.stringify(question)}</p>}
    </div>
  )
}
export default Stat
