import {
    DownOutlined,
    HomeOutlined,
    LoginOutlined, PartitionOutlined,
    ShoppingCartOutlined,
    TableOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { default as Drawer } from 'antd/es/drawer';
import 'antd/es/drawer/style/index.css';
import { default as Dropdown } from 'antd/es/dropdown';
import 'antd/es/dropdown/style/index.css';
import { Header } from 'antd/es/layout/layout';
import { default as Menu } from 'antd/es/menu';
import 'antd/es/menu/style/index.css';
import SubMenu from 'antd/es/menu/SubMenu';
import debounce from 'debounce';
import Cookies from 'js-cookie';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { VHeader, VSider } from 'vendor/layout';
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
            <Menu.Item key='1' onClick={logOut} icon={<LoginOutlined />} danger>
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

    const getDrawer = () => {
        return (
            <Drawer placement='left' closable={false} onClose={() => onClose()} visible={visible} zIndex={10}>
                <VSider trigger={null} collapsible id='sider'>
                    <div className='logo' />
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={[pathname.split('/')[1]]}>
                        <Menu.Item key='' icon={<HomeOutlined />}>
                            <Link to='/'>
                                <span className='sider-span'>Home</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key='1' icon={<TableOutlined />} title='Categories'>
                            <Menu.Item key='categories'>
                                <Link to='/categories'>
                                    <span className='sider-span'>List</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='sub-categories'>
                                <Link to='/sub-categories'>
                                    <span className='sider-span'>Sub-Categories</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key='2' icon={<PartitionOutlined />} title='Products'>
                            <Menu.Item key='products'>
                                <Link to='/products'>
                                    <span className='sider-span'>List</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='attributes'>
                                <Link to='/attributes'>
                                    <span className='sider-span'>Attribute</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item icon={<ShoppingCartOutlined />} key='catalogs' title='Catalog'>
                            <Link to='/catalogs'>
                                <span className='sider-span'>Catalog</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key='4' icon={<UserOutlined />} title='Account'>
                            <Menu.Item key='users'>
                                <Link to='/users'>
                                    <span className='sider-span'>List</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='profile'>
                                <Link to='/profile'>
                                    <span className='sider-span'>Profile</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </VSider>
            </Drawer>
        )
    }

    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    return (
        <VHeader className='site-layout-background' style={{ padding: 0 }} id='header-background'>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: width > 468 ? toggle : showDrawer
            })} */}
            <div className="nav-left">.

                <h3 id='nav-name'>Point History</h3>
                <h3 id='nav-name'>Transaction History</h3>
                <h3 id='nav-name'>Statistical</h3>
                <Header className="header">
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={itemsMenu} />
                </Header>
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
