import { default as Col } from 'antd/es/col'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input/style/css'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import axios from 'axios'
import UploadImage from 'components/upload-image'
import { API_URL, URL_UPLOAD } from 'constants/api'
import { default as React, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { VButton } from '../../../vendor/pages'
import './style.scss'

interface Values {
    brandName: string
    description: string
    image: string
    country: string
    referenceLink: string
}

const api = axios.create({
    baseURL: `${API_URL}`
})

export default function AddBrandPage() {
    const [form] = Form.useForm()
    const [images, setImages] = useState<string[]>([])
    const url = `${URL_UPLOAD}`
    const history = useHistory()

    const onAddBrand = (values: Values) => {
        api.post('/brands/create', {
            ...values,
            image: values.image.toString()
        }).then(() => {
            notification.success({
                message: 'Brands added successfully',
                description: 'Added successful brands'
            })
            history.push('/brand')
        })
    }

    const uploadImg = (value: string) => {
        const urlImg = url + value
        images.push(urlImg)
        form.setFieldsValue({ image: images })
    }

    const deleteImg = (value: string) => {
        const urlImg = url + value
        form.setFieldsValue({ image: images.filter((i) => i !== urlImg) })
    }

    return (
        <div className='brand-form'>
            <div className='add-form'>
                <div className='form-title'>
                    <span>Add Brand Form </span>
                </div>
                <Form onFinish={onAddBrand} autoComplete='off' form={form}>
                    <Form.Item
                        label='Brand Name'
                        name='brandName'
                        rules={[{ required: true, message: 'Please input your brand name!' }]}>
                        <Input placeholder='Enter Brand name' />
                    </Form.Item>
                    <Form.Item label='Images' name='image' rules={[{ required: true, message: 'Please add your Images!' }]}>
                        <UploadImage customRequest={(option) => uploadImg(option)} onRemove={(option) => deleteImg(option)} />
                    </Form.Item>
                    <Form.Item
                        label='Country'
                        name='country'
                        rules={[{ required: true, message: 'Please input brand country!' }]}>
                        <Input placeholder='Enter Country of Brand' />
                    </Form.Item>
                    <Form.Item
                        label='Reference Link'
                        name='referenceLink'
                        rules={[{ required: true, message: 'Please input brand reference link!' }]}>
                        <Input placeholder='Enter Reference Link of Brand' />
                    </Form.Item>
                    <Form.Item
                        label='Description'
                        name='description'
                        rules={[{ required: true, message: 'Please input your Description!' }]}>
                        <Input.TextArea rows={3} placeholder='Write something description about the product' />
                    </Form.Item>

                    <Col span='24' className='form-btn'>
                        <Form.Item>
                            <VButton type='primary' className='btnSubmit' htmlType='submit'>
                                Submit
                            </VButton>
                        </Form.Item>
                    </Col>
                </Form>
            </div>
        </div>
    )
}
