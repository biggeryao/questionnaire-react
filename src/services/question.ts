import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
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
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, { params: opt })) as ResDataType
  return data
}
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}
