import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConfig, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConfig, { QuestionTextareaPropsType } from './QuestionTextarea'
import { FC } from 'react'

//各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType

//组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>

  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfigList: ComponentConfigType[] = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
]

export const componentConfigGroup = [
  {
    groupName: '文本显示',
    components: [QuestionTitleConfig, QuestionParagraphConfig, QuestionInfoConfig],
  },
  { groupName: '用户输入', components: [QuestionInputConfig, QuestionTextareaConfig] },
]
export function getComponentConfigByType(type: string) {
  return componentConfigList.find(c => c.type === type)
}
