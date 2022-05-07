import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegisterMutation } from '../services/authService';

export const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "",
        gender: ""
    });
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const [register, result] = useRegisterMutation()
    const formSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirm_password) {
            return setError('Two passwords must be match')
        }
        setError(null)
        await register(formData)
    }
    useEffect(() => {
        setIsLoading(result.isLoading)
        if (result.isError) {
            setError(result.error.data?.err)
        } else if (result.data?.data?.user) {
            setSuccess('Account created successfully!, please login to continue..')
        }
    }, [result, error])
    return (
        <div className='container mt-2'>
            <div className='row justify-content-center'>
                <div className='col-md-4 shadow bg-white rounded mt-5 p-3'>
                    <h4 className='text-center pop-bold'>Register</h4>
                    {success && <p className='text-success text-center pop-medium'>{success}</p>}
                    {error ? <p className='text-danger text-center pop-medium'>{error}</p> : <p className='pop text-center'>Welcome to Blidr! please fill out this form to get started</p>}
                    <form onSubmit={formSubmit} className='pop-medium'>
                        <input type="text" className='form-control' name='first_name' placeholder='First name' onChange={handleChange} value={formData.first_name} required /><br />
                        <input type="text" className='form-control' name='last_name' placeholder='Last name' onChange={handleChange} value={formData.last_name} required /><br />
                        <input type="text" className='form-control' name='email' placeholder='Your email' onChange={handleChange} value={formData.email} required /><br />
                        <input type="password" className='form-control' name='password' placeholder='Your password' minLength={8} onChange={handleChange} value={formData.password} required /><br />
                        <input type="password" className='form-control' name='confirm_password' placeholder='Confirm password' minLength={8} onChange={handleChange} value={formData.confirm_password} required />
                        <label for="role" className='mt-3'>Gender</label>
                        <select className="form-select mt-1 mb-3" id="gender" name='gender' onChange={handleChange} value={formData.gender} required>
                            <option selected>Choose</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <label for="role">Are you student or teacher?</label>
                        <select className="form-select mt-1 mb-3" id="role" name='role' onChange={handleChange} value={formData.role} required>
                            <option selected>Choose</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        <div className='d-flex justify-content-center'>
                            <button disabled={isLoading} className='btn btn-dark w-100'>Sign up</button>
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <Link to="/login" className='text-center decoration-none'>Already have an account? login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
