import { HomeOutlined } from '@ant-design/icons'
import { default as Breadcrumb } from 'antd/es/breadcrumb'
import 'antd/es/breadcrumb/style/index.css'
import { default as React, Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function MainBreadcrumb() {
    const [paths, setPaths] = useState<{ key: string; title: string }[]>([])
    const history = useHistory()

    useEffect(() => {
        history.listen((listener) => {
            const data: { key: string; title: string }[] = []
            let path = listener.pathname
            const size = path.match(/\//g)?.length || 0
            for (let i = 0; i <= size; i++) {
                const index = path.lastIndexOf('/')
                const key = path.substring(index, path.length + 1)
                data[size - i] = { key: path, title: key.split('/')[1] }
                path = path.substring(0, index)
            }
            setPaths(data)
        })
    }, [history.location])

    return (
        <Breadcrumb separator='' style={{ display: 'block', margin: '24px 16px 0' }}>
            {paths.map((item, index) => {
                return (
                    <Breadcrumb.Item key={item.key}>
                        <BreadcrumbItem title={item.title} route={item.key} last={index === paths.length - 1} />
                        {index < paths.length - 1 && <Breadcrumb.Separator>{'>'}</Breadcrumb.Separator>}
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}

function BreadcrumbItem({ title, route, last }: { title: string; route: string; last: boolean }) {
    const titleElement = <span style={{ textTransform: 'capitalize' }}>{title}</span>
    return <Fragment>{last ? titleElement : <Link to={route}>{title ? titleElement : <HomeOutlined />}</Link>}</Fragment>
}
