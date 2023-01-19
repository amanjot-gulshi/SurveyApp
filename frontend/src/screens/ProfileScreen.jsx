import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [location, setLocation] = useState('')
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
                // setEmail(user.email)
                setAge(user.age)
                setLocation(user.location)

            }

        }

    },
        [dispatch, navigate, userInfo, user.age, success]
    )

    // console.log(user)

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
                'age': age,
                'location': location,
                'password': password
            }))

            setMessage('')
            navigate('/surveys')
        }

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
                        <label>Age</label>
                        <input
                            onChange={(e) => setAge(e.target.value)}
                            type="number"
                            name="age"
                            value={age || ''}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            name="location"
                            value={location || ''}
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
                    <button type="submit" className="btn btn-dark save-button">Save</button>
                </form>

            </div>
        </div>
    )
}

export default ProfileScreen