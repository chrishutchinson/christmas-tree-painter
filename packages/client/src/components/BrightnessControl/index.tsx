import * as React from "react";

import { Container, Title } from "./style";

export default (props: any) => (
  <React.Fragment>
    <Title>Set the tree's brightness:</Title>
    <Container>
      <li>
        <input
          type="radio"
          id="radio-low"
          name="brightness"
          value={0.2}
          defaultChecked={props.brightness === 0.2}
          onClick={props.onChange(0.2)}
        />
        <label htmlFor="radio-low">Low</label>
      </li>
      <li>
        <input
          type="radio"
          id="radio-mid"
          name="brightness"
          value={0.6}
          defaultChecked={props.brightness === 0.6}
          onClick={props.onChange(0.6)}
        />
        <label htmlFor="radio-mid">Mid</label>
      </li>
      <li>
        <input
          type="radio"
          id="radio-high"
          name="brightness"
          value={1}
          defaultChecked={props.brightness === 1}
          onClick={props.onChange(1)}
        />
        <label htmlFor="radio-high">High</label>
      </li>
    </Container>
  </React.Fragment>
);
