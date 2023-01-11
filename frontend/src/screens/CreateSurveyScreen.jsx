import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CreateSurveyCard from '../cards/CreateSurveyCard';
import QuestionCard from '../cards/QuestionCard';
import { createSurvey } from '../actions/surveyActions'
import Message from '../components/Message'

function CreateSurveyScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [questions, setQuestions] = useState([]);
    const [questionEdit, setQuestionEdit] = useState({
        question: "",
        choice: {
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        }

    });

    const [title, setTitle] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let urlLocation = useLocation();

    const redirect = urlLocation.search ? urlLocation.search.split('=')[1] : '/create'


    useEffect(() => {
        if (!userInfo) {
            navigate(`/login?redirect=${redirect}`)
        }
    }, [navigate, redirect, userInfo])

    // console.log(userInfo)

    function addQuestion(newQuestion) {

        setQuestions((prevQuestions) => {
            return [...prevQuestions, newQuestion];
        });

    }

    function deleteQuestion(questionID) {
        setQuestions((prevQuestions) => {
            return prevQuestions.filter((item, index) => {
                return index !== questionID;
            });
        });
    }

    function editQuestion(questionID) {

        const found = questions.find((item, index) => {
            return index === questionID;
        })

        setQuestionEdit(found);
    }

    function clearInput() {
        setQuestionEdit({
            question: "",
            choice: {
                option1: "",
                option2: "",
                option3: "",
                option4: ""
            }

        });
    }

    function handleSubmit() {
        dispatch(createSurvey(userInfo.email, title, questions))
        setMessage('')
        navigate('/surveys')
    }

    return (
        <div className='create-survey'>
            {message && <Message variant='danger'>{message}</Message>}

            <h1>Create a Survey</h1>
            <form action="/create" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <Link to={{
                        pathname: `/surveys`
                    }}>
                        <Button variant="light">Discard</Button>
                    </Link>

                    <Button onClick={handleSubmit} variant="light">Save</Button>
                </div>

                <div>
                    <input placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} value={title} name="title" />

                </div>
                <CreateSurveyCard
                    onAdd={addQuestion}
                    onClear={clearInput}
                    question={questionEdit.question}
                    option1={questionEdit.choice.option1}
                    option2={questionEdit.choice.option2}
                    option3={questionEdit.choice.option3}
                    option4={questionEdit.choice.option4}
                />

                {questions.map((question, index) => (
                    <QuestionCard
                        id={index}
                        key={index}
                        question={question.question}
                        option1={question.choice.option1}
                        option2={question.choice.option2}
                        option3={question.choice.option3}
                        option4={question.choice.option4}
                        onDelete={deleteQuestion}
                        onEdit={editQuestion}
                    />
                ))}
            </form>




        </div>

    )
}

export default CreateSurveyScreen;