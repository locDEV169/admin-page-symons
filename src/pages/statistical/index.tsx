import { notification } from 'antd'
import { default as DatePicker } from 'antd/es/date-picker'
import 'antd/es/date-picker/style/index.css'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input-number/style/index.css'
import 'antd/es/input/style/index.css'
import { default as Modal } from 'antd/es/modal'
import 'antd/es/modal/style/index.css'
import 'antd/es/pagination/style/index.css'
import { default as Radio, RadioChangeEvent } from 'antd/es/radio'
import 'antd/es/radio/style/index.css'
import 'antd/es/select/style/index.css'
import { ColumnsType, default as Table } from 'antd/es/table'
import 'antd/es/table/style/index.css'
import 'antd/lib/modal/style/index.css'
import api from 'constants/api'
import { forEach, setWith } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { objectToSearchString } from 'serialize-query-params'
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
    const [checkStatus, setCheckStatus] = useState<number>(1)
    const [status, setStatus] = useState<string>('store')
    const [dataStatistical, setDataStatistical] = useState<any[]>()
    const [dataDevice, setDataDevice] = useState<any>()
    const [open, setOpen] = useState<Boolean>(false);
    const [cid, setCid] = useState<any>()
    const [startTime, setStartTime] = useState<Date | String>()
    const [endTime, setEndTime] = useState<Date | String>()


    const onOk = (value: any) => {
        console.log('onOk: ', value);
    };

    async function getDataList(query?: string) {
        try {
            const response = await api.get(`${Statistical_API}/${checkStatus === 1 ? 'store' : 'member'}`)
            const { statistical: dataStatisticalHistory } = response.data
            setDataStatistical(dataStatisticalHistory)
            if (!query) {
                const response = await api.get(`${Statistical_API}/${checkStatus === 1 ? 'store' : 'member'}`)
                const { statistical: dataStatisticalHistory } = response.data
                setDataStatistical(dataStatisticalHistory)
            }
            else {
                console.log(`${Statistical_API}/${checkStatus === 1 ? 'store' : 'member'}?${query}`);

                const response = await api.get(`${Statistical_API}/${checkStatus === 1 ? 'store' : 'member'}?${query}`)
                const { statistical: dataStatisticalHistory } = response.data
                setDataStatistical(dataStatisticalHistory)
            }
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
        return <Form onFinish={onSearch} form={form} className='form-search'>
            <Form.Item
                name={value === 1 ? 'storeId' : 'customerId'}
                className='form-search__deviceId'>
                <Input placeholder={value === 1 ? 'Store ID' : 'Customer ID'} />
            </Form.Item>
            <Form.Item>
                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={onChangeRangePicker}
                    placeholder={["Start Time", "End Time"]}
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

    const columnsCustomerID: ColumnsType<Statistical | object | any> = [
        {
            title: 'Customer ID',
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: 'Init',
            dataIndex: 'initCount',
            key: 'initCount',
            render: function nameCell(name: string) {
                var totalInit: number = 0
                Object.values(name).map((item) => {
                    totalInit += Number(item)
                })


                return (
                    <div>
                        {totalInit}
                    </div>
                );
            }
        },
        {
            title: 'Grant',
            dataIndex: 'grantCount',
            key: 'grantCount',
            render: function nameCell(name: string) {
                var totalGrant: any = 0
                Object.values(name).map((item) => {
                    totalGrant += item
                })


                return (
                    <div>
                        {totalGrant}
                    </div>
                );
            }
        },
        {
            title: 'Attach',
            dataIndex: 'attachCount',
            key: 'attachCount',
            render: function nameCell(name: string) {
                var totalAttach: any = 0
                Object.values(name).map((item) => {
                    totalAttach += item
                })


                return (
                    <div>
                        {totalAttach}
                    </div>
                );
            }
        },
        {
            title: 'Exchange',
            dataIndex: 'exchangeCount',
            key: 'exchangeCount',
            render: function nameCell(name: string) {
                var totalExchange: any = 0
                Object.values(name).map((item) => {
                    totalExchange += item
                })


                return (
                    <div>
                        {totalExchange}
                    </div>
                );
            }
        },
        {
            title: 'Cansel',
            dataIndex: 'canselCount',
            key: 'canselCount',
            render: function nameCell(name: string) {
                var totalCansel: any = 0
                Object.values(name).map((item) => {
                    totalCansel += item
                })


                return (
                    <div>
                        {totalCansel}
                    </div>
                );
            }
        },
        {
            title: 'Detach',
            dataIndex: 'detachCount',
            key: 'detachCount',
            render: function nameCell(name: string) {
                var totalDetach: any = 0
                Object.values(name).map((item) => {
                    totalDetach += item
                })


                return (
                    <div>
                        {totalDetach}
                    </div>
                );
            }
        },
        {
            title: 'Expired',
            dataIndex: 'expiredCount',
            key: 'expiredCount',
            render: function nameCell(name: string) {
                var totalExpired: any = 0
                Object.values(name).map((item) => {
                    totalExpired += item
                })


                return (
                    <div>
                        {totalExpired}
                    </div>
                );
            }
        },
        {
            title: 'Total',
            dataIndex: 'totalCount',
            key: 'totalCount',
            render: function nameCell(name: string) {
                var totalExpired: any = 0
                Object.values(name).map((item) => {
                    totalExpired += item
                })


                return (
                    <div>
                        {totalExpired}
                    </div>
                );
            }
        },
    ]

    const columnsStoreID: ColumnsType<Statistical | object> = [
        {
            title: 'Store ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: 'Init',
            dataIndex: 'initCount',
            key: 'initCount',
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
            title: 'Expired',
            dataIndex: 'expiredCount',
            key: 'expiredCount',
        },
        {
            title: 'Total',
            dataIndex: 'totalCount',
            key: 'totalCount',
        },
    ]

    const convertData = (obj, id) => {
        let data = {}
        forEach(obj, (value, key) => {
            if (key.includes('Count')) {
                Object.keys(value).forEach(deviceId => {
                    setWith(data, [deviceId, key], value[deviceId])
                })
            }
        })
        const result = [data]
            .flatMap(Object.entries)
            .map(([deviceId, props]) => ({ ...props, deviceId }))
        setDataDevice(result)
    }
    const columnsDeviceId: ColumnsType<Statistical | object> = [
        {
            title: 'Device ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: 'Init',
            dataIndex: 'initCount',
            key: 'initCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Grant',
            dataIndex: 'grantCount',
            key: 'grantCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Attach',
            dataIndex: 'attachCount',
            key: 'attachCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Exchange',
            dataIndex: 'exchangeCount',
            key: 'exchangeCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Cansel',
            dataIndex: 'canselCount',
            key: 'canselCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Detach',
            dataIndex: 'detachCount',
            key: 'detachCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Expired',
            dataIndex: 'expiredCount',
            key: 'expiredCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
        {
            title: 'Total',
            dataIndex: 'totalCount',
            key: 'totalCount',
            render: function nameCell(name: string) {
                return name || 0
            }
        },
    ]

    const onChange = (e: RadioChangeEvent) => {
        setCheckStatus(e.target.value);
    };

    const onChangeRangePicker = (value, dateString: [string, string]) => {
        setStartTime(dateString[0])
        setEndTime(dateString[1])
    }

    const onpenModal = async (value) => {
        setCid(value.customerId)
        checkStatus === 1 ? setOpen(false) : setOpen(!open)
        convertData((dataStatistical || []).filter(d => d.customerId === value.customerId)[0], value.customerId)
    }

    const onSearchClick = async (value: any, modalType: number) => {
        const startTimeDate = startTime || undefined
        const endTimeDate = endTime || undefined
        const id = value.storeId || value.customerId || undefined
        switch (modalType) {
            case 1: // store
                break;
            case 2: // member
                const deviceId = value.deviceId || undefined
                if (!deviceId) {
                    return convertData((dataStatistical || []).filter(d => d.customerId === id)[0], id)
                }
                return setDataDevice(dataDevice.filter(a => (a.deviceId || '').toLowerCase().indexOf(deviceId.toLowerCase()) !== -1))
            default:
                break;
        }

        const filter: Record<string, string | any> = {
            id: id,
            startTime: startTimeDate,
            endTime: endTimeDate
        }

        const covertParams = objectToSearchString(filter)
        const covertQuery = covertParams?.split('+').join('%20')

        history.replace({ pathname: location.pathname, search: covertQuery })

        getDataList(covertParams)
    }

    const onSearch = async (values: any, modalType: number) => {
        onSearchClick(values, modalType)
    }

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
                        onRow={(record, rowIndex) => {
                            return {
                                // click row
                                onClick: event => {
                                    setCid(record.customerId)
                                    onpenModal(record)
                                }
                            };
                        }}
                    />
                    <Modal
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                        className='modal'
                    >
                        <div className='title'>
                            Customer ID: {cid}
                        </div>
                        <Form onFinish={(values: any) => onSearch(values, checkStatus)} form={form} className='form-search'>
                            <Form.Item
                                name='customerId'
                                className='form-search__deviceId'
                                initialValue={cid}
                                style={{ display: 'none' }}
                            >
                            </Form.Item>
                            <Form.Item
                                name='deviceId'
                                className='form-search__deviceId'>
                                <Input placeholder='Device ID' />
                            </Form.Item>
                            <Form.Item>
                                <VButton type='primary' className='form-search__btnSearch' htmlType='submit'>
                                    Search
                                </VButton>
                            </Form.Item>
                        </Form>
                        <Table
                            columns={columnsDeviceId}
                            dataSource={dataDevice}
                            pagination={{ pageSize: 10 }}
                        />
                    </Modal>
                </div>

            </div>
        </Fragment>
    )
}
