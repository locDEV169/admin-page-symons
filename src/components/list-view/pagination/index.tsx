import { default as Pagination } from 'antd/es/pagination'
import 'antd/es/pagination/style/css'
import { default as React } from 'react'
import { useHistory } from 'react-router'

interface PaginationOptions {
    page?: number
    limit?: number
    totalRecords?: number
}

interface Props {
    pagination?: PaginationOptions
}

export function PaginationView(props: Props) {
    const { pagination } = props
    const history = useHistory()

    const onChangeSize = (current: number, size?: number) => {
        const params = new URLSearchParams(location.search)
        params.set('page', `${current || pagination?.page}`)
        params.set('limit', `${size || pagination?.limit}`)
        history.replace({ pathname: location.pathname, search: params.toString() })
    }

    return (
        <Pagination
            current={pagination?.page}
            pageSize={pagination?.limit}
            total={pagination?.totalRecords}
            style={{ textAlign: 'right', margin: '20px 0' }}
            onChange={onChangeSize}
            showSizeChanger
            onShowSizeChange={onChangeSize}
        />
    )
}
