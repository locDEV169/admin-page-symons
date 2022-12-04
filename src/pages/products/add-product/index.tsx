import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import 'antd/es/input-number/style/index.css'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import axios from 'axios'
import { API_URL } from 'constants/api'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ProductForm } from '../product-form'

interface Values {
    name: string
    image: string
    catalogNumber: string
    description: string
    standardPackage: number
    cubic: number
    ship: number
    price: number
}

const api = axios.create({
    baseURL: `${API_URL}/products`
})

export default function AddProductPage() {
    let history = useHistory()
    const onAddProduct = (values: Values) => {
        api.post('/create', {
            ...values,
            image: values.image.toString()
        })
            .then(() => {
                notification.success({
                    message: 'Product has been added Successfully',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />
                })
                history.goBack()
            })
            .catch(() => {
                return notification.error({
                    message: 'Product has been added Failed',
                    icon: <FrownOutlined style={{ color: '#f21b3b' }} />
                })
            })
    }

    return (
        <>
            <p>
                <strong>Add Product Form</strong>
            </p>
            <ProductForm onSubmit={onAddProduct} />
        </>
    )
}
