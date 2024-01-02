import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
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
      initialValues={{ title, desc }}
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
