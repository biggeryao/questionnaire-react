import React, { FC, useEffect } from 'react'
import { getQuestionService } from '../../../services/question'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id = '' } = useParams()
  useEffect(() => {
    async function fn() {
      getQuestionService(id).then(res => {
        console.log(res)
      })
    }
    fn()
  }, [])
  return <h3>Edit</h3>
}
export default Edit
