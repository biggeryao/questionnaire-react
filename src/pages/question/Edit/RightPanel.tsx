import React, { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <div>设置</div>,
    },
  ]

  return <Tabs items={tabsItems} defaultActiveKey="prop" />
}

export default RightPanel
