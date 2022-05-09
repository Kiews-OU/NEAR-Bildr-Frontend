import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { useGetCoursesQuery, useMyCoursesQuery, usePublishedCoursesQuery } from '../services/courseService'
import moment from 'moment';

export const Home = () => {
    const [courses, setCourses] = useState([])
    const [myCourses, setMyCourses] = useState([])
    const [publishedCourses, setPublishedCourses] = useState([])
    const coursesQuery = useGetCoursesQuery()
    const myCoursesQuery = useMyCoursesQuery()
    const publishedCoursesQuery = usePublishedCoursesQuery()
    useEffect(() => {
        setCourses(coursesQuery.data?.data?.courses)
    }, [coursesQuery])
    useEffect(() => {
        setMyCourses(myCoursesQuery.data?.data?.courses)
    }, [myCoursesQuery])
    useEffect(() => {
        setPublishedCourses(publishedCoursesQuery.data?.data?.courses)
    }, [publishedCoursesQuery])
    return (
        <>
            <Nav />
            <div className='container mt-3'>
                {localStorage.getItem("role") === "teacher" ? <>
                    <section>
                        <div className='d-flex w-25 justify-content-between align-items-center'>
                            <h5 className='pop-bold mt-2'>Published Courses </h5>
                            <button className='btn btn-primary pop'>Add Course</button>
                        </div>
                        <div className='mt-3 pop'>
                            <div className='row'>
                                {publishedCourses === true ? publishedCourses.map(function (item, i) {
                                    return < div className='col-md-4 mt-3' key={i} >
                                        <div className="card" style={{ width: "18rem" }}>
                                            <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                            <div className='p-2'>
                                                <span className='pop-medium'>{item.title}</span><br />
                                                <span className='pop'>{item.description}</span><br />
                                                <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                            </div>
                                            <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                                <button className='btn btn-dark w-50'>Preview</button>
                                                <button className='btn btn-warning w-50'>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                }) : <h5 className='text-gray'>Sorry! No Courses Found</h5>}
                            </div>
                        </div>
                    </section>
                    <hr></hr>
                </> : null}
                <section>
                    <div className='d-flex w-25 justify-content-between align-items-center'>
                        <h5 className='pop-bold mt-2'>My Courses </h5>
                    </div>
                    <div className='mt-3 pop'>
                        <div className='row'>
                            {myCourses === true ? myCourses.map(function (item, i) {
                                return < div className='col-md-4 mt-3' key={i} >
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                        <div className='p-2'>
                                            <span className='pop-medium'>{item.title}</span><br />
                                            <span className='pop'>{item.description}</span><br />
                                            <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                            <button className='btn btn-dark w-50'>Preview</button>
                                        </div>
                                    </div>
                                </div>
                            }) : <h5 className='text-gray'>Sorry! No Courses Found</h5>}
                        </div>
                    </div>
                </section>
                <hr></hr>
                <section>
                    <div className='d-flex w-25 justify-content-between align-items-center'>
                        <h5 className='pop-bold mt-2'>Trending Courses </h5>
                    </div>
                    <div className='pop'>
                        <div className='row'>
                            {courses && courses.map(function (item, i) {
                                return < div className='col-md-4 mt-3' key={i} >
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                        <div className='p-2'>
                                            <span className='pop-medium'>{item.title}</span><br />
                                            <span className='pop'>{item.description}</span><br />
                                            <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                            <button className='btn btn-success w-50'>Buy</button>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}
