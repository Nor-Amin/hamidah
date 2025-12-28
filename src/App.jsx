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

  // Shuffle cards whenever subject changes
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
    if (answered) return; // prevent double score
    setAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Quiz App</h1>

      {/* SCORE ON TOP */}
      {subject && (
        <h3>
          Score: {score} / {cards.length}
        </h3>
      )}

      {/* SUBJECT SELECTOR */}
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* FLASHCARD */}
      {subject && cards.length > 0 && (
        <>
          <Flashcard
            card={cards[index]}
            onAnswer={handleAnswer}
          />

          <button
            onClick={() => {
              setIndex((index + 1) % cards.length);
              setAnswered(false);
            }}
            style={{ marginTop: 10 }}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}
