import { default as DatePicker } from 'antd/es/date-picker'
import 'antd/es/date-picker/style/index.css'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import { default as Select } from 'antd/es/select'
import 'antd/es/select/style/index.css'
import { ColumnsType } from 'antd/es/table'
import 'antd/es/tooltip/style/index.css'
import { ListView } from 'components/list-view'
import React, { Fragment, LegacyRef, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'
import './style.scss'

interface PointHistory {
    id?: number | string
    name?: string
    category?: { id: number; name: string }
    subCategory?: { id: number; name: string }
    categoryId?: number
}

function cardView(cardData: PointHistory) {
    return (
        <>
            <div className='card-view__frame--unit'>
                <label>Catagory Name: </label>
                <Link className='card-view__frame--unit--name' to={`/categories/detail/${cardData.category?.id}`}>
                    {cardData.category?.name}
                </Link>
            </div>
            <div className='card-view__frame--unit'>
                <label>Sub-categories Name: </label>
                <Link className='card-view__frame--unit--name' to={`/sub-categories/detail/${cardData.subCategory?.id}`}>
                    {cardData.subCategory?.name}
                </Link>
            </div>
        </>
    )
}

const { RangePicker } = DatePicker;

export default function ProductsPage() {
    const POINTHISTORY_API = `points/point-history`
    let history = useHistory()
    const [form] = Form.useForm()
    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    const formSearch: any = () => {
        return <Form onFinish={onSubmit} form={form} className='form-search'>
            <Form.Item
                name='Sytems-conection'
                className='form-search__system'
            >
                <Select placeholder="System connection" showSearch>
                    <Select.Option value="2">Kaiin</Select.Option>
                    <Select.Option value="999">Kameiiten</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='deviceId'
                className='form-search__deviceId'>
                <Input placeholder='Device ID' />
            </Form.Item>
            <Form.Item
                name='customerID'
                className='form-search__deviceId'>
                <Input placeholder='Customer ID' />
            </Form.Item>
            <Form.Item
                name='type'
                className='form-search__system'
            >
                <Select placeholder="Type" showSearch>
                    <Select.Option value="init">Init</Select.Option>
                    <Select.Option value="grant">Grant</Select.Option>
                    <Select.Option value="attach">Attach</Select.Option>
                    <Select.Option value="exchange">Exchange</Select.Option>
                    <Select.Option value="dettach">Dettach</Select.Option>
                    <Select.Option value="cancel">Cancel</Select.Option>
                </Select>
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

    const columns: ColumnsType<PointHistory | object> = [
        {
            title: 'Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'System',
            dataIndex: 'appId',
            key: 'appId',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Device ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Customer Id',
            dataIndex: 'customerId',
            key: 'customerId',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Last point',
            dataIndex: 'balance',
            key: 'balance',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Expiration date',
            dataIndex: 'name',
            key: 'name',
            render: function nameCell(name: string, record: PointHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
    ]
    return (
        <Fragment>
            <div className='point-history'>
                <div className='point-history__title'>
                    Points history
                </div>
                {formSearch()}
                <ListView columns={columns} cardView={cardView} urlApi={POINTHISTORY_API} />
            </div>
        </Fragment>
    )
}
