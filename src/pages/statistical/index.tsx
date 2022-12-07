import { notification } from 'antd'
import { default as DatePicker } from 'antd/es/date-picker'
import 'antd/es/date-picker/style/index.css'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import 'antd/es/pagination/style/index.css'
import { default as Radio, RadioChangeEvent } from 'antd/es/radio'
import 'antd/es/radio/style/index.css'
import 'antd/es/select/style/index.css'
import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/index.css'
import api from 'constants/api'
import React, { Fragment, LegacyRef, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'
import './style.scss'

interface Statistical {
    id?: number | string
    storeId?: number | string
    customerId?: number | string
    lastPoint: number
    statistical?: any
    count?: number
}

const { RangePicker } = DatePicker;

export default function StatisticalPage() {
    const Statistical_API = `points/statistical`
    let history = useHistory()
    const [form] = Form.useForm()
    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)
    const [checkStatus, setCheckStatus] = useState<number>(1)
    const [status, setStatus] = useState<string>('store')
    const [dataStatistical, setDataStatistical] = useState<Statistical[]>()

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    async function getDataList(query?: string) {
        try {
            const response = await api.get(`${Statistical_API}/${checkStatus === 1 ? 'store' : 'member'}`)
            console.log(`${Statistical_API}/${status}`);
            const { statistical: dataStatisticalHistory } = response.data
            setDataStatistical(dataStatisticalHistory)
        } catch (err) {
            notification.error({
                message: 'Error is occured',
                description: 'No data found.'
            })
        }
    }

    useEffect(() => {
        getDataList()
        return checkStatus === 1 ? setStatus('store') : setStatus('member')
    }, [])

    useEffect(() => {
        getDataList()
        return checkStatus === 1 ? setStatus('store') : setStatus('member')
    }, [checkStatus])

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
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: 'Lastest Point',
            dataIndex: 'balance',
            key: 'balance',
        },
    ]

    const columnsStoreID: ColumnsType<Statistical | object> = [
        {
            title: 'Store ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: 'Grant',
            dataIndex: 'grantCount',
            key: 'grantCount',
        },
        {
            title: 'Attach',
            dataIndex: 'attachCount',
            key: 'attachCount',
        },
        {
            title: 'Exchange',
            dataIndex: 'exchangeCount',
            key: 'exchangeCount',
        },
        {
            title: 'Cansel',
            dataIndex: 'canselCount',
            key: 'canselCount',
        },
        {
            title: 'Detach',
            dataIndex: 'detachCount',
            key: 'detachCount',
        },
        {
            title: 'Init',
            dataIndex: 'initCount',
            key: 'initCount',
        },
        {
            title: 'Total',
            dataIndex: 'balance',
            key: 'balance',
        },
    ]

    const onChange = (e: RadioChangeEvent) => {
        setCheckStatus(e.target.value);
    };

    return (
        <Fragment>
            <div className='title'>
                Statistical
            </div>
            <div className='statistical'>

                {formSearch(checkStatus)}
                <div className='statistical__table'>
                    <div className='statistical__radioGroup'>
                        <Radio.Group onChange={onChange} value={checkStatus}>
                            <Radio value={1}>Store ID</Radio>
                            <Radio value={2}>Customer ID</Radio>
                        </Radio.Group>
                    </div>
                    <Table
                        columns={checkStatus === 1 ? columnsStoreID : columnsCustomerID}
                        dataSource={dataStatistical}
                    />
                </div>

            </div>
        </Fragment>
    )
}
