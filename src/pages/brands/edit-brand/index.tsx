import { SmileOutlined } from '@ant-design/icons'
import { default as Col } from 'antd/es/col'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/css'
import 'antd/es/image/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input/style/css'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import axios from 'axios'
import UploadImage from 'components/upload-image'
import { API_URL, URL_UPLOAD } from 'constants/api'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { VButton } from '../../../vendor/pages'
import './style.scss'

const api = axios.create({
    baseURL: `${API_URL}/brands`
})

interface Brand {
    brandName?: string
    image?: string
    description?: string
    country?: string
    referenceLink?: string
}

interface Path {
    id: string
}

export default function EditBrandPage() {
    const [form] = Form.useForm()
    const [brand, setBrand] = useState<Brand>()
    const path: Path = useParams()
    const [images, setImages] = useState<string[]>([])
    const url = `${URL_UPLOAD}`
    let history = useHistory()

    useEffect(() => {
        api.get(`/${path.id}`).then((res) => {
            console.log(res.data.data.image)
            setBrand(res.data.data)
            form.setFieldsValue(res.data.data)
            console.log(form.getFieldValue('image'))
            setImages(form.getFieldValue('image'))
        })
    }, [])

    const onEditBrand = (values: object) => {
        api.put(`/update/${path.id}`, { ...values })
            .then(() => {
                notification.success({
                    message: 'Product updated successfully',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />
                })
                history.goBack()
            })
            // .catch(() => {
            //     return notification.error({
            //         message: 'Product has been updated Failed',
            //         icon: <FrownOutlined style={{ color: '#f21b3b' }} />
            //     })
            // })
            .catch((error) => {
                console.log(error)
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

    console.log(form.getFieldValue('image'))

    return (
        <div className='brand-form'>
            <div className='edit-form'>
                <div className='form-title'>
                    <span>Edit Brand Form</span>
                </div>
                <Form onFinish={onEditBrand} form={form}>
                    <Form.Item
                        label='Brand Name'
                        name='brandName'
                        rules={[{ required: true, message: 'Please input your brand name!' }]}>
                        <Input placeholder='Enter Brand name' />
                    </Form.Item>
                    <Form.Item label='Logo' name='image' rules={[{ required: true, message: 'Please add your Images!' }]}>
                        <UploadImage
                            fileList={brand?.image}
                            customRequest={(option) => uploadImg(option)}
                            onRemove={(option) => deleteImg(option)}
                        />
                        {/* <Image width={100} src={brand?.image} /> */}
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
