import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { listSurveys } from '../actions/surveyActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function SurveyScreen() {

    const dispatch = useDispatch()
    const surveyList = useSelector(state => state.surveyList)
    const { error, loading, surveys } = surveyList

    let location = useLocation();

    let keyword = location.search

    useEffect(() => {

        dispatch(listSurveys(keyword))

    }, [dispatch, keyword]);

    return (
        <div className='survey-screen'>
            <h1>Latest Surveys</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
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
                                                pathname: `/surveys/${survey.id}/${survey.title}`
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
        </div>
    )

}

export default SurveyScreen;