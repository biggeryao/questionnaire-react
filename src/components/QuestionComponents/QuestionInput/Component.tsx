import React, { FC } from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'
import { Input } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
