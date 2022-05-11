import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { useCreateCourseMutation, useGetCoursesQuery, useMyCoursesQuery, usePublishedCoursesQuery } from '../services/courseService'
import moment from 'moment';
import { useGetTopicsQuery } from '../services/topicService';
import axios from 'axios'

axios.defaults.withCredentials = true;

export const Home = () => {
    const [courses, setCourses] = useState([])
    const [myCourses, setMyCourses] = useState([])
    const [publishedCourses, setPublishedCourses] = useState([])
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const coursesQuery = useGetCoursesQuery()
    const myCoursesQuery = useMyCoursesQuery()
    const publishedCoursesQuery = usePublishedCoursesQuery()
    const [createCourse, result] = useCreateCourseMutation()
    const getTopicsQuery = useGetTopicsQuery()
    useEffect(() => {
        setCourses(coursesQuery.data?.data?.courses)
    }, [coursesQuery])
    useEffect(() => {
        setMyCourses(myCoursesQuery.data?.data?.courses)
    }, [myCoursesQuery])
    useEffect(() => {
        setPublishedCourses(publishedCoursesQuery.data?.data?.courses)
    }, [publishedCoursesQuery, publishedCourses])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        topic_id: ''
    });
    const [selectedFile, setSelectedFile] = useState('');
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const formSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        formData.thumbnail = selectedFile
        const res = await axios.post("http://localhost:7000/api/courses/create-course", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        if (res.data?.status === true) {
            setSuccess('Course created successfully!')
            setTimeout(function () {
                window.location.reload()
            }, 2000);
        }
        else {
            setError('Something went wrong!, please try to reload your page')
        }
    }
    useEffect(() => {
        if (getTopicsQuery.data?.data?.topics) {
            setTopics(getTopicsQuery.data?.data?.topics)
        }
    }, [getTopicsQuery])
    return (
        <>
            <div className="modal fade" id="addCourseModal" tabindex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title pop-medium" id="addCourseModalLabel">Add Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={formSubmit} encType="multipart/form-data">
                            <div className="modal-body">
                                {success && <p className='text-success text-center pop-medium'>{success}</p>}
                                {error ? <p className='text-danger text-center pop-medium'>{error}</p> : null}
                                <label for="title" className='pop-medium'>Title</label>
                                <input id="title" name='title' className='form-control' onChange={handleChange} value={formData.title} required />
                                <label for="description" className='pop-medium mt-3'>Description</label>
                                <input id="description" name='description' className='form-control' onChange={handleChange} value={formData.description} required />
                                <label for="thumbnail" className='pop-medium mt-3'>Thumbnail</label>
                                <input className="form-control" type="file" id="formFile"
                                    onChange={(e) => setSelectedFile(e.target.files[0])} required></input>
                                <label for="price" className='pop-medium mt-3'>Price</label>
                                <input type="number" id="price" name='price' className='form-control' onChange={handleChange} value={formData.price} required />
                                <label for="gender" className='pop-medium mt-3'>Topics</label>
                                <select className="form-select mt-1 mb-3" id="topic_id" name='topic_id' onChange={handleChange} value={formData.topic_id} required>
                                    <option selected>Choose</option>
                                    {topics.map(function (item, i) {
                                        return <option value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-sm btn-secondary pop-medium" data-bs-dismiss="modal">Close</button>
                                <button disabled={isLoading} type="submit" className="btn-sm btn-primary pop-medium">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Nav />
            <div className='container mt-3 mb-3'>
                {localStorage.getItem("role") === "teacher" ? <>
                    <section>
                        <div className='d-flex w-25 justify-content-between align-items-center'>
                            <h5 className='pop-bold mt-2'>Published Courses </h5>
                            <button className='btn-sm btn-primary pop' data-bs-toggle="modal" data-bs-target="#addCourseModal">Add Course</button>
                        </div>
                        <div className='mt-3 pop'>
                            <div className='row'>
                                {publishedCourses && publishedCourses.length !== 0 ? publishedCourses.map(function (item, i) {
                                    return < div className='col-md-4 mt-1' key={i} >
                                        <div className="card" style={{ width: "18rem" }}>
                                            <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                            <div className='p-2'>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='pop-medium'>{item.title}</span>
                                                    <span class="badge bg-dark d-flex align-items-center">{item.price} NEAR</span>
                                                </div>
                                                <span className='pop'>{item.description}</span><br />
                                                <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                            </div>
                                            <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                                <button className='btn-sm btn-dark w-50'>Preview</button>
                                                <button className='btn-sm btn-dark w-50'>Edit</button>
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
                            {myCourses && myCourses.length !== 0 ? myCourses.map(function (item, i) {
                                return < div className='col-md-4 mt-3' key={i} >
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                        <div className='p-2'>
                                            <div className='d-flex justify-content-between'>
                                                <span className='pop-medium'>{item.title}</span>
                                                <span class="badge bg-dark d-flex align-items-center">{item.price} NEAR</span>
                                            </div>
                                            <span className='pop'>{item.description}</span><br />
                                            <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="btn-group-sm w-100 rounded-bottom bg-dark" role="group">
                                            <button className='btn-sm btn-dark w-100'>Preview</button>
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
                            {courses && courses.length !== 0 ? courses.map(function (item, i) {
                                return < div className='col-md-4 mt-3' key={i} >
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={"http://localhost:7000/thumbnails/" + item.thumbnail} className="card-img-top" alt="..." />
                                        <div className='p-2'>
                                            <div className='d-flex justify-content-between'>
                                                <span className='pop-medium'>{item.title}</span>
                                                <span class="badge bg-dark d-flex align-items-center">{item.price} NEAR</span>
                                            </div>
                                            <span className='pop'>{item.description}</span><br />
                                            <span className='pop text-gray'>{moment(item.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="btn-group-sm w-100 rounded-bottom bg-success" role="group">
                                            <button className='btn-sm btn-success w-100'>Buy</button>
                                        </div>
                                    </div>
                                </div>
                            }) : <h5 className='text-gray'>Sorry! No Courses Found</h5>}

                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}
