import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Button, Empty, message, Modal, Space, Spin, Table, Tag, Typography } from 'antd'
import { useRequest, useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { deleteQuestionService, updateQuestionService } from '../../services/question'

const Trash: FC = () => {
  useTitle('问卷星球-回收站')
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { Title } = Typography
  const { confirm } = Modal

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
    }
  )
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds)
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      },
    }
  )
  function del() {
    confirm({
      title: '确认删除该问卷',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => {
        return deleteQuestion()
      },
    })
  }

  const tableColumns = [
    { title: '标题', dataIndex: 'title' },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    { title: '答卷', dataIndex: 'answerCount' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ]

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}{' '}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}
export default Trash
