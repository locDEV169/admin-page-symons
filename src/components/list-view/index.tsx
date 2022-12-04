import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/css'
import { ColumnsType } from 'antd/es/table'
import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { ContentView } from './content'
import { PaginationView } from './pagination'
import { SearchView } from './search'
interface Props {
    urlApi: string
    columns: ColumnsType<object>
    cardView: (cardData: object) => JSX.Element
}
interface ListViewFilter {
    page: number
    limit?: number
    keyword?: string
}
interface ListViewPagination {
    page: number
    limit?: number
    totalRecords?: number
}
interface ListViewState {
    filter?: ListViewFilter
    pagination?: ListViewPagination
    dataSource: object[]
}

function initialState(): ListViewState {
    const value = new URLSearchParams(window.location.search)
    const page = Number(value.get('page') || '1')
    const limit = Number(value.get('limit') || '10')
    const keyword = value.get('keyword') || ''
    return {
        filter: { page, limit, keyword },
        pagination: { page, limit, totalRecords: 0 },
        dataSource: []
    }
}

export function ListView(props: Props) {
    const { columns, urlApi, cardView } = props
    const [state, setState] = useState<ListViewState>(initialState())
    const mountStack = useRef({ [urlApi]: true }).current
    const history = useHistory()

    async function getDataList(query: string = history.location.search) {
        try {
            const api = Axios.create({ baseURL: urlApi })
            const response = await api.get(query)
            const limit = Number(new URLSearchParams(query).get('limit') || '10')

            const { data: dataSource, totalRecords: totalRecords, page: page } = response.data.data

            if (mountStack[urlApi]) {
                setState((prev) => {
                    const { pagination = {}, ...rest } = prev
                    return {
                        ...rest,
                        dataSource,
                        pagination: { ...pagination, totalRecords, page, limit: limit }
                    }
                })
            }
        } catch (err) {
            notification.error({
                message: 'Error is occured',
                description: 'No data found.'
            })
        }
    }

    useEffect(() => {
        getDataList()
        history.listen((location) => {
            mountStack[urlApi] && getDataList(location.search)
        })
        return () => {
            mountStack[urlApi] = false
        }
    }, [])

    return (
        <div className='list-view'>
            <SearchView initialFilter={state.filter} />
            <ContentView columns={columns} dataSource={state.dataSource} cardView={cardView} />
            <PaginationView pagination={state.pagination} />
        </div>
    )
}
