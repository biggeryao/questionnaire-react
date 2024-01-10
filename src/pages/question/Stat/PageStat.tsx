import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import { Pagination, Spin, Table } from 'antd'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { STAT_PAGE_SIZE } from '../../../constant'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const PageStat: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const { id = '' } = useParams()
  const { loading } = useRequest(
    async () => {
      return await getQuestionStatListService(id, { page, pageSize })
    },
    {
      refreshDeps: [page, pageSize, id],
      onSuccess(res) {
        const { total, list = [] } = res
        setList(list)
        setTotal(total)
      },
    }
  )
  const { componentList } = useGetComponentsInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c
    const colTitle = props!.title || title
    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })
  const dataSource = list.map((item: any) => {
    return {
      ...item,
      key: item._id,
    }
  })
  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPageSize(pageSize)
            setPage(page)
          }}
        ></Pagination>
      </div>
    </>
  )
  return (
    <div>
      <Title level={3}>答卷数量:{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}

export default PageStat
