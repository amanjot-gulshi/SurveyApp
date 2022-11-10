import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <div className="input-row">
                <div className="col-sm-8 input-col">
                    <div className="card">
                        <div className="card-body">

                            {/* Makes POST request to /register route */}
                            <form action="/register" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        name="name"
                                        value={name}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        value={email}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        name="password"
                                        value={password}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-dark">Register</button>
                            </form>
                            <Row className='py-3'>
                                <Col>
                                    Have an Account? <Link
                                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                        Sign In
                                    </Link>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterScreen;