import React from "react";

function QuestionItem({ question, handleDeletedQuestion, changeCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  //!Create a Delete request based on the click button
  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"DELETE",
    })
    .then((r)=>r.json())
    .then(()=>handleDeletedQuestion(question))
  }

  //!Create a PATCH request to update the Correct Answer
  const changeAnswerClick = (e) => {
    console.log(e.target.value)
    console.log(correctIndex)

    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"PATCH",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        correctIndex: e.target.value,
      }),
    })
    .then((r)=>r.json())
    .then((updatedQuestion)=>changeCorrectAnswer(updatedQuestion))
  }
  


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswerClick}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
