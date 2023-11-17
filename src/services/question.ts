import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return await axios.get(url)
}
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  return await axios.post(url)
}

export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}
