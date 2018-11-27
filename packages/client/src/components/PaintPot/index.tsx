import * as React from "react";
import { CirclePicker } from "react-color";

import { PaintPotContainer } from "./style";

export default (props: any) => (
  <PaintPotContainer>
    <CirclePicker {...props} />
  </PaintPotContainer>
);
