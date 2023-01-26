import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile, deleteUser, logout } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Button } from 'react-bootstrap';

function ProfileScreen() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')

        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))

                setFirstName(user.first_name)
                setLastName(user.last_name)
            }

        }

    },
        [dispatch, navigate, userInfo, user.name, success]
    )

    console.log(user)

    async function submitHandler(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {

            dispatch(updateUserProfile({
                'id': user._id,
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'password': password
            }))

            setMessage('')
            navigate('/surveys')
        }

    }

    function handleDeleteUser(e){
        e.preventDefault()
        dispatch(deleteUser(userInfo._id))
        dispatch(logout())
        
    }

    return (
        <div className='profile-screen'>
            <h1>Welcome to the Profile Screen</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <div className='personal-info'>
                <h2>Personal Information</h2>
                <form action="/register" method="POST"
                    onSubmit={submitHandler}
                    encType="multipart/form-data">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            name="name"
                            value={firstName}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            name="name"
                            value={lastName}
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
                    <Button type="submit" className="btn btn-dark save-button">Save</Button>
                    <Button onClick={handleDeleteUser} className="btn btn-dark delete-account-button">Delete Account</Button>
                </form>
                

            </div>
        </div>
    )
}

export default ProfileScreen