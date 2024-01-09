import React, { FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, message, Popover, Space, Tooltip } from 'antd'
import Title from 'antd/lib/typography/Title'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import QRCode from 'qrcode.react'
const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy') //拷贝选中内容
    message.success('拷贝成功')
  }
  function genLinkAndQRCodeELem() {
    if (!isPublished) return null
    const url = `http://localhost:3000/question/${id}`
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )
    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: '300px' }}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>{<Button icon={<QrcodeOutlined />}></Button>}</Popover>
      </Space>
    )
  }
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeELem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StatHeader
