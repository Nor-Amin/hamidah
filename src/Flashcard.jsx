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
    <div>
      <h3>{card.question}</h3>

      {options.map((o, i) => (
        <button
          key={i}
          onClick={() => handleSelect(o)}
          disabled={selected !== null}
          style={{
            display: "block",
            marginBottom: "8px",
            background:
              selected &&
              (o === card.correct
                ? "lightgreen"
                : o === selected
                ? "salmon"
                : "")
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
