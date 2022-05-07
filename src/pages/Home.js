import React from 'react'
import { Nav } from '../components/Nav'

export const Home = () => {
    return (
        <>
            <Nav />
            <div className='container mt-3'>
                <section>
                    <div className='d-flex w-25 justify-content-between align-items-center'>
                        <h5 className='pop-bold mt-2'>Published Courses </h5>
                        <button className='btn btn-primary pop'>Add Course</button>
                    </div>
                    <div className='mt-3 pop'>
                        <div class="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1651765335352-01feb6cae8e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="..." />
                            <div className='p-2'>
                                <span className='pop-medium'>JavaScript Full Course</span><br />
                                <span className='pop text-gray'>1 day ago</span>
                            </div>
                            <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                <button className='btn btn-dark w-50'>Preview</button>
                                <button className='btn btn-warning w-50'>Edit</button>
                            </div>
                        </div>
                    </div>
                </section>
                <hr></hr>
                <section>
                    <div className='d-flex w-25 justify-content-between align-items-center'>
                        <h5 className='pop-bold mt-2'>My Courses </h5>
                    </div>
                    <div className='mt-3 pop'>
                        <div class="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1651765335352-01feb6cae8e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="..." />
                            <div className='p-2'>
                                <span className='pop-medium'>JavaScript Full Course</span><br />
                                <span className='pop text-gray'>1 day ago</span>
                            </div>
                            <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                <button className='btn btn-dark w-50'>Preview</button>
                            </div>
                        </div>
                    </div>
                </section>
                <hr></hr>
                <section>
                    <div className='d-flex w-25 justify-content-between align-items-center'>
                        <h5 className='pop-bold mt-2'>Trending Courses </h5>
                    </div>
                    <div className='mt-3 pop'>
                        <div class="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1651765335352-01feb6cae8e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="..." />
                            <div className='p-2'>
                                <span className='pop-medium'>JavaScript Full Course</span><br />
                                <span className='pop text-gray'>1 day ago</span>
                            </div>
                            <div className="btn-group w-100 rounded-bottom bg-dark" role="group">
                                <button className='btn btn-success w-50'>Buy</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
