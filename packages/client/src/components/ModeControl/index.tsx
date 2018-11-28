import * as React from "react";

import { Container } from "./style";

const options: Array<Mode> = ["PAINT", "CYCLE", "RANDOM"];

export type Mode = "PAINT" | "CYCLE" | "RANDOM";

interface ModeControlProps {
  selected: Mode;
  onChange: (mode: Mode) => void;
}

export default ({ selected, onChange }: ModeControlProps) => (
  <Container>
    {options.map(o => (
      <li key={o}>
        <input
          type="radio"
          name="mode"
          id={`mode-${o}`}
          value={o}
          defaultChecked={selected === o}
          onClick={() => onChange(o)}
        />
        <label htmlFor={`mode-${o}`}>{o}</label>
      </li>
    ))}
  </Container>
);
