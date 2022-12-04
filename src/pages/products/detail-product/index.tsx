import { default as Button } from 'antd/es/button'
import 'antd/es/button/style/index.css'
import { default as Descriptions } from 'antd/es/descriptions'
import 'antd/es/descriptions/style/index.css'
import { default as Image } from 'antd/es/image'
import 'antd/es/image/style/index.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../../constants/api'

interface Products {
    name?: string
    image?: string
    catalogNumber?: string
    description?: string
    standardPackage?: number
    cubic?: number
    ship?: number
    price?: number
}
interface Path {
    id: string
}

const api = axios.create({
    baseURL: `${API_URL}/products`
})
export default function DetailProduct() {
    const [products, setProducts] = useState<Products>({})
    const path: Path = useParams()

    useEffect(() => {
        api.get(`/${path.id}`).then((res) => {
            setProducts(res.data.data)
        })
    }, [])

    return (
        <Descriptions
            title='Detail Product'
            bordered
            column={{ xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
            extra={
                <Button type='primary'>
                    <Link to={`/product/update/${path.id}`}>Edit</Link>
                </Button>
            }>
            <Descriptions.Item label='Name:' labelStyle={{ fontWeight: 600, width: '15%' }}>
                {products.name}
            </Descriptions.Item>
            <Descriptions.Item label='Catalog Number:' labelStyle={{ fontWeight: 600, width: '15%' }}>
                {products.catalogNumber}
            </Descriptions.Item>
            <Descriptions.Item label='Ship:' labelStyle={{ fontWeight: 600, width: '15%' }}>
                {products.ship} &ensp;lbs.
            </Descriptions.Item>
            <Descriptions.Item label='Cubic:' labelStyle={{ fontWeight: 600, width: '15%' }}>
                {products.cubic}
            </Descriptions.Item>
            <Descriptions.Item label='Standard Package:' labelStyle={{ fontWeight: 600, width: '15%' }}>
                {products.standardPackage}
            </Descriptions.Item>
            <Descriptions.Item label='Price:' labelStyle={{ fontWeight: 600, width: '15%' }}>
                $&ensp;{products.price}
            </Descriptions.Item>
            <Descriptions.Item label='Description:' span={3} labelStyle={{ fontWeight: 600, width: '15%' }}>
                {products.description}
            </Descriptions.Item>
            <Descriptions.Item label='Image:' span={3}>
                <Image width={400} src={products.image} />
            </Descriptions.Item>
        </Descriptions>
    )
}
