import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import 'antd/es/input/style/index.css'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/css'
import 'antd/es/space/style/index.css'
import { ColumnsType } from 'antd/es/table'
import api from 'constants/api'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { ContentView } from './content'
import { PaginationView } from './pagination'
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
    const [form] = Form.useForm()

    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)

    async function getDataList(query: string = history.location.search) {
        try {
            console.log(query);

            // const api = Axios.create({ baseURL: urlApi })
            const response = await api.get('points/point-history')
            const limit = Number(new URLSearchParams(query).get('limit') || '10')

            const { pointHistory: dataSource, count: totalRecords, page: page } = response.data

            if (mountStack[urlApi]) {
                setState((prev) => {
                    const { pagination = {}, ...rest } = prev
                    return {
                        ...rest,
                        dataSource: dataSource,
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
            {/* <SearchView initialFilter={state.filter} /> */}
            <ContentView columns={columns} dataSource={state.dataSource} cardView={cardView} />
            <PaginationView pagination={state.pagination} />
        </div>
    )
}
