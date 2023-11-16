import axios, { ResDataType } from './ajax'

export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return (await axios.get(url)) as ResDataType
}
