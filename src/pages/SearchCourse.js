import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { useParams } from 'react-router-dom'
import { useSearchCoursesQuery } from '../services/courseService'
import moment from 'moment'

export const SearchCourse = () => {
    const { query } = useParams();
    const [courses, setCourses] = useState([])
    const coursesQuery = useSearchCoursesQuery(query)
    useEffect(() => {
        if (coursesQuery.data?.data?.courses && coursesQuery.data?.data?.courses.length !== 0) {
            setCourses(coursesQuery.data?.data?.courses)
        }
    }, [coursesQuery])
    return (
        <>
            <Nav />
            <div className='container m-5'>
                {courses.length !== 0 && <h6 className='pop-medium'> Result showing {courses.length} courses </h6>}
                <div className='row'>
                    {courses && courses.length !== 0 ? courses.map(function (item, i) {
                        return < div className='col-md-4 mt-3' key={i} >
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                <div className='p-2'>
                                    <span className='pop-medium'>{item.title}</span><br />
                                    <span className='pop'>{item.description}</span><br />
                                    <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                </div>
                                <div className="btn-group-sm w-100 rounded-bottom bg-success" role="group">
                                    <button className='btn-sm btn-success w-100'>Buy</button>
                                </div>
                            </div>
                        </div>
                    }) : <h6>Sorry! No Courses Found by this Query: <span className='text-primary'>{query}</span></h6>}

                </div>
            </div>
        </>
    )
}
