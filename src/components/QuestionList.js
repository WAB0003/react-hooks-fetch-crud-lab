import React, { useTransition} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({allQuestions, handleDeletedQuestion, changeCorrectAnswer}) {

  
 const questionList = allQuestions.map((question,index)=>{
    return (
      <QuestionItem key={index} question = {question} handleDeletedQuestion={handleDeletedQuestion} changeCorrectAnswer={changeCorrectAnswer} />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
