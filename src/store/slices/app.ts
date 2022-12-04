import { createSlice } from '@reduxjs/toolkit'

const initialState: AppStore = {
    collapsed: window?.innerWidth < 768
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toogleSider: (state, action) => {
            state.collapsed = action.payload
        }
    }
})

// Export action ra để sử dụng cho tiện.
export const { toogleSider } = appSlice.actions

export const selectCollapsed = (state: MainStore) => {
    console.log(`state`, state)
    return state.app.collapsed
}

// Export reducer để nhúng vào Store
export const appReducer = appSlice.reducer
