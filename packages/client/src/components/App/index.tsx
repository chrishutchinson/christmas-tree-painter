import * as React from "react";

import Tree from "../Tree/index";
import HostnameInput from "../HostnameInput/index";

import { GlobalStyle, AppStyle, Container } from "./style";

interface AppState {
  hostname?: string;
}

class App extends React.Component {
  state: AppState = {
    hostname: null
  };

  handleHostnameCompletion = async (hostname: string) => {
    this.setState(() => ({ hostname }));
  };

  render() {
    const { hostname } = this.state;

    return (
      <AppStyle>
        <GlobalStyle />
        <Container hasInitialised={!!hostname}>
          <hr />
          <h1>🌟 🎄 🌟 🎄 🌟 🎄 🌟</h1>
          <h1>Paint your Christmas tree</h1>
          <hr />
          {!hostname && (
            <HostnameInput onComplete={this.handleHostnameCompletion} />
          )}
          {hostname && <Tree hostname={hostname} />}
        </Container>
      </AppStyle>
    );
  }
}

export default App;
