import * as React from "react";
import * as tinycolor from "tinycolor2";

import { getTree, getPixels, setPixelColor } from "../../api/index";
import { ColorResult } from "../../types";
import PaintPot from "../PaintPot/index";
import Controls from "../Controls/index";

import { TreeContainer, LED } from "./style";

type LoadState = "NOT_LOADED" | "IS_LOADING" | "LOADED" | "LOAD_ERROR";
type Mode = "PAINT" | "CYCLE" | "RANDOM";

interface TreeProps {
  hostname: string;
}

interface TreeState {
  loadState: LoadState;
  tree?: Array<Array<number>>;
  activeColor?: ColorResult;
  paint: {
    [key: number]: ColorResult;
  };
  isDragging: boolean;
}

interface Pixel {
  r: number;
  g: number;
  b: number;
}

const convertPixelToColorResult = (pixel: Pixel) => {
  const color = tinycolor(pixel);
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const rgb = color.toRgb();
  const hex = color.toHex();

  const transparent = hex === "000000" && rgb.a === 0;

  return {
    hsl,
    hex: transparent ? "transparent" : `#${hex}`,
    rgb,
    hsv
  };
};
const mapPixelsToPaint = (pixels: Array<Pixel>) =>
  pixels.map(convertPixelToColorResult);

class Tree extends React.Component<TreeProps, TreeState> {
  state: TreeState = {
    loadState: "NOT_LOADED",
    tree: null,
    activeColor: convertPixelToColorResult({
      r: 96,
      g: 125,
      b: 139
    }),
    paint: {},
    isDragging: false
  };

  handleColorSelect = (color: ColorResult) => {
    this.setState(() => ({
      activeColor: color
    }));
  };

  async componentDidMount() {
    const { hostname } = this.props;

    this.setState(() => ({
      loadState: "IS_LOADING"
    }));

    try {
      const [tree, pixels] = await Promise.all([
        getTree(hostname),
        getPixels(hostname)
      ]);

      this.setState(() => ({
        loadState: "LOADED",
        tree,
        paint: mapPixelsToPaint(pixels)
      }));
    } catch (e) {
      this.setState(() => ({
        loadState: "LOAD_ERROR"
      }));
    }
  }

  handlePaint = (led: number) => (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const { hostname } = this.props;
    const { activeColor } = this.state;

    if (!activeColor) return;

    this.setState(
      ({ paint }) => ({ paint: { ...paint, [led]: activeColor } }),
      () => setPixelColor(hostname, led, activeColor)
    );
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState(() => ({
      isDragging: true
    }));
  };

  handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState(() => ({
      isDragging: false
    }));
  };

  handlePaintMouseover = (led: number) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { hostname } = this.props;
    const { isDragging, activeColor } = this.state;

    if (!isDragging || !activeColor) return;

    this.setState(
      ({ paint }) => ({ paint: { ...paint, [led]: activeColor } }),
      () => setPixelColor(hostname, led, activeColor)
    );
  };

  handleControlSelect = (mode: Mode) => {
    console.log({ mode });
  };

  render() {
    const { loadState, tree, paint, activeColor } = this.state;

    if (["LOAD_ERROR", "NOT_LOADED"].includes(loadState)) return null;

    if (loadState === "IS_LOADING" || !tree) return <p>Growing your tree...</p>;

    return (
      <TreeContainer
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {tree.map((row, index) => (
          <p key={index}>
            {row.map(led => (
              <LED
                key={led}
                backgroundColor={paint[led]}
                onMouseDown={this.handlePaint(led)}
                onKeyPress={this.handlePaint(led)}
                onMouseOver={this.handlePaintMouseover(led)}
              />
            ))}
          </p>
        ))}

        <PaintPot
          color={activeColor}
          onChangeComplete={this.handleColorSelect}
        />
        {/* <Controls onSelect={this.handleControlSelect} /> */}
      </TreeContainer>
    );
  }
}

export default Tree;
