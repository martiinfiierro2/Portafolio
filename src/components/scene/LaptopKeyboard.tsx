const rows = [
  ['esc', '▱', '☀', '☀', '◻', '⌕', '◁', '▷', '◀', '▶', '◉'],
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'],
  ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['⇪', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '↵'],
  ['⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '⇧'],
  ['fn', '⌃', '⌥', '⌘', '', '', '', '⌘', '⌥', '◁', '▷'],
];

export default function LaptopKeyboard() {
  return (
    <div className="laptop-base" aria-hidden="true">
      <div className="keyboard">
        {rows.map((row, i) => (
          <div className="keyboard-row" key={i}>
            {row.map((key, j) => (
              <span
                className={
                  i === 5 && j === 4
                    ? 'space-key'
                    : i === 5 && (j === 5 || j === 6)
                      ? 'hidden-key'
                      : ''
                }
                key={j}
              >
                {key}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="trackpad" />
    </div>
  );
}
