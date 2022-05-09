import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7000/api/users", prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"))
            return headers
        }, credentials: 'include'
    }),
    endpoints: (builder) => ({
        editProfile: builder.mutation({
            query: payload => ({
                url: '/update-profile',
                method: 'PUT',
                body: payload
            })
        })
    })
})

export const { useEditProfileMutation } = userApi