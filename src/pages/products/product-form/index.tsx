import { default as Col } from 'antd/es/col'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import 'antd/es/grid/style/index.css'
import { default as Input } from 'antd/es/input'
import { default as InputNumber } from 'antd/es/input-number'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import 'antd/es/modal/style/index.css'
import { default as Row } from 'antd/es/row'
import 'antd/es/upload/style/index.css'
import UploadImage from 'components/upload-image'
import { URL_UPLOAD } from 'constants/api'
import { default as React, useState } from 'react'
import { VButton } from 'vendor/pages'
import './style.scss'

interface Props {
    onSubmit: (values: any) => void

    product?: {
        name?: string
        image?: string
        catalogNumber?: string
        description?: string
        standardPackage?: number
        cubic?: number
        ship?: number
        price?: number
    }
}

export function ProductForm(props: Props) {
    const [form] = Form.useForm()
    const [images, setImages] = useState<string[]>([])
    const url = `${URL_UPLOAD}`

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
        <div className='create-form'>
            <Form initialValues={props.product} onFinish={props.onSubmit} form={form}>
                <div className='form'>
                    <div className='form-left'>
                        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your Name!' }]}>
                            <Input type='text' placeholder='Enter full name' />
                        </Form.Item>

                        <Form.Item
                            label='Catalog Number'
                            name='catalogNumber'
                            rules={[{ required: true, message: 'Please input your Catalog Number!' }]}>
                            <Input type='text' maxLength={10} placeholder='Enter catalog Number' />
                        </Form.Item>
                        <Form.Item
                            label='Standard Pkg'
                            name='standardPackage'
                            rules={[{ required: true, message: 'Please input your Std. Pkg!' }]}>
                            <InputNumber maxLength={12} placeholder='Enter standard package number' />
                        </Form.Item>
                        <Form.Item
                            valuePropName=''
                            label='Image'
                            name='image'
                            rules={[{ required: true, message: 'Please add your Images!' }]}>
                            <UploadImage customRequest={(option) => uploadImg(option)} onRemove={(option) => deleteImg(option)} />
                        </Form.Item>
                    </div>

                    <div className='form-right'>
                        <Form.Item
                            label='Description'
                            name='description'
                            rules={[{ required: true, message: 'Please input your Description!' }]}>
                            <Input.TextArea rows={3} placeholder='Write something about the product' />
                        </Form.Item>

                        <Form.Item
                            label='Cubic'
                            name='cubic'
                            rules={[{ required: true, message: 'Please input your Cubic Feet!' }]}>
                            <InputNumber maxLength={12} placeholder='Enter cubic number' />
                        </Form.Item>

                        <Form.Item label='Ship' name='ship' rules={[{ required: true, message: 'Please input your Ship Wt!' }]}>
                            <InputNumber maxLength={12} placeholder='Enter ship number' />
                        </Form.Item>

                        <Form.Item
                            label='Price'
                            name='price'
                            rules={[{ required: true, message: 'Please input your List Price!' }]}>
                            <InputNumber
                                maxLength={17}
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />
                        </Form.Item>
                    </div>
                </div>

                <Row>
                    <Col span='24' className='form-btn'>
                        <Form.Item>
                            <VButton type='primary' className='btnSubmit' htmlType='submit'>
                                Submit
                            </VButton>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
