import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      disabled={disabled}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ text, isCenter }}
      form={form}
    >
      <Form.Item label="内容" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <TextArea />
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
