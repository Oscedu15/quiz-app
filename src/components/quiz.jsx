import { useState } from "react";
import Results from "./results";

function Quiz() {
  const questionBank = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language is used for web apps?",
      options: ["PHP", "Python", "Javascript", "All"],
      answer: "All",
    },
    {
      question: "Who is the current CEO of Tesla?",
      options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      answer: "Elon Musk",
    },
  ];

  //Se define un arreglo que representa las respuestas del usuario.
  const initialAnswers = [null, null, null];

  //Almacena las respuestas del usuario. que al inicio seran null.
  const [userAnswers, setUserAnswers] = useState(initialAnswers);

  //Mantiene el índice de la pregunta actual que se está mostrando
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const selectedAnswer = userAnswers[currentQuestion]; // null

  function handleSelectOption(option) {
    //Crea una copia del arreglo userAnswers
    const newUserAnswers = [...userAnswers];
    //Y actualiza la respuesta del usuario para la pregunta actual.
    newUserAnswers[currentQuestion] = option;

    //Llamamos para actualizar el estado con las nuevas respuestas.
    setUserAnswers(newUserAnswers);
  }

  function goToNext() {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function goToPrev() {
    if (currentQuestion < 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function restarQuiz() {
    setUserAnswers(initialAnswers);
    setCurrentQuestion(0);
    setIsQuizCompleted(false);
  }

  if (isQuizCompleted) {
    return (
      <Results
        userAnswers={userAnswers}
        restarQuiz={restarQuiz}
        questionBank={questionBank}
      />
    );
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{questionBank[currentQuestion].question}</p>
      {questionBank[currentQuestion].options.map((option, index) => (
        <button
          key={index}
          className={"option" + (selectedAnswer === option ? " selected" : "")}
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}
      <div className="nav-buttons">
        <button onClick={() => goToPrev()} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={() => goToNext()} disabled={!selectedAnswer}>
          {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
