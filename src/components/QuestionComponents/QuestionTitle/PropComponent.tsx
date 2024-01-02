import React, { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

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
      initialValues={{ text, level, isCenter }}
      form={form}
    >
      <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
