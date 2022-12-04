import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons'
import { default as Button } from 'antd/es/button'
import 'antd/es/button/style/index.css'
import { default as Collapse } from 'antd/es/collapse'
import 'antd/es/collapse/style/index.css'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { Link } from 'react-router-dom'
import { ListView } from '../../components/list-view'
import { API_URL } from '../../constants/api'

interface ProductData {
    id?: number | string
    name?: string
    image?: string
    catalogNumber?: string
    description?: string
    standardPackage?: number
    cubic?: number
    ship?: number
    price?: number
}
interface NumberFormat {
    format(value?: number): string
}
const numberFormat: NumberFormat = Intl.NumberFormat('en-US')

const { Panel } = Collapse

const renderNumberTable = (text: number) => {
    return numberFormat.format(text)
}

const renderImageTable = (image: string) => {
    const getImageString = image.split(',')
    return <img style={{ width: '70px', height: '70px' }} src={getImageString[0]} />
}

const columns: ColumnsType<ProductData | object> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        width: '70px',
        render: renderImageTable
    },
    {
        title: 'Catalog Number',
        dataIndex: 'catalogNumber',
        key: 'catalogNumber'
    },
    {
        title: 'Std.Pkg.',
        dataIndex: 'standardPackage',
        key: 'standardPackage',
        render: renderNumberTable
    },
    {
        title: 'Cubic feet',
        dataIndex: 'cubic',
        key: 'cubic',
        render: renderNumberTable
    },
    {
        title: 'Std.Pkg.Ship Wt.',
        dataIndex: 'ship',
        key: 'ship',
        render: function renderStdPackageTable(ship: number) {
            return numberFormat.format(ship) + ` lbs.`
        }
    },
    {
        title: 'List Price',
        key: 'price',
        dataIndex: 'price',
        render: function renderPriceTable(price: number) {
            return `$` + numberFormat.format(price)
        }
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: '',
        render: function renderAction(id) {
            return (
                <>
                    <Link style={{ marginRight: '10px' }} to={`/product/update/${id}`}>
                        Edit
                    </Link>
                    <Link to={`/product/detail/${id}`}>More</Link>
                </>
            )
        }
    }
]

function cardView(cardData: ProductData) {
    return (
        <div className='card-view' key={cardData.id}>
            <Collapse
                accordion
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
                expandIconPosition='right'
                className='site-collapse-custom-collapse card-view__frame'>
                <Panel header={<label> {cardData.name}</label>} key='id' extra={`$` + numberFormat.format(cardData.price)}>
                    <div className='card-view__frame--unit'>
                        <label>Image: </label>
                        {renderImageTable(`${cardData.image}`)}
                    </div>
                    <div className='card-view__frame--unit'>
                        <label>CatalogNumber: </label>
                        <p>{cardData.catalogNumber}</p>
                    </div>
                    <div className='card-view__frame--unit'>
                        <label>Std.Pkg: </label>
                        <p> {numberFormat.format(cardData.standardPackage)}</p>
                    </div>
                    <div className='card-view__frame--unit'>
                        <label>Cubic feet: </label>
                        <p> {numberFormat.format(cardData.cubic)}</p>
                    </div>
                    <div className='card-view__frame--unit'>
                        <label>Std.Pkg.Ship Wt.: </label>
                        <p> {numberFormat.format(cardData.ship) + `lbs.`}</p>
                    </div>
                    <div className='card-view__frame--unit'>
                        <Link style={{ width: '100%' }} to={`/product/update/${cardData.id}`}>
                            <Button style={{ width: '100%' }} type='primary'>
                                Edit
                            </Button>
                        </Link>
                        <Link style={{ width: '100%' }} to={`/product/detail/${cardData.id}`}>
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
export default function ProductsPage() {
    const PRODUCTS_API = `${API_URL}/products`
    return (
        <>
            <Link to='/product/create'>
                <Button type='primary'>
                    <PlusOutlined />
                    Add
                </Button>
            </Link>
            <ListView columns={columns} urlApi={PRODUCTS_API} cardView={cardView} />
        </>
    )
}
