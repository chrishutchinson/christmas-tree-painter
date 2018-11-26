import * as React from "react";

import Tree from "../Tree/index";
import HostnameInput from "../HostnameInput/index";

import { Container } from "./style";

type LoadState = "NOT_LOADED" | "IS_LOADING" | "LOADED" | "LOAD_ERROR";
type Hostname = string;

interface AppState {
  hostname?: string;
  hostnameLoadState: LoadState;
}

const testHostname = (hostname: Hostname) =>
  fetch(`http://${hostname}/test`).then(res => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res;
  });

class App extends React.Component {
  state: AppState = {
    hostname: null,
    hostnameLoadState: "NOT_LOADED"
  };

  handleHostnameSubmit = async (hostname: Hostname) => {
    this.setState(() => ({ hostnameLoadState: "IS_LOADING" }));

    await testHostname(hostname);

    this.setState(() => ({ hostname }));
  };

  render() {
    const { hostname } = this.state;

    return (
      <main>
        <h1>🎄 Paint your own Christmas tree</h1>
        <hr />
        <Container>
          {!hostname && <HostnameInput onSubmit={this.handleHostnameSubmit} />}
          {hostname && <Tree />}
        </Container>
      </main>
    );
  }
}

export default App;
