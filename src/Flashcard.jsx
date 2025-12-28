import { useEffect, useMemo, useState } from "react";

export default function Flashcard({ card, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const options = useMemo(
    () => [...card.options].sort(() => Math.random() - 0.5),
    [card]
  );

  useEffect(() => setSelected(null), [card]);

  function handleSelect(option) {
    setSelected(option);
    onAnswer(option === card.correct);
  }

  return (
    <div className="flashcard">
      <h3 className="question">{card.question}</h3>

      <div className="options">
        {options.map((o, i) => {
          let className = "option-btn";

          if (selected) {
            if (o === card.correct) className += " correct";
            else if (o === selected) className += " wrong";
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(o)}
              disabled={selected !== null}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
