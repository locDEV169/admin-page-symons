import { default as DatePicker } from 'antd/es/date-picker'
import 'antd/es/date-picker/style/index.css'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import { default as Radio, RadioChangeEvent } from 'antd/es/radio'
import 'antd/es/radio/style/index.css'
import 'antd/es/select/style/index.css'
import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/index.css'
import React, { Fragment, LegacyRef, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'
import './style.scss'

interface Statistical {
    id?: number | string
    storeId?: number | string
    customerId?: number | string
    lastPoint: number
}

const { RangePicker } = DatePicker;

export default function ProductsPage() {
    const Statistical_API = `points/point-history`
    let history = useHistory()
    const [form] = Form.useForm()
    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)
    const [checkStatus, setCheckStatus] = useState<number>(1)

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    const formSearch: any = (value: number) => {
        return <Form onFinish={onSubmit} form={form} className='form-search'>
            <Form.Item
                name={value === 1 ? 'storeId' : 'customerId'}
                className='form-search__deviceId'>
                <Input placeholder={value === 1 ? 'Store ID' : 'Customer ID'} />
            </Form.Item>
            <Form.Item>
                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    // onChange={onChange}
                    onOk={onOk}
                />
            </Form.Item>
            <Form.Item>
                <VButton type='primary' className='form-search__btnSearch' htmlType='submit'>
                    Search
                </VButton>
            </Form.Item>
        </Form>
    }

    const columnsCustomerID: ColumnsType<Statistical | object> = [
        {
            title: 'Customer ID',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: function nameCell(name: string, record: any) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Lastest Point',
            dataIndex: 'appId',
            key: 'appId',
            render: function nameCell(name: string, record: any) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
    ]

    const columnsStoreID: ColumnsType<Statistical | object> = [
        {
            title: 'Store ID',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: function nameCell(name: string, record: any) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Lastest Point',
            dataIndex: 'appId',
            key: 'appId',
            render: function nameCell(name: string, record: any) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
    ]

    const onChange = (e: RadioChangeEvent) => {
        setCheckStatus(e.target.value);
    };

    return (
        <Fragment>
            <div className='statistical'>
                <div className='statistical__title'>
                    Statistical
                </div>
                {formSearch(checkStatus)}
                <div className='statistical__table'>
                    <div className='statistical__radioGroup'>
                        <Radio.Group onChange={onChange} value={checkStatus}>
                            <Radio value={1}>Store ID</Radio>
                            <Radio value={2}>Customer ID</Radio>
                        </Radio.Group>
                    </div>
                    <Table columns={checkStatus === 1 ? columnsStoreID : columnsCustomerID} />
                </div>

            </div>
        </Fragment>
    )
}
