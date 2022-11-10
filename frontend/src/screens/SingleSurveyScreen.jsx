import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listSurveyDetails } from '../actions/surveyActions';
// import { getUserDetails } from '../actions/userActions';

function SingleSurveyScreen() {

    const { id } = useParams();

    const dispatch = useDispatch()
    const surveyDetails = useSelector(state => state.surveyDetails)

    const { error, loading, survey } = surveyDetails

    useEffect(() => {

        // window.scrollTo({ top: 0, behavior: 'smooth' });

        dispatch(listSurveyDetails(id))

    }, [dispatch, id])

    console.log(survey)

    return (
        <div>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className='single-survey'>
                            <h1 className="survey-title">{survey.title}</h1>
                            <h4 className="survey-surveyor">{survey.author}</h4>
                            <hr />
                            
                            {survey && survey.questions && survey.questions.map((question, index) => (
                                <div>
                                    <FormControl key={index}>
                                        <FormLabel id="demo-radio-buttons-group-label">{question.question_text}</FormLabel>
                                        <RadioGroup
                                            className='choice-radio'
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            {question.choices.map((option) => (
                                                <FormControlLabel value={option.choice_text} control={<Radio />} label={option.choice_text} />
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
                                        <Button variant="outlined">
                                            Cancel</Button>
                                    </Link>
                                    <Button className='submit-button' variant="outlined" style={{ marginLeft: "100px" }}>Submit</Button>
                                </Stack>
                            </div>

                        </div>
                    )
            }
        </div>

    )
}

export default SingleSurveyScreen;