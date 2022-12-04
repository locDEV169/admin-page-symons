import { default as Skeleton } from 'antd/es/skeleton'
import 'antd/es/skeleton/style/index.css'
import { default as React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsername, updateUsername } from '../../store/slices/auth'

export default function HomePage() {
    const dispatch = useDispatch()
    const username = useSelector(selectUsername)

    useEffect(() => {
        dispatch(updateUsername('hello'))
    }, [])

    return <Skeleton active />
}
