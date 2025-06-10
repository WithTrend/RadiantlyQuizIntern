import React, { useState, useEffect } from "react";
import questions from "./data/questions";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [darkMode, setDarkMode] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
      setTimeLeft(15);
    } else {
      setShowScore(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(15);
    setShowScore(false);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(15);
    setShowScore(false);
  };

  const submitQuiz = () => {
    setShowScore(true);
  };

  useEffect(() => {
    if (!quizStarted || showScore) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          goToNextQuestion();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, quizStarted, showScore]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="quiz-box fade-in">
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {!quizStarted ? (
          <button className="main-button" onClick={startQuiz}>
            Start Quiz
          </button>
        ) : showScore ? (
          <div className="score-display">
            <h2>Your Score</h2>
            <p>
              {score} / {questions.length}
            </p>
            <button className="main-button" onClick={resetQuiz}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="question-count">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="timer">⏳ {timeLeft}s</div>
            <QuestionCard
              question={questions[currentIndex].question}
              options={questions[currentIndex].options}
              onAnswer={handleAnswer}
            />
            <button className="main-button" onClick={submitQuiz}>
              Submit Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
