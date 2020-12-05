import * as React from "react";
import * as tinycolor from "tinycolor2";

import {
  getTree,
  getColors,
  getPixels,
  setPixelColor,
  setMode,
  getBrightness,
  setBrightness,
} from "../../api/index";
import { ColorResult } from "../../types";
import PaintPot from "../PaintPot/index";
import ModeControl, { Mode } from "../ModeControl/index";
import BrightnessControl from "../BrightnessControl/index";

import { TreeContainer, LED } from "./style";

type LoadState = "NOT_LOADED" | "IS_LOADING" | "LOADED" | "LOAD_ERROR";

interface TreeProps {
  hostname: string;
}

type TreeRow = {
  leds: Array<number>;
  width: number;
};

interface TreeState {
  loadState: LoadState;
  tree?: Array<TreeRow>;
  colors?: Array<string>;
  activeColor?: ColorResult;
  brightness: number;
  paint: {
    [key: number]: ColorResult;
  };
  isDragging: boolean;
  mode: Mode;
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
    hsv,
  };
};
const mapPixelsToPaint = (pixels: Array<Pixel>) =>
  pixels.map(convertPixelToColorResult);

class Tree extends React.Component<TreeProps, TreeState> {
  state: TreeState = {
    loadState: "NOT_LOADED",
    tree: null,
    colors: null,
    activeColor: convertPixelToColorResult({
      r: 96,
      g: 125,
      b: 139,
    }),
    brightness: 1,
    paint: {},
    isDragging: false,
    mode: "PAINT",
  };

  handleColorSelect = (color: ColorResult) => {
    this.setState(() => ({
      activeColor: color,
    }));
  };

  async componentDidMount() {
    const { hostname } = this.props;

    this.setState(() => ({
      loadState: "IS_LOADING",
    }));

    try {
      const [tree, colors, pixels, brightness] = await Promise.all([
        getTree(hostname),
        getColors(hostname),
        getPixels(hostname),
        getBrightness(hostname),
      ]);

      this.setState(() => ({
        loadState: "LOADED",
        tree,
        colors,
        brightness: parseFloat(brightness),
        paint: mapPixelsToPaint(pixels),
      }));
    } catch (e) {
      this.setState(() => ({
        loadState: "LOAD_ERROR",
      }));
    }
  }

  handlePaint = (led: number) => (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
  ) => {
    const { hostname } = this.props;
    const { activeColor } = this.state;

    if (!activeColor) return;

    this.setState(
      ({ paint }) => ({ paint: { ...paint, [led]: activeColor } }),
      () => setPixelColor(hostname, led, activeColor)
    );
  };

  handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    this.setState(() => ({
      isDragging: true,
    }));
  };

  handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    this.setState(() => ({
      isDragging: false,
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

  handleModeChange = (mode: Mode) => {
    const { hostname } = this.props;

    this.setState(() => ({ loadState: "IS_LOADING" }));

    setMode(hostname, mode)
      .then(() => (mode === "PAINT" ? getPixels(hostname) : Promise.resolve()))
      .then((pixels) => {
        this.setState(({ paint }) => ({
          mode,
          paint: mode === "PAINT" ? mapPixelsToPaint(pixels) : paint,
          loadState: "LOADED",
        }));
      })
      .catch(() => {
        this.setState(() => ({
          loadState: "LOAD_ERROR",
        }));
      });
  };

  handleBrightnessChange = (brightness: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { hostname } = this.props;

    this.setState(() => ({
      brightness,
    }));

    setBrightness(hostname, brightness);
  };

  render() {
    const {
      loadState,
      tree,
      colors,
      paint,
      activeColor,
      brightness,
      mode,
    } = this.state;

    if (["LOAD_ERROR", "NOT_LOADED"].includes(loadState)) return null;

    if (loadState === "IS_LOADING" || !tree) return <p>Growing your tree...</p>;

    return (
      <TreeContainer
        onTouchStart={this.handleMouseDown}
        onTouchEnd={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <ModeControl selected={mode} onChange={this.handleModeChange} />

        <BrightnessControl
          brightness={brightness}
          onChange={this.handleBrightnessChange}
        />

        {mode === "PAINT" && (
          <React.Fragment>
            {tree.map((row, index) => {
              const ledWidth = row.width / row.leds.length;
              console.log({ ledWidth });

              return (
                <p key={index}>
                  {row.leds.map((led) => (
                    <LED
                      key={led}
                      width={ledWidth}
                      backgroundColor={paint[led]}
                      onMouseDown={this.handlePaint(led)}
                      onKeyPress={this.handlePaint(led)}
                      onMouseOver={this.handlePaintMouseover(led)}
                    />
                  ))}
                </p>
              );
            })}
            <PaintPot
              colors={colors}
              color={activeColor}
              onChangeComplete={this.handleColorSelect}
            />
          </React.Fragment>
        )}
      </TreeContainer>
    );
  }
}

export default Tree;
