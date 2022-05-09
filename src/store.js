import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authService'
import { courseApi } from './services/courseService'
import { userApi } from './services/userService'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
})