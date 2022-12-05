import { MainLayout } from 'layouts'
import { default as React, Suspense, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('../pages/home'))
const Setting = React.lazy(() => import('../pages/setting'))
const Editor = React.lazy(() => import('../pages/editor'))
const LoginPage = React.lazy(() => import('../pages/login'))
const ProductPage = React.lazy(() => import('../pages/products'))
const AddProductPage = React.lazy(() => import('../pages/products/add-product'))
const BrandPage = React.lazy(() => import('../pages/brands'))
const AddBrandPage = React.lazy(() => import('../pages/brands/add-brand'))
const DetailBrand = React.lazy(() => import('../pages/brands/detail-brand'))
const DetailProduct = React.lazy(() => import('../pages/products/detail-product'))
const EditProductPage = React.lazy(() => import('../pages/products/edit-product'))
const PointHistoyPage = React.lazy(() => import('../pages/point-history'))

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

    if (state.checking) return <div>Loading...</div>

    return (
        <Suspense fallback={<div>Loading...</div>}>{state.authorized ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}</Suspense>
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
                    <Route exact path='/editor' component={Editor} />
                    <Route exact path='/setting' component={Setting} />
                    <Route exact path='/product' component={ProductPage} />
                    <Route exact path='/product/create' component={AddProductPage} />
                    <Route exact path='/brand' component={BrandPage} />
                    <Route exact path='/brand/create' component={AddBrandPage} />
                    <Route exact path='/brand/detail/:id' component={DetailBrand} />
                    <Route exact path='/product/detail/:id' component={DetailProduct} />
                    <Route exact path='/product/update/:id' component={EditProductPage} />
                    <Route exact path='/points-history' component={PointHistoyPage} />
                </Switch>
            </Suspense>
        </MainLayout>
    )
}
