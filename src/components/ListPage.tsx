import React, { FC, useEffect, useState } from 'react'

import { Pagination } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGESIZE_PARAM_KEY } from '../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  //获取url中的page，pageSize,并同步到Pagination组件中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handleChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, String(page))
    searchParams.set(LIST_PAGESIZE_PARAM_KEY, String(pageSize))
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handleChange}
    ></Pagination>
  )
}

export default ListPage
