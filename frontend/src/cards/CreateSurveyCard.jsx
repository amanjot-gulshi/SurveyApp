import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function CreateSurveyCard(props) {

    const [question, setQuestion] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
    });


    useEffect(() => {

        setQuestion({
            question: props.question,
            option1: props.option1,
            option2: props.option2,
            option3: props.option3,
            option4: props.option4,
        });
        // console.log(question);


    }, [props])

    function handleOnChange(event) {
        const { name, value } = event.target;

        setQuestion((prevQues) => {
            return {
                ...prevQues,
                [name]: value,
            };
        });

        // console.log([name], value);
    }

    function addOption(event) {
        event.preventDefault();
        if (question.question !== "") {
            props.onAdd(question);
            props.onClear();
        }

        // console.log(question);
        setQuestion({
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
        });
    }

    return (
        <div>
            <form className='question-input'>
                <div>
                    <input placeholder="Question" onChange={handleOnChange} value={question.question} name="question" />
                </div>

                <div>
                    <input placeholder="Option" onChange={handleOnChange} value={question.option1} name="option1" />
                </div>
                <div>
                    <input placeholder="Option" onChange={handleOnChange} value={question.option2} name="option2" />
                </div>
                <div>
                    <input placeholder="Option" onChange={handleOnChange} value={question.option3} name="option3" />
                </div>
                <div>
                    <input placeholder="Option" onChange={handleOnChange} value={question.option4} name="option4" />
                </div>

                <Button onClick={addOption} variant="text">Add</Button>
            </form>

        </div>
    )
}

export default CreateSurveyCard;