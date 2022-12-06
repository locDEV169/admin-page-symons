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
import 'antd/es/tooltip/style/index.css'
import api from 'constants/api'
import moment from 'moment'
import React, { Fragment, LegacyRef, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'
import './style.scss'

interface PointHistory {
    id?: number | string
    time?: string
    system?: string
    deviceId?: number
    customerId?: number
    type?: string
    amount?: number
    lastPoint?: number
    expiredTime?: any
    pointLog?: PointLog[]
    count?: number
}
interface PointLog {
    id?: string
    createdAt?: string | Date
    expireAt?: string | Date
    system?: string
    deviceId?: number
    customerId?: number
    type?: string
    amount?: number
    balance?: number
    lastPoint?: number
    expiredTime?: Date
    appId: number
}

const { RangePicker } = DatePicker;

export default function ProductsPage() {
    const POINTHISTORY_API = `points/point-history`
    let history = useHistory()
    const [form] = Form.useForm()
    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)
    const [dataPointLog, setDataPointLog] = useState<any>([])
    const [startTime, setStartTime] = useState<Date>()
    const [endTime, setEndTime] = useState<Date>()

    async function getDataList() {
        try {
            const response = await api.get(`${POINTHISTORY_API}`)
            const { pointHistory: dataPointHistory } = response.data
            convertData(dataPointHistory)
        } catch (err) {
            notification.error({
                message: 'Error is occured',
                description: 'No data found.'
            })
        }
    }

    useEffect(() => {
        getDataList()
    }, [])

    const onChange = (value, dateString) => {
        setStartTime(dateString[0])
        setEndTime(dateString[1])
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    const onSearchClick = async (value: any) => {
        console.log(value);
        const filter: Record<string, string> = {
            appId: `${value.appId}`,
            deviceId: `${value.deviceId}`,
            type: `${value.type}`,
            customerId: `${value.customerId}`,
        }
        const params = new URLSearchParams(filter)
        history.replace({ pathname: location.pathname, search: params.toString() })

        const response = await api.get(`${POINTHISTORY_API}`, value)
        console.log(response?.data?.pointHistory);
        response.data.pointHistory.map((item: any) => item.pointLog.map((itemPointLog: PointLog) =>
            setDataPointLog((prev) =>
                [...prev, {
                    itemPointLog,
                    customerId: item.customerId,
                    type: itemPointLog.type,
                    createdAt: moment(itemPointLog.createdAt).format("YYYY/MM/DD HH:MM:SS"),
                    amount: itemPointLog.amount,
                    balance: itemPointLog.balance,
                    deviceId: itemPointLog.deviceId,
                    appId: formatApp(itemPointLog.appId),
                    expireAt: moment(item.expireAt).format("YYYY/MM/DD HH:MM:SS"),
                }
                ]
            )
        )
        )
    }

    const onSearch = async (values: any) => {
        onSearchClick(values)
    }

    const convertData = (values: any) => {
        values.map((item: any) => item.pointLog.map((itemPointLog: PointLog) =>
            setDataPointLog((prev) =>
                [...prev, {
                    itemPointLog,
                    customerId: item.customerId,
                    type: itemPointLog.type,
                    createdAt: moment(itemPointLog.createdAt).format("YYYY/MM/DD HH:MM:SS"),
                    amount: itemPointLog.amount,
                    balance: itemPointLog.balance,
                    deviceId: itemPointLog.deviceId,
                    appId: formatApp(itemPointLog.appId),
                    expireAt: moment(item.expireAt).format("YYYY/MM/DD HH:MM:SS"),
                }
                ]
            )
        )
        )
    }

    const formatApp = (value: number) => {
        switch (value) {
            case 2:
                return 'Kaiin'
                break;
            case 999:
                return 'Kameiiten'
                break;
            default:
                break;
        }
    }

    const formSearch: any = () => {
        return <Form form={form} className='form-search' onFinish={onSearch}>
            <Form.Item
                name='appId'
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
                name='customerId'
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
                    <Select.Option value="cansel">Cancel</Select.Option>
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

    const columns: ColumnsType<PointHistory | object> = [
        {
            title: 'Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: function nameCell(name: string, record: PointHistory) {
                return (
                    <div>
                        {name.split(" ").map((line, index) => (
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
            title: 'System',
            dataIndex: 'appId',
            key: 'appId',
        },
        {
            title: 'Device ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: 'Customer Id',
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Last point',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Expiration date',
            dataIndex: 'expireAt',
            key: 'expireAt',
            render: function nameCell(name: string, record: PointHistory) {
                return (
                    <div>
                        {name.split(" ").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                );
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
                <Table columns={columns} dataSource={dataPointLog} pagination={{ pageSize: 10 }} />
            </div>
        </Fragment>
    )
}
