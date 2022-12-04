import { default as Button } from 'antd/es/button'
import 'antd/es/button/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input/style/index.css'
import React, { LegacyRef, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import './search.scss'

interface Props {
    initialFilter?: { keyword?: string; page?: number }
}

export function SearchView(props: Props) {
    const { initialFilter = {} } = props
    const history = useHistory()
    const keyword: LegacyRef<Input> = useRef(null)

    const onSearchClick = () => {
        const filter: Record<string, string> = {
            page: '1',
            keyword: `${keyword.current?.input.value}`
        }
        const params = new URLSearchParams(filter)
        history.replace({ pathname: location.pathname, search: params.toString() })
    }

    return (
        <div className='search-view'>
            <div className='search-view__keyInfo'>
                <Input
                    allowClear
                    placeholder='Enter your search'
                    type='text'
                    name='keyword'
                    defaultValue={initialFilter.keyword}
                    ref={keyword}
                    onPressEnter={onSearchClick}
                />
            </div>
            <div className='search-view__btnSearch'>
                <Button type='primary' shape='round' onClick={onSearchClick}>
                    SEARCH
                </Button>
            </div>
        </div>
    )
}
