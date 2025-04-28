function Results({ questionBank, userAnswers, restarQuiz }) {
  function getScore() {
    let finalScore = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === questionBank[index].answer) {
        finalScore ++;
      }
    });

    return finalScore;
  }

  const score = getScore();

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>
        Your Score: {score}/{questionBank.length}
      </p>
      <button onClick={restarQuiz} className="restart-button">
        Restar Quiz
      </button>
    </div>
  );
}

export default Results;
