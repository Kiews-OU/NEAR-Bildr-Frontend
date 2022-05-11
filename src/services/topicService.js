import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const topicApi = createApi({
    reducerPath: "topicApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7000/api/topics", prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"))
            return headers
        }, credentials: 'include'
    }),
    endpoints: (builder) => ({
        getTopics: builder.query({
            query: () => 'get-topics',
        }),
    })
})

export const { useGetTopicsQuery } = topicApi