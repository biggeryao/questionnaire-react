import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, question } = useLoadQuestionData()
  return (
    <div>
      <h3>Edit</h3>
      {loading ? <p>loading</p> : <p>{JSON.stringify(question)}</p>}
    </div>
  )
}
export default Edit
