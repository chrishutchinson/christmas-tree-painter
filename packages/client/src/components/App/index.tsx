import * as React from "react";

import Header from "../Header/index";
import Tree from "../Tree/index";
import HostnameInput from "../HostnameInput/index";

import { GlobalStyle, AppStyle, AppContainer, Core } from "./style";

interface AppState {
  hostname?: string;
}

class App extends React.Component {
  state: AppState = {
    hostname: null,
  };

  handleHostnameCompletion = async (hostname: string) => {
    this.setState(() => ({ hostname }));
  };

  render() {
    const { hostname } = this.state;

    return (
      <AppStyle>
        <GlobalStyle />
        <AppContainer>
          <Header />
          <Core>
            {!hostname && (
              <HostnameInput onComplete={this.handleHostnameCompletion} />
            )}
            {hostname && <Tree hostname={hostname} />}
          </Core>
        </AppContainer>
      </AppStyle>
    );
  }
}

export default App;
