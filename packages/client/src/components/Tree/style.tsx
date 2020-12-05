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
  width: number;
}
export const LED = styled.button<LEDProps>`
  display: inline-block;
  height: 40px;
  width: ${(props: LEDProps) => props.width}%;
  border: 1px solid #bababa;
  padding: 0;
  border-radius: 4px;
  ${({ backgroundColor }: LEDProps) =>
    backgroundColor ? `background-color: ${backgroundColor.hex};` : ""}
`;
