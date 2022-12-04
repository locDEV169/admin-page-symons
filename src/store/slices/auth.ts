import { createSlice } from '@reduxjs/toolkit'

const initialState: AuthStore = {
    username: 'Guest'
}

export const authSlice = createSlice({
    name: 'auth', // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
    initialState,
    // Reducers chứa các hàm xử lý cập nhật state
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload || initialState.username
        }
    }
})

// Export action ra để sử dụng cho tiện.
export const { updateUsername } = authSlice.actions

export const selectUsername = (state: { auth: { username: string } }) => state.auth.username

// Export reducer để nhúng vào Store
export const authReducer = authSlice.reducer
