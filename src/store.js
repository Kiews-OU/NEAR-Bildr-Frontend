import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authService'
import { courseApi } from './services/courseService'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer
    },
})