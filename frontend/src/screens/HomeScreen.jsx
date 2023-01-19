import React, { useEffect } from "react";
import { Col, Row, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { listMySurveys } from '../actions/surveyActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {

    const dispatch = useDispatch()
    const mySurveyList = useSelector(state => state.mySurveyList)
    const { error, loading, surveys } = mySurveyList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    let location = useLocation();

    let keyword = location.search

    useEffect(() => {
        dispatch(listMySurveys(userInfo.email))

    }, [dispatch, userInfo.email])

    console.log(surveys)

    return (

        <div className="App">
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div className="my-surveys">
                        <h1>My Surveys</h1>
                        <Row className="surveys-row">
                            {surveys.map((survey) => (
                                <Col key={survey.id} sm="12" md="6" lg="6" xl="4" xxl="3">
                                    <Card className='survey-card' key={survey.id}>
                                        <Card.Body>
                                            <Card.Title>{survey.title}</Card.Title>
                                            <Card.Subtitle>By {survey.author}</Card.Subtitle>
                                            <Card.Text>
                                                {survey.questions.length} Questions
                                            </Card.Text>

                                            <Link to={{
                                                pathname: `/surveys/${survey.id}`
                                            }}>
                                                <Button className="survey-link" variant="dark">Take Survey</Button>
                                            </Link>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
            }
            <div className="my-filled-surveys">
                <h1>My Filled Surveys</h1>
                {/* <Row className="surveys-row">
                    {surveys.map((survey) => (
                        <Col key={survey.id} sm="12" md="6" lg="6" xl="4" xxl="3">
                            <Card className='survey-card' key={survey.id}>
                                <Card.Body>
                                    <Card.Title>{survey.title}</Card.Title>
                                    <Card.Subtitle>By {survey.author}</Card.Subtitle>
                                    <Card.Text>
                                        {survey.questions.length} Questions
                                    </Card.Text>

                                    <Link to={{
                                        pathname: `/surveys/${survey.id}`
                                    }}>
                                        <Button className="survey-link" variant="dark">Take Survey</Button>
                                    </Link>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row> */}
            </div>

        </div>
    );

}

export default HomeScreen;