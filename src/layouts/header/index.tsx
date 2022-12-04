import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import Cookies from 'js-cookie'
import { default as React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VHeader } from 'vendor/layout'
import { VButton } from 'vendor/pages'
import { selectCollapsed, toogleSider } from '../../store/slices/app'
import '../header/header.scss'
const { Header } = Layout

export function MainHeader() {
    const collapsed = useSelector(selectCollapsed)
    const dispatch = useDispatch()
    const getUserName = Cookies.get('username')

    console.log(`collapsed`, collapsed)
    const toggle = () => {
        dispatch(toogleSider(collapsed ? false : true))
    }

    const logOut = () => {
        Cookies.remove('username')
        window.location.href = '/'
    }

    return (
        <VHeader className='site-layout-background' style={{ padding: 0 }} id='header-background'>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle
            })}
            <div id='nav-name'>Hi,<span>{getUserName}</span></div>
            <VButton id='nav-action' onClick={logOut}>
                LogOut
            </VButton>
        </VHeader>
    )
}
