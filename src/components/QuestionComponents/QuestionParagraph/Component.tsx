import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
import Paragraph from 'antd/lib/typography/Paragraph'

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  const textList = text.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {textList.map((text, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {text}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
