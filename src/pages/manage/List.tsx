import React, { FC, useEffect, useRef, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const List: FC = () => {
  const { Title } = Typography
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [started, setStarted] = useState(false)

  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  useEffect(() => {
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = {}, total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return

      const domRect = elem.getBoundingClientRect()
      if (domRect === null) return

      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )
  //当页面加载，或者url参数{keyword}变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const loadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()} </div>
      </div>
    </>
  )
}

export default List
