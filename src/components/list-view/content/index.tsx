import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/css'
import debounce from 'debounce'
import React, { useEffect, useState } from 'react'
import './style.scss'

interface Props {
    columns: ColumnsType<object>
    dataSource: object[]
    cardView: (cardData: object) => JSX.Element
}

function useWindowSize(delay = 100) {
    const [size, setSize] = useState<number>(window.innerWidth)

    useEffect(() => {
        const updateSize = () => setSize(window.innerWidth)
        const debounceDropDown = debounce(updateSize, delay)
        window.addEventListener('resize', debounceDropDown)

        return () => {
            window.removeEventListener('resize', debounceDropDown)
        }
    }, [delay])

    return size
}

export function ContentView(props: Props) {
    const width: number = useWindowSize()
    const { dataSource, columns, cardView } = props
    return (
        <>
            {width > 768 ? (
                <Table columns={columns} dataSource={dataSource} className='table-view' pagination={false} rowKey='id' />
            ) : (
                dataSource.map(cardView)
            )}
        </>
    )
}
