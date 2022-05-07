import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000/api/auth" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: payload => ({
                url: '/login',
                method: 'POST',
                body: payload
            })
        }),
        register: builder.mutation({
            query: payload => ({
                url: '/create-user',
                method: 'POST',
                body: payload
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi