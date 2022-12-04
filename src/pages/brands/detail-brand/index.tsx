import { default as Button } from 'antd/es/button'
import 'antd/es/button/style/index.css'
import { default as Descriptions } from 'antd/es/descriptions'
import 'antd/es/descriptions/style/index.css'
import { default as Image } from 'antd/es/image'
import 'antd/es/image/style/index.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../../constants/api'

interface Equipment {
    equipment: {
        id: number
        name: string
    }
}

interface Application {
    application: {
        id: number
        name: string
    }
}
interface Brands {
    brandName?: string
    image?: string
    description?: string
    country?: string
    referenceLink?: string
    equipments?: Equipment[]
    applications?: Application[]
}

interface Path {
    id: string
}

const api = axios.create({
    baseURL: `${API_URL}/brands`
})

const labelStyle = {
    fontWeight: 600,
    width: '15%'
}

export default function DetailBrand() {
    const [brand, setBrands] = useState<Brands>({})
    const path: Path = useParams()

    useEffect(() => {
        api.get(`/${path.id}`).then((res) => {
            return setBrands(res.data.data)
        })
    }, [])

    return (
        <Descriptions
            title='Detail Brand'
            bordered
            column={{ xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
            extra={
                <Button type='primary' style={{ borderRadius: '15px' }}>
                    <Link to={`/brand/update/${path.id}`}>Edit</Link>
                </Button>
            }>
            <Descriptions.Item label='Name:' labelStyle={labelStyle}>
                {brand.brandName}
            </Descriptions.Item>
            <Descriptions.Item label='Logo:' span={3} labelStyle={labelStyle}>
                <Image width={50} src={brand.image} />
            </Descriptions.Item>
            <Descriptions.Item label='Country:' span={3} labelStyle={labelStyle}>
                {brand.country}
            </Descriptions.Item>
            <Descriptions.Item label='Description:' span={3} labelStyle={labelStyle}>
                {brand.description}
            </Descriptions.Item>
            <Descriptions.Item label='Reference Link:' span={3} labelStyle={labelStyle}>
                <a href={`${brand.referenceLink}`}>{brand.referenceLink} </a>
            </Descriptions.Item>
            <Descriptions.Item label='Equipments:' labelStyle={labelStyle}>
                <ul>
                    {brand.equipments?.map((item, index: number) => {
                        return <li key={index}>{item.equipment.name}</li>
                    })}
                </ul>
            </Descriptions.Item>
            <Descriptions.Item label='Applications:' labelStyle={labelStyle}>
                <ul>
                    {brand.applications?.map((item, index: number) => {
                        return <li key={index}>{item.application.name}</li>
                    })}
                </ul>
            </Descriptions.Item>
        </Descriptions>
    )
}
