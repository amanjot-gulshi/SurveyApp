import React from 'react';


function SurveyCard(props) {

    return (
        <div>
            <h1>{props.question}</h1>
            {props.options.map((option)=>(
                <p>- {option}</p>
            ))}

        </div>
    )
}

export default SurveyCard;