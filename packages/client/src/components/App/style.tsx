import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: #fafafa;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }
`;

export const AppStyle = styled.main`
  display: flex;
  height: 100vh;
`;

export const AppContainer = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  max-width: 325px;
  text-align: center;
`;

export const Core = styled.main`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

interface HeaderProps {
  hasInitialised: boolean;
}

export const Header = styled.header<HeaderProps>`
  ${(p: HeaderProps) =>
    p.hasInitialised
      ? `
          font-size: 10px;
        `
      : ""}

  h1 {
    margin: 0 0 10px;
  }

  hr {
    border: 0;
    width: 100%;
    height: 4px;
    max-width: 180px;
    margin: 10px auto;
    border-top: 1px solid #bababa;
    border-bottom: 1px solid #bababa;

    @media screen and (min-width: 768px) {
      margin: 20px auto;
    }
  }
`;
