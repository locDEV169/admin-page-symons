import Spin from 'antd/es/spin'
import { MainLayout } from 'layouts'
import { default as React, Suspense, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('../pages/home'))
const LoginPage = React.lazy(() => import('../pages/login'))
const PointHistoyPage = React.lazy(() => import('../pages/point-history'))
const TranisactionHistoyPage = React.lazy(() => import('../pages/transition-history'))
const StatisticalPage = React.lazy(() => import('../pages/statistical'))

type AppState = { checking: boolean; authorized?: boolean }
export function MainRoutes() {
    const [state, setState] = useState<AppState>({ checking: true, authorized: false })

    useEffect(() => {
        const checkLogin = () => {
            document.cookie == ''
                ? setState({ checking: false, authorized: false })
                : setState({ checking: false, authorized: true })
        }

        checkLogin()
    }, [])

    if (state.checking) return <div><Spin tip="Loading..." size="large" /></div>

    return (
        <Suspense fallback={<div><Spin tip="Loading..." size="large" /></div>}>{state.authorized ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}</Suspense>
    )
}

function UnauthorizedRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={LoginPage} />
        </Switch>
    )
}

function AuthorizedRoutes() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/statistical' component={StatisticalPage} />
                    <Route exact path='/transaction-history' component={TranisactionHistoyPage} />
                    <Route exact path='/points-history' component={PointHistoyPage} />
                </Switch>
            </Suspense>
        </MainLayout>
    )
}
