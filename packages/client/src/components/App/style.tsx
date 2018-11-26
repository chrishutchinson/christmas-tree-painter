import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Libre Baskerville", serif;
    font-weight: 400;
    background: #fafafa;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }
`;

export const AppStyle = styled.main`
  display: flex;
  height: 100vh;
`;

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 325px;
  text-align: center;

  h1 {
    margin: 0 0 10px;
  }

  hr {
    border: 0;
    width: 100%;
    height: 4px;
    max-width: 180px;
    margin: 20px auto;
    border-top: 1px solid #bababa;
    border-bottom: 1px solid #bababa;
  }
`;
