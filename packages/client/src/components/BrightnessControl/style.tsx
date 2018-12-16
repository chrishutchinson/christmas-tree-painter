import styled from "styled-components";

export const Title = styled.h2`
  color: #000;
  font-family: Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 14px;
  margin: 0 0 5px;
`;

export const Container = styled.ul`
  list-style-type: none;
  margin: 0 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #31394c;
  justify-content: space-between;
  padding: 6px;
  border-radius: 3px;

  li {
    display: inline-flex;
  }

  input[type="radio"] {
    width: 0;
    height: 0;
    display: inline;
    opacity: 0;
    overflow: hidden;
    appearance: none;
    margin: 0;
  }

  label {
    padding: 10px 20px;
    color: #fff;
    font-family: Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 3px;
    letter-spacing: 2px;
    font-size: 14px;
    border: 0;
    appearance: none;
  }

  input[type="radio"]:checked + label {
    background: #fff;
    color: #31394c;
  }
`;
