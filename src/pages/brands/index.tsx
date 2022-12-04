import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons'
import { default as Button } from 'antd/es/button'
import 'antd/es/button/style/index.css'
import { default as Collapse } from 'antd/es/collapse'
import 'antd/es/collapse/style/index.css'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { Link } from 'react-router-dom'
import { ListView } from '../../components/list-view'
import API_URL from '../../constants/api'
import './style.scss'

interface Equipments {
    equipment?: Equipment
}
interface Equipment {
    id: number | string
    name: string
}
interface Applications {
    application?: Application
}
interface Application {
    id: number | string
    name: string
}
interface Brands {
    id?: string | number
    brandName?: string
    image?: string
    description?: string
    equipments?: Equipments[]
    applications?: Applications[]
}

const { Panel } = Collapse

function ApplicationCell(applications) {
    return (
        <div className='brand-page-cell'>
            {applications.map((application: Applications) => {
                return <p key={application.application?.id}>{application.application?.name} </p>
            })}
        </div>
    )
}

function EquipmentCell(equipments) {
    return (
        <div className='brand-page-cell'>
            {equipments.map((equipment: Equipments) => {
                return <p key={equipment.equipment?.id}>{equipment.equipment?.name} </p>
            })}
        </div>
    )
}

const renderImageTable = (image: string) => {
    const getImageString = image.split(',')
    return <img style={{ width: '70px', height: '70px' }} src={getImageString[0]} />
}

const columns: ColumnsType<Brands | object> = [
    {
        title: 'Name',
        dataIndex: 'brandName',
        key: 'brandName'
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        width: '70px',
        render: renderImageTable
    },
    {
        title: 'Equipments',
        dataIndex: 'equipments',
        key: 'equipments',
        render: EquipmentCell
    },
    {
        title: 'Applications',
        dataIndex: 'applications',
        key: 'applications',
        render: ApplicationCell
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: '',
        render: function RenderAction(id) {
            return (
                <>
                    <Link style={{ marginRight: '10px' }} to={`/brand/update/${id}`}>
                        Edit
                    </Link>
                    <Link to={`/brand/detail/${id}`}>More</Link>
                </>
            )
        }
    }
]

function CardView(cardData: Brands) {
    return (
        <div className='card-view' key={cardData.id}>
            <Collapse
                accordion
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
                expandIconPosition='right'
                className='site-collapse-custom-collapse card-view__frame'>
                <Panel header={<label> {cardData.brandName}</label>} key='id' extra={renderImageTable(`${cardData.image}`)}>
                    <div className='card-view__frame--unit'>
                        <label>Equipments: </label>
                        {EquipmentCell(cardData.equipments)}
                    </div>
                    <div className='card-view__frame--unit'>
                        <label>Applications: </label>
                        {ApplicationCell(cardData.applications)}
                    </div>

                    <div className='card-view__frame--unit'>
                        <Link style={{ width: '100%' }} to={`/brand/update/${cardData.id}`}>
                            <Button style={{ width: '100%' }} type='primary'>
                                Edit
                            </Button>
                        </Link>
                        <Link style={{ width: '100%' }} to={`/brand/detail/${cardData.id}`}>
                            <Button style={{ width: '100%' }} type='primary'>
                                More
                            </Button>
                        </Link>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default function BrandPage() {
    const BRANDS_API = `${API_URL}/brands`
    return (
        <>
            <Link to='/brand/create'>
                <Button type='primary'>
                    <PlusOutlined />
                    Add
                </Button>
            </Link>
            <ListView columns={columns} urlApi={BRANDS_API} cardView={CardView} />
        </>
    )
}
