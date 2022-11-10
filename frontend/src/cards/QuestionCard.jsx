import React from "react";

function QuestionCard(question) {

  function handleDelete() {
    question.onDelete(question.id);
  }

  function handleEdit() {
    question.onEdit(question.id);
    question.onDelete(question.id);
  }
  
  return (
    <div className="question">
      <h1>{question.id+1}. {question.question}</h1>
      <p>a) {question.option1}</p>
      <p>b) {question.option2}</p>
      <p>c) {question.option3}</p>
      <p>d) {question.option4}</p>
      <button onClick={handleDelete}>
        Delete
      </button>
      <button onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
}

export default QuestionCard;
