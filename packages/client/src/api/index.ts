import { ColorResult, Mode } from "../types";

export const getTree = (hostname: string) =>
  fetch(`${hostname}/api/v1/tree`).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });

export const getColors = (hostname: string) =>
  fetch(`${hostname}/api/v1/colors`).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });

export const getPixels = (hostname: string) =>
  fetch(`${hostname}/api/v1/pixels`).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });

export const setPixelColor = (
  hostname: string,
  pixelId: number,
  { rgb }: ColorResult
) =>
  fetch(`${hostname}/api/v1/pixel/${pixelId}`, {
    method: "post",
    body: JSON.stringify({
      color: rgb,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res;
  });

export const setMode = (hostname: string, mode: Mode) =>
  fetch(`${hostname}/api/v1/mode/${mode.toLowerCase()}`, {
    method: "post",
  }).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res;
  });

export const getBrightness = (hostname: string) =>
  fetch(`${hostname}/api/v1/pixels/brightness`).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });

export const setBrightness = (hostname: string, brightness: number) =>
  fetch(`${hostname}/api/v1/pixels/brightness`, {
    method: "post",
    body: JSON.stringify({
      brightness,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res;
  });
