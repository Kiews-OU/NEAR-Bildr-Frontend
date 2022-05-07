import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authService'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer
    },
})