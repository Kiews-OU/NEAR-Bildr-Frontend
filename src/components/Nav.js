import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEditProfileMutation } from '../services/userService'

export const Nav = () => {
    const history = useHistory()
    const logout = async () => {
        await localStorage.removeItem("token")
        window.location.reload()
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [editProfile, result] = useEditProfileMutation()
    const [formData, setFormData] = useState({
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        gender: localStorage.getItem('gender')
    });
    const [searchFormData, setSearchFormData] = useState({
        search: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleChangeSearch = (event) => {
        setSearchFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const formSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        await editProfile(formData)
    }
    const searchSubmit = async (e) => {
        e.preventDefault()
        history.push({
            pathname: '/search-courses/' + searchFormData.search,
            state: searchFormData.search
        })
    }
    useEffect(() => {
        setIsLoading(result.isLoading)
        if (result.isError && result.error.data?.err) {
            setError(result.error.data?.err)
        } else if (result.isError) {
            setError('Email already taken please use another')
        }
        else if (result.data?.data?.user) {
            localStorage.setItem("id", result.data?.data?.user?.id)
            localStorage.setItem("first_name", result.data?.data?.user?.first_name)
            localStorage.setItem("last_name", result.data?.data?.user?.last_name)
            localStorage.setItem("email", result.data?.data?.user?.email)
            localStorage.setItem("gender", result.data?.data?.user?.gender)
            localStorage.setItem("role", result.data?.data?.user?.role)
            setSuccess('Account updated successfully!')
        }
    }, [result, error])
    return (
        <>
            <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title pop-medium" id="editUserModalLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={formSubmit}>
                            <div className="modal-body">
                                {success && <p className='text-success text-center pop-medium'>{success}</p>}
                                {error ? <p className='text-danger text-center pop-medium'>{error}</p> : null}
                                <label for="first_name" className='pop-medium'>First name</label>
                                <input id="first_name" name='first_name' className='form-control' onChange={handleChange} value={formData.first_name} required />
                                <label for="last_name" className='pop-medium mt-3'>Last name</label>
                                <input id="last_name" name='last_name' className='form-control' onChange={handleChange} value={formData.last_name} required />
                                <label for="email" className='pop-medium mt-3'>Email</label>
                                <input id="email" name='email' className='form-control' onChange={handleChange} value={formData.email} required />
                                <label for="gender" className='pop-medium mt-3'>Gender</label>
                                <select className="form-select mt-1 mb-3" id="gender" name='gender' onChange={handleChange} value={formData.gender} required>
                                    <option selected>Choose</option>
                                    {localStorage.getItem('gender') === "male" ? <>
                                        <option selected value="male">Male</option>
                                        <option value="female">Female</option>
                                    </> : <>
                                        <option value="male">Male</option>
                                        <option selected value="female">Female</option>
                                    </>}
                                </select>
                                <label for="role" className='pop-medium'>Role</label>
                                <input id='role' disabled className='form-control' name='role' onChange={handleChange} value={formData.role} required />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-sm btn-secondary pop-medium" data-bs-dismiss="modal">Close</button>
                                <button disabled={isLoading} type="submit" className="btn-sm btn-primary pop-medium">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='container-fluid shadow pop nav-header'>
                <div className='row justify-content-between'>
                    <div className='col-md-3 p-1 d-flex align-items-center justify-content-center h-100'>
                        <h4 className='text-center pop-bold mt-2'><Link to="/" className='normalize-link'>Blidr</Link></h4>
                    </div>
                    <div className='col-md-4 p-2 h-100'>
                        <form onSubmit={searchSubmit} className="d-flex align-items-center justify-content-center">
                            <input name='search' type="text" className="form-control" placeholder="Search" onChange={handleChangeSearch} value={searchFormData.search} required />
                            <button className='btn btn-dark'>Search</button>
                        </form>
                    </div>
                    <div className='col-md-3 p-2 d-flex align-items-center justify-content-center h-100 nav-icon'><i className='bx bx-user' data-bs-toggle="modal" data-bs-target="#editUserModal"></i><div className='space-1'></div><i onClick={logout} className='bx bx-log-out'></i></div>
                </div>
            </div >
        </>

    )
}
