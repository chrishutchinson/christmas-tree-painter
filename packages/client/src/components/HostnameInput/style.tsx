import styled from "styled-components";

export const Form = styled.form`
  margin: 40px 0;

  label {
    max-width: 230px;
    display: block;
    margin: 0 auto;
    line-height: 1.4em;
  }

  p {
    display: flex;
  }

  input[type="text"] {
    border: 1px solid #31394c;
    background: #fff;
    appearance: none;
    padding: 9px 10px;
    font-family: Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 14px;
    min-width: 200px;
  }

  input[type="submit"] {
    background: #31394c;
    border: 0;
    appearance: none;
    color: #fff;
    padding: 10px 20px;
    font-family: Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 14px;
  }
`;
