import React, { FC } from 'react'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'
import Paragraph from 'antd/lib/typography/Paragraph'
import TextArea from 'antd/lib/input/TextArea'

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextarea
