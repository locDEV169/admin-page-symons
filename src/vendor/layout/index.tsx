import { default as Layout, LayoutProps, SiderProps } from 'antd/es/layout'
import 'antd/es/layout/style/css'
import { default as React } from 'react'

export const VHeader = (props: LayoutProps) => <Layout.Header {...props} />

export const VSider = (props: SiderProps) => <Layout.Sider {...props} />

export const VContent = (props: LayoutProps) => <Layout.Content {...props} />

export const VLayout = (props: LayoutProps) => <Layout {...props} />