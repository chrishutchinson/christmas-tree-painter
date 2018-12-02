import styled from "styled-components";
import { ColorResult } from "../../types";

export const TreeContainer = styled.div`
  p {
    display: flex;
    justify-content: center;
    margin: 0;
  }
`;

interface LEDProps {
  backgroundColor: ColorResult;
}
export const LED = styled.button<LEDProps>`
  display: inline-block;
  height: 40px;
  width: 15px;
  border: 1px solid #bababa;
  margin: 2px 1px;
  border-radius: 4px;
  ${({ backgroundColor }: LEDProps) =>
    backgroundColor ? `background-color: ${backgroundColor.hex};` : ""}
`;
