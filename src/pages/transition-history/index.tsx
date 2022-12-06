import { default as DatePicker } from 'antd/es/date-picker'
import 'antd/es/date-picker/style/index.css'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import 'antd/es/pagination/style/index.css'
import { default as Select } from 'antd/es/select'
import 'antd/es/select/style/index.css'
import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/index.css'
import api from 'constants/api'
import moment from 'moment'
import React, { Fragment, LegacyRef, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'
import './style.scss'

interface TransactionHistory {
    id?: number | string
    blockTime?: any
    blockNumber?: number
    blockHash?: string
    txHash?: string
    toAdress?: string
    amount?: number
    fee?: number
    type?: string
    status?: string
    count?: number
}

const { RangePicker } = DatePicker;

export default function TranisactionHistoyPage() {
    const TransactionHistory_API = `points/transaction-history`
    let history = useHistory()
    const [form] = Form.useForm()
    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)
    const [dataTransactionHistory, setDataTransactionHistor] = useState<any>()

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    async function getDataList() {
        try {
            const response = await api.get(`${TransactionHistory_API}`)
            const { transactionHistory: dataTransactionHistory } = response.data
            // console.log(dataTransactionHistory)
            setDataTransactionHistor(dataTransactionHistory)
            // const { totalRecords: totalRecords } = response.data.data
            // const response2 = await api.get(`categories?limit=${totalRecords}`)
            // const { pointHistory: dataCategories } = response2.data
            // setData((prev) => ({ ...prev, dataCategories }))
        } catch (err) {
            notification.error({
                message: 'Error is occured',
                description: 'No data found.'
            })
        }
    }
    console.log(dataTransactionHistory);

    useEffect(() => {
        getDataList()
    }, [])

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
            render: function nameCell(name: string) {
                const time = moment(name).format("YYYY/MM/DD HH:MM:SS")
                return (
                    <div>
                        {time.split(" ").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                );
            }
        },
        {
            title: 'Block Number',
            dataIndex: 'blockNumber',
            key: 'blockNumber',
        },
        {
            title: 'Block Hash',
            dataIndex: 'blockHash',
            key: 'blockHash',
            render: function nameCell(name: string, record: any) {
                return <div className='text'>{name}</div>
            }
        },
        {
            title: 'Tx Hash',
            dataIndex: 'blockNumber',
            key: 'customerId',
        },
        {
            title: 'To Address',
            dataIndex: 'toAddress',
            key: 'toAddress',
            render: function nameCell(name: string, record: any) {
                return <div className='text'>{name}</div>
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: function nameCell(name: string, record: any) {
                return <div style={{ textTransform: 'capitalize' }}>{name}</div>
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
                <Table columns={columns} dataSource={dataTransactionHistory} />
            </div>
        </Fragment>
    )
}
