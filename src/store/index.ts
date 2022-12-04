import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './slices/app'
import { authReducer } from './slices/auth'

export const store = configureStore({
    reducer: { app: appReducer, auth: authReducer }
})
