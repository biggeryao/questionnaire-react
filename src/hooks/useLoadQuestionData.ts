import { getQuestionService } from '../services/question'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer/index'
function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  //ajax加载 获取数据
  const {
    data = {},
    loading,
    error,
    run,
  } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷ID')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  //判断id是否变化，执行ajax加载数据
  useEffect(() => {
    run(id)
  }, [id])

  //根据获取的data设置redux store
  useEffect(() => {
    console.log(data)
    const { title = '', componentList = [] } = data
    console.log(title)
    //把 componentList 存储到redux store
    dispatch(resetComponents({ componentList }))
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
