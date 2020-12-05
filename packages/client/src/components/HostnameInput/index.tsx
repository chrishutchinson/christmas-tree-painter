import * as React from "react";

import { Form, Message } from "./style";

type LoadState = "NOT_LOADED" | "IS_LOADING" | "LOADED" | "LOAD_ERROR";

interface HostnameInputProps {
  onComplete: (hostname: string) => void;
}

interface HostnameInputState {
  loadState: LoadState;
}

const testHostname = (hostname: string, silentMode: boolean = true) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(reject, 10000);
    fetch(`${hostname}/api/v1/connect${silentMode ? "/silent" : ""}`)
      .then((res) => {
        if (res.status !== 200) throw new Error(res.statusText);
        clearTimeout(timeout);
        return res;
      })
      .then(resolve)
      .catch(reject);
  });

class HostnameInput extends React.Component<
  HostnameInputProps,
  HostnameInputState
> {
  state: HostnameInputState = {
    loadState: "IS_LOADING",
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { onComplete } = this.props;

    event.preventDefault();

    const hostname = event.currentTarget.elements.namedItem(
      "hostname"
    ) as HTMLInputElement;

    this.setState(() => ({
      loadState: "IS_LOADING",
    }));

    try {
      await testHostname(hostname.value, false);

      this.setState(() => ({ loadState: "LOADED" }));

      window.localStorage.setItem(
        "christmas-tree-painter:hostname",
        hostname.value
      );

      onComplete(hostname.value);
    } catch (e) {
      this.setState(() => ({
        loadState: "LOAD_ERROR",
      }));
    }
  };

  async componentDidMount() {
    const { onComplete } = this.props;

    const storedHostname = window.localStorage.getItem(
      "christmas-tree-painter:hostname"
    );

    if (storedHostname) {
      try {
        await testHostname(storedHostname);

        this.setState(() => ({ loadState: "LOADED" }));

        onComplete(storedHostname);
      } catch (e) {
        console.log({ e });
        this.setState(() => ({ loadState: "NOT_LOADED" }));
        window.localStorage.removeItem("christmas-tree-painter:hostname");
      }
      return;
    }

    this.setState(() => ({
      loadState: "NOT_LOADED",
    }));
  }

  render() {
    const { loadState } = this.state;

    if (loadState === "IS_LOADING") return <div>Loading...</div>;

    return (
      <Form onSubmit={this.handleSubmit}>
        {loadState === "LOAD_ERROR" && (
          <Message>
            I'm struggling to connect, check your Christmas tree server is awake
            and try again.
          </Message>
        )}
        <label htmlFor="hostname">
          Enter the hostname for your Christmas Tree server
        </label>
        <p>
          <input
            type="text"
            placeholder="hostname or IP"
            id="hostname"
            name="hostname"
          />
          <input type="submit" value="Connect" />
        </p>
      </Form>
    );
  }
}

export default HostnameInput;
