import { getQuestionService } from '../services/question'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'

function useLoadQuestionData() {
  const { id = '' } = useParams()

  async function load() {
    return await getQuestionService(id)
  }

  const { loading, data, error } = useRequest(load)
  return { loading, question: { data }, error }
}

export default useLoadQuestionData
