import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Button, Empty, Modal, Space, Table, Tag, Typography } from 'antd'
import { useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const rawQuestionList = [
  {
    _id: 'q5',
    title: '问卷5',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月13日 12:23',
  },
]
const Trash: FC = () => {
  useTitle('问卷星球-回收站')
  const [questionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { Title } = Typography
  const { confirm } = Modal
  function del() {
    confirm({
      title: '确认删除该问卷',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => alert(JSON.stringify(selectedIds)),
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
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
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
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}
export default Trash
