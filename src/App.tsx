import { default as React } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MainRoutes } from './routes'
import { store } from './store'
export function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainRoutes />
            </BrowserRouter>
        </Provider>
    )
}
