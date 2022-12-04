import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input/style/index.css'
import { default as Space } from 'antd/es/space'
import 'antd/es/space/style/index.css'
import { ColumnsType } from 'antd/es/table'
import 'antd/es/tooltip/style/index.css'
import { ListView } from 'components/list-view'
import React, { LegacyRef, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { VButton } from 'vendor/pages'

interface Products {
    id?: number | string
    name?: string
    category?: { id: number; name: string }
    subCategory?: { id: number; name: string }
    categoryId?: number
}

const renderImageTable = (image: string) => {
    const getImageString = image.split(',')
    return <img style={{ width: '70px', height: '70px' }} src={getImageString[0]} />
}

function cardView(cardData: Products) {
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

export default function ProductsPage() {
    const PRODUCT_API = `products`
    let history = useHistory()
    const [form] = Form.useForm()

    const params = new URLSearchParams(location.search)
    const keyword: LegacyRef<Input> = useRef(null)

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: function renderFilter({ confirm, clearFilters }) {
            const handleSearch = (dataIndex) => {
                confirm()
                params.set('page', `1`)
                params.set(`${dataIndex}`, `${keyword.current?.input.value || ''}`)
                history.replace({ pathname: location.pathname, search: params.toString() })
            }
            return (
                <div style={{ padding: 8 }}>
                    <Form form={form}>
                        <Form.Item name={dataIndex}>
                            <Input
                                autoFocus
                                placeholder={`Type text here `}
                                name={dataIndex}
                                type={dataIndex}
                                ref={keyword}
                                defaultValue={params.get(`${dataIndex}`) || ''}
                                onPressEnter={() => handleSearch(dataIndex)}
                                style={{ marginBottom: 8, display: 'block' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <VButton
                                    type='primary'
                                    onClick={() => handleSearch(dataIndex)}
                                    icon={<SearchOutlined />}
                                    size='small'
                                    style={{ width: 90 }}>
                                    Search
                                </VButton>
                                <VButton
                                    onClick={() => {
                                        clearFilters()
                                        form.resetFields([`${dataIndex}`])
                                        params.delete(dataIndex)
                                        history.replace({ pathname: location.pathname, search: params.toString() })
                                    }}
                                    size='small'
                                    style={{ width: 90 }}>
                                    Reset
                                </VButton>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            )
        },
        filterIcon: function renderIcon() {
            return <SearchOutlined />
        }
    })
    const columns: ColumnsType<Products | object> = [
        {
            title: 'Products Name',
            dataIndex: 'name',
            key: 'name',
            render: function nameCell(name: string, record: Products) {
                return <Link to={`products/detail/${record.id}`}>{name}</Link>
            }
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '70px',
            render: renderImageTable
        },
        {
            title: 'Categories Name',
            dataIndex: 'category',
            key: 'category',
            render: function categoryNameCell(category: { name: string }, record: Products) {
                return <Link to={`/categories/detail/${record.categoryId}`}>{category.name}</Link>
            },
            ...getColumnSearchProps('category')
        },
        {
            title: 'Sub-categories Name',
            dataIndex: 'subCategory',
            key: 'subCategory',
            render: function subCategoryNameCell(subCategory: { name: string }, record: Products) {
                return <Link to={`/sub-categories/detail/${record.id}`}>{subCategory.name}</Link>
            },
            ...getColumnSearchProps('subcategory')
        }
    ]
    return (
        <>
            <Link to='/products/create'>
                <VButton type='primary'>
                    <PlusOutlined />
                    Add
                </VButton>
            </Link>
            <ListView columns={columns} cardView={cardView} urlApi={PRODUCT_API} />
        </>
    )
}
