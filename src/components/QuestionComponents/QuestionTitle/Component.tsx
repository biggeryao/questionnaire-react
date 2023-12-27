import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'
import Title from 'antd/lib/typography/Title'

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }
  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }
  return (
    <Title
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: 0,
        fontSize: genFontSize(level),
      }}
      level={level}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
