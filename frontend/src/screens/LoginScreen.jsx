import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let location = useLocation();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
        // console.log(location)
    }, [navigate, userInfo, redirect])


    function handleSubmit(e) {
        e.preventDefault()

        dispatch(login(email, password))
        navigate(redirect)

    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <div className="input-row">
                <div className="col-sm-8 input-col">
                    <div className="card">
                        <div className="card-body">

                            {/* <!-- Makes POST request to /login route --> */}
                            <form action="/login" method="POST" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    name="username" value={email} 
                                    onChange={(e) => setEmail(e.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                    type="password" 
                                    className="form-control"
                                    name="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-dark login-button">Login</button>
                            </form>
                            <Row className='py-3'>
                                <Col>
                                    New Customer? <Link
                                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                        Register
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

export default LoginScreen;