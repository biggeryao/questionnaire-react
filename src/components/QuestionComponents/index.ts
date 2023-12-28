import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import { FC } from 'react'

//各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfigList: ComponentConfigType[] = [QuestionInputConfig, QuestionTitleConfig]

export const componentConfigGroup = [
  { groupName: '文本显示', components: [QuestionTitleConfig] },
  { groupName: '用户输入', components: [QuestionInputConfig] },
]
export function getComponentConfigByType(type: string) {
  return componentConfigList.find(c => c.type === type)
}
