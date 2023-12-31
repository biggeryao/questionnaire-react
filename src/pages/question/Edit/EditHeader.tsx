import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, message, Space } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

//显示、修改标题组件
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editState, setEditState] = useState(false)
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value.trim()
    if (!newValue) return
    dispatch(changePageTitle(newValue))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

//保存按钮组件
const SaveButton: FC = () => {
  const { componentList } = useGetComponentsInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) run()
  })
  useDebounceEffect(
    () => {
      if (!loading) run()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )
  const { run, loading } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )
  function handleSave() {
    run()
  }
  return (
    <Button loading={loading} onClick={handleSave} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { componentList } = useGetComponentsInfo()
  const pageInfo = useGetPageInfo()
  const { run, loading } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublish: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  function handlePublish() {
    run()
  }

  return (
    <Button type="primary" loading={loading} onClick={handlePublish}>
      发布
    </Button>
  )
}
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
