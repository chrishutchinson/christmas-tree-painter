import * as React from "react";

interface HostnameInputProps {
  onSubmit: (hostname: string) => void;
}

export default ({ onSubmit }: HostnameInputProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hostname = event.currentTarget.elements.namedItem(
      "hostname"
    ) as HTMLInputElement;

    onSubmit(hostname.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="hostname">
        Enter the hostname for your Christmas Tree server:
      </label>
      <input type="text" id="hostname" name="hostname" />
      <input type="submit" value=">" />
    </form>
  );
};
