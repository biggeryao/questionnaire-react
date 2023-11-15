import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input
const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const newValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(newValue)
  }, [searchParams])

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <>
      <Search
        style={{ width: '200px' }}
        placeholder="输入关键字"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        allowClear
      ></Search>
    </>
  )
}

export default ListSearch
