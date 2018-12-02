import styled from "styled-components";

export const Container = styled.header`
  text-align: left;
  text-transform: uppercase;
  margin: 0 0 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;

  h1 {
    font-family: Helvetica, sans-serif;
    font-weight: 100;
    margin: 0 0 10px;
    letter-spacing: 2px;
  }

  p {
    margin: 0 0 10px;
    font-size: 14px;
    text-align: center;
    padding-left: 20px;
    min-width: 122px;
  }
`;
