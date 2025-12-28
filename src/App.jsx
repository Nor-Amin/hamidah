import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import { quizData } from "./quizData";

export default function App() {
  const [subject, setSubject] = useState("");
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const subjects = Object.keys(quizData);

  useEffect(() => {
    if (subject) {
      const shuffled = [...quizData[subject]].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setIndex(0);
      setScore(0);
      setAnswered(false);
    }
  }, [subject]);

  function handleAnswer(isCorrect) {
    if (answered) return;
    setAnswered(true);
    if (isCorrect) setScore(score + 1);
  }

  return (
    <div className="app-container">
      <div className="quiz-card">

        <h1 className="title">📘 Quiz App</h1>

        {subject && (
          <div className="score">
            Score: <strong>{score}</strong> / {cards.length}
          </div>
        )}

        <select
          className="select"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {subject && cards.length > 0 && (
          <>
            <Flashcard card={cards[index]} onAnswer={handleAnswer} />

            <button
              className="next-btn"
              onClick={() => {
                setIndex((index + 1) % cards.length);
                setAnswered(false);
              }}
            >
              Next Question →
            </button>

            <div className="progress">
              Question {index + 1} of {cards.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
