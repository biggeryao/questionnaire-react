import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, Popconfirm, Space, Tag, Modal, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'
type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { confirm } = Modal
  const { _id, title, createdAt, isStar, answerCount, isPublished } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(res: any) {
        message.success('复制成功')
        nav(`/question/edit/${res.id}`) //跳转到问卷编辑页
      },
    }
  )
  function del() {
    confirm({
      title: '确定删除该问卷',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {},
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }}></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              onClick={changStar}
              disabled={changeStarLoading}
              type="text"
              icon={<StarOutlined />}
              size="small"
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确认复制该问卷"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>

            <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
