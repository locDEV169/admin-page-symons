import {
  EditOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { default as Menu } from 'antd/es/menu'
import 'antd/es/menu/style/index.css'
import { default as React } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { VSider } from 'vendor/layout'
import { selectCollapsed } from '../../store/slices/app'
import '../sider/style.scss'

export function MainMenu() {
  const collapsed = useSelector(selectCollapsed)
  return (
    <VSider trigger={null} collapsible collapsed={collapsed} id="sider">
      <div className='logo' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1' icon={<HomeOutlined />}>
          <Link to='/'><span className="sider-span">Home</span></Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<SettingOutlined />}>
          <Link to='/setting'><span className="sider-span">Setting</span></Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<EditOutlined />}>
          <Link to='/editor'><span className="sider-span">Editor</span></Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<QuestionCircleOutlined />}>
          <Link to='/'>
            <span className='sider-span'>Help</span>
          </Link>
        </Menu.Item>
      </Menu>
    </VSider>
  )
}
