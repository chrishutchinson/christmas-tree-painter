import * as React from "react";

type LoadState = "NOT_LOADED" | "IS_LOADING" | "LOADED" | "LOAD_ERROR";

interface TreeState {
  loadState: LoadState;
}

class Tree extends React.Component<{}, TreeState> {
  state: TreeState = {
    loadState: "NOT_LOADED"
  };

  render() {
    return <div>Tree!</div>;
  }
}

export default Tree;
