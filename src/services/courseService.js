import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7000/api/courses", prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"))
            return headers
        }, credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: payload => ({
                url: '/create-course',
                method: 'POST',
                body: payload
            })
        }),
        getCourses: builder.query({
            query: () => 'get-courses',
        }),
        myCourses: builder.query({
            query: () => 'get-my-courses'
        }),
        publishedCourses: builder.query({
            query: () => 'get-my-courses-teacher'
        })
    })
})

export const { useCreateCourseMutation, useGetCoursesQuery, useMyCoursesQuery, usePublishedCoursesQuery } = courseApi