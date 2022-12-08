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
import { default as Popover } from 'antd/es/popover'
import 'antd/es/popover/style/index.css'
import { default as Select } from 'antd/es/select'
import 'antd/es/select/style/index.css'
import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/index.css'
import api from 'constants/api'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { objectToSearchString } from 'serialize-query-params'
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
interface ISearch {
    type: string,
    txHash: string,
    status: string,
}

const { RangePicker } = DatePicker;

export default function TranisactionHistoyPage() {
    const TransactionHistory_API = `points/transaction-history`
    const [form] = Form.useForm()
    let history = useHistory()
    const [dataTransactionHistory, setDataTransactionHistor] = useState<any>()
    const [startTime, setStartTime] = useState<Date | String>()
    const [endTime, setEndTime] = useState<Date | String>()

    const onChange = (value, dateString: [string, string]) => {
        setStartTime(dateString[0])
        setEndTime(dateString[1])
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    async function getDataList(query?: string) {
        const covertQuery = query?.split('+').join('%20')
        console.log(covertQuery);

        try {
            if (!query) {
                const response = await api.get(`${TransactionHistory_API}`)
                const { transactionHistory: dataTransactionHistory } = response.data
                setDataTransactionHistor(dataTransactionHistory)
            }
            else {
                const response = await api.get(`${TransactionHistory_API}?${query}`)
                const { transactionHistory: dataTransactionHistory } = response.data
                setDataTransactionHistor(dataTransactionHistory)
            }
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

    const onSearchClick = async (value: ISearch) => {
        console.log(value);

        const startTimeDate = startTime === '' ? null : startTime
        const endTimeDate = endTime === '' ? null : endTime
        const txHashSearch = value.txHash === '' ? null : value.txHash

        const filter: Record<string, string | any> = {
            txHash: txHashSearch,
            type: value.type || undefined,
            status: value.status || undefined,
            startTime: startTimeDate,
            endTime: endTimeDate
        }

        const covertParams = objectToSearchString(filter)
        const covertQuery = covertParams?.split('+').join('%20')

        history.replace({ pathname: location.pathname, search: covertQuery })

        getDataList(covertParams)
    }

    const onSearch = async (values: any) => {
        onSearchClick(values)
    }


    const formSearch: any = () => {
        return <Form onFinish={onSearch} form={form} className='form-search'>
            <Form.Item
                name='txHash'
                className='form-search__deviceId'>
                <Input placeholder='Tx Hash' />
            </Form.Item>
            <Form.Item
                name='type'
                className='form-search__system'
            >
                <Select placeholder="Type" showSearch>
                    <Select.Option value="mint">Mint</Select.Option>
                    <Select.Option value="burn">Burn</Select.Option>
                    <Select.Option value="">All</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='status'
                className='form-search__system'
            >
                <Select placeholder="Status" showSearch>
                    <Select.Option value="submitted">Submitted</Select.Option>
                    <Select.Option value="confirmed">Comfirmed</Select.Option>
                    <Select.Option value="failed">Failed</Select.Option>
                    <Select.Option value="">All</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={onChange}
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
            title: 'Block Time',
            dataIndex: 'blockTime',
            key: 'blockTime',
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
                return <Popover content={name} placement='bottom' trigger="hover">
                    <div className='text'>{name}</div>
                </Popover>
            }
        },
        {
            title: 'Tx Hash',
            dataIndex: 'txid',
            key: 'txid',
        },
        {
            title: 'To Address',
            dataIndex: 'toAddress',
            key: 'toAddress',
            render: function nameCell(name: string, record: any) {
                return <Popover content={name} placement='bottom' trigger="hover">
                    <div className='text'>{name}</div>
                </Popover>
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
            render: function nameCell(name: string, record: any) {
                return <div style={{ textTransform: 'capitalize' }}>{name}</div>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: function nameCell(name: string, record: any) {
                return <div style={{ textTransform: 'capitalize' }}>{name}</div>
            }
        },
        {
            title: 'Scan',
            dataIndex: 'toAddress',
            key: 'toAddress',
            render: function nameCell(name: string, record: any) {
                return <a href={`https://preprod.cexplorer.io/address/${name}`}>🔗</a>
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
