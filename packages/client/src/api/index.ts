import { ColorResult } from "../types";

export const getTree = (hostname: string) =>
  fetch(`http://${hostname}/api/v1/tree`).then(res => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });

export const getPixels = (hostname: string) =>
  fetch(`http://${hostname}/api/v1/pixels`).then(res => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });

export const setPixelColor = (
  hostname: string,
  pixelId: number,
  { rgb }: ColorResult
) =>
  fetch(`http://${hostname}/api/v1/pixel/${pixelId}`, {
    method: "post",
    body: JSON.stringify({
      color: rgb
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res;
  });
