import {
    DownOutlined, LoginOutlined
} from '@ant-design/icons';
import 'antd/es/drawer/style/index.css';
import { default as Dropdown } from 'antd/es/dropdown';
import 'antd/es/dropdown/style/index.css';
import { default as Menu } from 'antd/es/menu';
import 'antd/es/menu/style/index.css';
import debounce from 'debounce';
import Cookies from 'js-cookie';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { VHeader } from 'vendor/layout';
import { selectCollapsed, toogleSider } from '../../store/slices/app';
import '../header/header.scss';

function useWindowSize(delay = 100) {
    const [size, setSize] = useState<number>(window.innerWidth)

    useEffect(() => {
        const updateSize = () => setSize(window.innerWidth)
        const debounceDropDown = debounce(updateSize, delay)
        window.addEventListener('resize', debounceDropDown)

        return () => {
            window.removeEventListener('resize', debounceDropDown)
        }
    }, [delay])

    return size
}

export function MainHeader() {
    const collapsed = useSelector(selectCollapsed)
    const dispatch = useDispatch()
    const getUserName = Cookies.get('username')
    const width: number = useWindowSize()
    const [visible, setVisible] = useState<boolean>(false)
    const toggle = () => {
        dispatch(toogleSider(collapsed ? false : true))
    }
    const location = useLocation()
    const { pathname } = location

    const logOut = () => {
        Cookies.remove('username')
        Cookies.remove('token')
        window.location.href = '/'
    }

    const item = (
        <Menu>
            <Menu.Item key='1' onClick={logOut} icon={<LoginOutlined />} danger className='dropbox__menu'>
                LogOut
            </Menu.Item>
        </Menu>
    )
    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }


    return (
        <VHeader className='site-layout-background' style={{ padding: 0 }} id='header-background'>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: width > 468 ? toggle : showDrawer
            })} */}
            <div className="nav-left">
                <Menu mode="horizontal" defaultSelectedKeys={['1']} className='nav-left__menu'>
                    <Menu.Item key='1'>
                        <Link to='/points-history'><span className="sider-span">Point History</span></Link>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Link to='/product'><span className="sider-span">Transaction History</span></Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Link to='/brand'>
                            <span className='sider-span'>Statistical</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="nav-right">
                <h3 id='nav-name'>
                    <Dropdown overlay={item}>
                        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                            Hi,{getUserName} <DownOutlined />
                        </a>
                    </Dropdown>
                </h3>
            </div>
        </VHeader>
    )
}
