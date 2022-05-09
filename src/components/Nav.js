import React from 'react'

export const Nav = () => {
    return (
        <div className='container-fluid shadow pop nav-header'>
            <div className='row justify-content-between'>
                <div className='col-md-3 p-1 d-flex align-items-center justify-content-center h-100'>
                    <h4 className='text-center pop-bold mt-2'>Blidr</h4>
                </div>
                <div className='col-md-4 p-2 d-flex align-items-center justify-content-center h-100'>
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
                <div className='col-md-3 p-2 d-flex align-items-center justify-content-center h-100 nav-icon'><i className='bx bx-user'></i><div className='space-1'></div><i className='bx bx-log-out'></i></div>
            </div>
        </div >
    )
}
