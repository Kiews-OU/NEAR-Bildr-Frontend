import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useLoginMutation } from '../services/authService'

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const [login, result] = useLoginMutation()
    const history = useHistory()
    const formSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        await login(formData)
    }
    useEffect(() => {
        setIsLoading(result.isLoading)
        if (result.isError) {
            setError(result.error.data?.err)
        } else if (result.data?.data?.token?.value) {
            localStorage.setItem("id", result.data?.data?.user?.id)
            localStorage.setItem("first_name", result.data?.data?.user?.first_name)
            localStorage.setItem("last_name", result.data?.data?.user?.last_name)
            localStorage.setItem("email", result.data?.data?.user?.email)
            localStorage.setItem("gender", result.data?.data?.user?.gender)
            localStorage.setItem("role", result.data?.data?.user?.role)
            localStorage.setItem("token", result.data?.data?.token?.value)
            window.location.reload()
        }
    }, [result, history])

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-4 shadow bg-white mt-5 p-3'>
                    <h4 className='text-center pop-bold'>Login</h4>
                    <p className='text-danger text-center pop-medium'>{error}</p>
                    <form onSubmit={formSubmit} className='pop-medium'>
                        <input type="text" className='form-control' name='email' placeholder='Your email' onChange={handleChange} value={formData.email} required /><br />
                        <input type="password" className='form-control' name='password' placeholder='Your password' onChange={handleChange} value={formData.password} required /><br />
                        <div className='d-flex justify-content-center'>
                            <button disabled={isLoading} className='btn btn-dark w-100'>Sign in</button>
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <Link to="/register" className='text-center decoration-none'>Don't have an account yet? sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
