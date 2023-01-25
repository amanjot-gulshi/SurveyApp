import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from 'react-bootstrap/Button';

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listSurveyDetails, fillSurvey } from '../actions/surveyActions';



function SingleSurveyScreen() {

    const [options, setOptions] = useState({})
    const [message, setMessage] = useState('')

    const { id, title } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const surveyDetails = useSelector(state => state.surveyDetails)

    const { error, loading, survey } = surveyDetails

    let urlLocation = useLocation();

    const redirect = urlLocation.search ? urlLocation.search.split('=')[1] : `/surveys/${id}/${title}`

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate(`/login?redirect=${redirect}`)
        }

        dispatch(listSurveyDetails(id, title))

    }, [dispatch, id, navigate, redirect, title, userInfo])

    // console.log(survey)

    function handleOnChange(event) {
        const { name, value } = event.target
        setOptions((prevOptions) => {
            return {
                ...prevOptions,
                [name]: value
            };
        });

        console.log(options)
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (Object.keys(options).length === survey.questions.length) {
            dispatch(fillSurvey(survey.title, survey.author, userInfo.email, options))
            navigate('/surveys')
        } else {
            setMessage('Please make sure all questions are answered')
        }



    }

    return (
        <div>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className='single-survey'>
                            {message && <Message variant='danger'>{message}</Message>}
                            <h1 className="survey-title">{survey.title}</h1>
                            <h4 className="survey-surveyor">by {survey.author}</h4>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                {survey && survey.questions && survey.questions.map((question, index) => (
                                    <div className='survey-question'>
                                        <FormControl key={index}>
                                            <FormLabel id="demo-radio-buttons-group-label">{question.question_text}</FormLabel>
                                            <RadioGroup
                                                className='choice-radio'
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                onChange={handleOnChange}
                                            >
                                                {question.choices.map((option) => (
                                                    <FormControlLabel name={question.question_text} value={option.choice_text} control={<Radio />} label={option.choice_text} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>


                                    </div>
                                ))}

                                <div className='cancel-submit'>
                                    <Stack spacing={2} direction="row">
                                        <Link to={{
                                            pathname: `/surveys`
                                        }}>
                                            <Button variant="dark">
                                                Cancel</Button>
                                        </Link>
                                        {userInfo && userInfo.name === survey.author ? "" : (<Button type="submit" className='submit-button' variant="dark" style={{ marginLeft: "100px" }}>Submit</Button>)}
                                        
                                    </Stack>
                                </div>
                            </form>


                        </div>
                    )
            }
        </div>

    )
}

export default SingleSurveyScreen;