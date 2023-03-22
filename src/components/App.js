import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
    //!create a State variable for all questions to be set to once fetched
    const [allQuestions,setAllQuestions]=useState([])

    useEffect(()=>{
      fetch("http://localhost:4000/questions")
      .then(resp=>resp.json())
      .then(data=>setAllQuestions(data))
    },[])
  
  //!Create a function to handle adding a new question from form
  const handleNewQuestion = (newQuestion)=>{
    //*Make sure to pass a callback function through the setter. In this case, previous Questions just represents the previous State.
    setAllQuestions((previousQuestions)=>[...previousQuestions,newQuestion])
  }
  
  //!Create a function to handle DELETE question from all questions
  const handleDeletedQuestion = (deletedQuestion)=>{
    const updatedQuestions = allQuestions.filter((question)=>question.id !== deletedQuestion.id)
    setAllQuestions(updatedQuestions)
  }

  //!Create a function to handle PATCH
  const changeCorrectAnswer = (updatedQuestion) => {
    const updatedQuestions = allQuestions.map((question)=>{
      if(question.id ===updatedQuestion.id){
        return updatedQuestion;
      }else{
        return question
      }
    })
    setAllQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage}/>
      {page === "Form" ? <QuestionForm handleNewQuestion={handleNewQuestion} /> : <QuestionList allQuestions={allQuestions} handleDeletedQuestion={handleDeletedQuestion} changeCorrectAnswer={changeCorrectAnswer} />}
    </main>
  );
}

export default App;
