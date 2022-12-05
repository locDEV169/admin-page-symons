import 'antd/es/layout/style/index.css'
import { default as React, ReactNode } from 'react'
import { VContent, VLayout } from 'vendor/layout'
import { MainHeader } from './header'
import './style.css'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <VLayout style={{ height: 'max-content' }}>
      <VLayout className='site-layout' style={{ height: '100%' }}>
        <MainHeader />
        {/* <MainBreadcrumb /> */}
        <VContent className='site-layout-background' style={{ padding: 24 }}>
          {children}
        </VContent>
      </VLayout>
    </VLayout>
  )
}
