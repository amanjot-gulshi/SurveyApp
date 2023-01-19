import React, { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

function CreateSurveyCard(props) {

    const [question, setQuestion] = useState({
        question: "",
        choice: {
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        }

    });

    useEffect(() => {

        setQuestion({
            question: props.question,
            choice: {
                option1: props.option1,
                option2: props.option2,
                option3: props.option3,
                option4: props.option4
            }

        });
        // console.log(question);

    }, [props])

    const changeQuestion = (event) => {
        const { name, value } = event.target;
        console.log([name], value)

        setQuestion((prevQues) => {
            return {
                ...prevQues,
                [name]: value
            };
        });
    }

    const changeOption = (event) => {
        const { name, value } = event.target;
        console.log([name], value)
        setQuestion((prevQues) => {
            const newOption = { ...prevQues }
            if (name === "option1" || name === "option2"|| name === "option3"|| name === "option4") {
                newOption.choice[name] = value
            }

            return newOption
        });
    }

    function addOption(event) {
        event.preventDefault();
        if (question.question !== "" && question.choice.option1 !== "") {
            props.onAdd(question);
            props.onClear();
        }

        // console.log(question);
        setQuestion({
            question: "",
            choice: {
                option1: "",
                option2: "",
                option3: "",
                option4: ""
            }

        });
    }

    return (
        <div>
            <div className='question-input'>
                <div>
                    <input className='input-row surveys-row form-control' placeholder="Question" onChange={changeQuestion} value={question.question} name="question" />
                </div>

                <div>
                    <input className='input-row surveys-row form-control' placeholder="Option" onChange={changeOption} value={question.choice.option1} name="option1" />
                </div>
                <div>
                    <input className='input-row surveys-row form-control' placeholder="Option" onChange={changeOption} value={question.choice.option2} name="option2" />
                </div>
                <div>
                    <input className='input-row surveys-row form-control' placeholder="Option" onChange={changeOption} value={question.choice.option3} name="option3" />
                </div>
                <div>
                    <input className='input-row surveys-row form-control' placeholder="Option" onChange={changeOption} value={question.choice.option4} name="option4" />
                </div>

                <Button className='add-button' onClick={addOption} variant="dark">Add</Button>
            </div>

        </div>
    )
}

export default CreateSurveyCard;