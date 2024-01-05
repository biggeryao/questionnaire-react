import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const dispatch = useDispatch()
  // const { title } = pageInfo
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  return (
    <div>
      <Form
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleValuesChange}
        form={form}
      >
        <Form.Item
          label="问卷标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入问卷标题" />
        </Form.Item>
        <Form.Item label="问卷描述" name="desc">
          <TextArea placeholder="请输入问卷描述" />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea placeholder="请输入CSS" />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <TextArea placeholder="请输入JS" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default PageSetting
