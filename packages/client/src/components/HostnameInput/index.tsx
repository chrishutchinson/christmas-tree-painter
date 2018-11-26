import * as React from "react";

import { Form } from "./style";

type LoadState = "NOT_LOADED" | "IS_LOADING" | "LOADED" | "LOAD_ERROR";

interface HostnameInputProps {
  onComplete: (hostname: string) => void;
}

interface HostnameInputState {
  loadState: LoadState;
}

const testHostname = (hostname: string) =>
  fetch(`http://${hostname}/api/v1/test`).then(res => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res;
  });

class HostnameInput extends React.Component<
  HostnameInputProps,
  HostnameInputState
> {
  state: HostnameInputState = {
    loadState: "NOT_LOADED"
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { onComplete } = this.props;

    event.preventDefault();

    const hostname = event.currentTarget.elements.namedItem(
      "hostname"
    ) as HTMLInputElement;

    this.setState(() => ({
      loadState: "IS_LOADING"
    }));

    await testHostname(hostname.value);

    this.setState(() => ({ loadState: "LOADED" }));

    onComplete(hostname.value);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
