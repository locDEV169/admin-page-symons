import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import axios from 'axios'
import { API_URL } from 'constants/api'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ProductForm } from '../product-form'

const api = axios.create({
    baseURL: `${API_URL}/products`
})
interface Product {
    name: string
    image: string
    catalogNumber: string
    description: string
    standardPackage: number
    cubic: number
    ship: number
    price: number
}

interface Path {
    id: string
}

export default function EditProductPage() {
    const [products, setProducts] = useState<Product>()
    const path: Path = useParams()
    let history = useHistory()

    useEffect(() => {
        api.get(`/${path.id}`).then((res) => {
            setProducts(res.data.data)
        })
    }, [])

    const onEditProduct = (values: object) => {
        api.put(`/${path.id}`, { ...values })

            .then(() => {
                notification.success({
                    message: 'Product updated successfully',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />
                })
                history.goBack()
            })
            .catch(() => {
                return notification.error({
                    message: 'Product has been updated Failed',
                    icon: <FrownOutlined style={{ color: '#f21b3b' }} />
                })
            })
    }

    return (
        <>
            <p>
                <strong>Edit Product Form</strong>
            </p>
            {products && <ProductForm onSubmit={onEditProduct} product={products} />}
        </>
    )
}
