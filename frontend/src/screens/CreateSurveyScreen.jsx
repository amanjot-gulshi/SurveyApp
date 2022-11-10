import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CreateSurveyCard from '../cards/CreateSurveyCard';
import QuestionCard from '../cards/QuestionCard';

function CreateSurveyScreen() {

    const [questions, setQuestions] = useState([]);
    const [questionEdit, setQuestionEdit] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
    });

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

        // console.log(found);
        setQuestionEdit(found);
        // console.log(edit);
        // console.log(questionEdit);
    }

    function clearInput() {
        setQuestionEdit({
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
        });
    }

    return (
        <div className='create-survey'>

            <h1>Create a Survey</h1>

            <div>
                <Link to={{
                    pathname: `/surveys`
                }}>
                    <Button variant="light">Discard</Button>
                </Link>

                <Button variant="light">Save</Button>
            </div>
            <CreateSurveyCard
                onAdd={addQuestion}
                onClear={clearInput}
                question={questionEdit.question}
                option1={questionEdit.option1}
                option2={questionEdit.option2}
                option3={questionEdit.option3}
                option4={questionEdit.option4}
            />

            {questions.map((question, index) => (
                <QuestionCard
                    id={index}
                    key={index}
                    question={question.question}
                    option1={question.option1}
                    option2={question.option2}
                    option3={question.option3}
                    option4={question.option4}
                    onDelete={deleteQuestion}
                    onEdit={editQuestion}
                />
            ))}


        </div>

    )
}

export default CreateSurveyScreen;