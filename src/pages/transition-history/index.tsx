import { default as DatePicker } from 'antd/es/date-picker'
import 'antd/es/date-picker/style/index.css'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import { default as Select } from 'antd/es/select'
import 'antd/es/select/style/index.css'
import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/index.css'
import React, { Fragment, LegacyRef, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'
import './style.scss'

interface TransactionHistory {
    id?: number | string
    name?: string
    category?: { id: number; name: string }
    subCategory?: { id: number; name: string }
    categoryId?: number
}

const { RangePicker } = DatePicker;

export default function ProductsPage() {
    const TransactionHistory_API = `points/point-history`
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
                name='Tx Hash'
                className='form-search__deviceId'>
                <Input placeholder='Tx Hash' />
            </Form.Item>
            <Form.Item
                name='Type'
                className='form-search__system'
            >
                <Select placeholder="Type" showSearch>
                    <Select.Option value="2">Kaiin</Select.Option>
                    <Select.Option value="999">Kameiiten</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='Status'
                className='form-search__system'
            >
                <Select placeholder="Status" showSearch>
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

    const columns: ColumnsType<TransactionHistory | object> = [
        {
            title: 'BlockTime',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Block Number',
            dataIndex: 'appId',
            key: 'appId',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Block Hash',
            dataIndex: 'deviceId',
            key: 'deviceId',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Tx Hash',
            dataIndex: 'customerId',
            key: 'customerId',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'To Address',
            dataIndex: 'type',
            key: 'type',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Fee',
            dataIndex: 'balance',
            key: 'balance',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Type',
            dataIndex: 'name',
            key: 'name',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Status',
            dataIndex: 'balance',
            key: 'balance',
            render: function nameCell(name: string, record: TransactionHistory) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        }
    ]
    return (
        <Fragment>
            <div className='point-history'>
                <div className='point-history__title'>
                    Transaction history
                </div>
                {formSearch()}
                <Table columns={columns} />
            </div>
        </Fragment>
    )
}