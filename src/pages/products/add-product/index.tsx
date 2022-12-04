import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import UploadLink from 'components/upload-link'
import api from 'constants/api'
import { default as React } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductForm } from '../product-form'

interface Values {
    id: number
    name: string
    note: string
    description: string
    feature: string
    image: string
    referenceLink: string
}

export default function AddProductsPage() {
    const history = useHistory()
    const onAddProduct = (values: Values) => {
        const convertLinkVideo = values.referenceLink ? `${'//www.youtube.com/embed/' + UploadLink(values.referenceLink)}` : ''
        api.post('/products/create', {
            ...values,
            note: values.note || '',
            image: values.image.toString(),
            feature: values.feature || '',
            referenceLink: convertLinkVideo
        })
            .then(() => {
                notification.success({
                    message: 'Product added successfully',
                    description: 'Added successful Product'
                })
                history.goBack()
            })
            .catch(() => {
                notification.error({
                    message: 'Product added Failed',
                    description: 'Added Failed Product'
                })
            })
    }
    return <ProductForm onSubmit={onAddProduct} />
}
