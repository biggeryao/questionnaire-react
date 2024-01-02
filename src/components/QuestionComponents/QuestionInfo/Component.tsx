import React, { FC } from 'react'
import Paragraph from 'antd/lib/typography/Paragraph'
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface'
import Title from 'antd/lib/typography/Title'

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descTextList = desc.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Title>{title}</Title>
      <Paragraph>
        {descTextList.map((text, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {text}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
