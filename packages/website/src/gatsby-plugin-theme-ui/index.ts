import { system } from "@theme-ui/presets";
import nightOwl from "@theme-ui/prism/presets/night-owl-light.json";
import { Theme } from "theme-ui";

const heading = {
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const font = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const theme: Theme = {
  ...system,
  colors: {
    text: "#313131",
    background: "white",
    primary: "#cd4dcc",
    secondary: "text",
    muted: "#eff0f6",
    grey: "#a2a2a2",
    editor: "#282c34",
  },
  breakpoints: ["40em", "52em", "64em"],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: font,
    heading: `"Montserrat", ${font}`,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },
  fontSizes: [12, 14, 18, 20, 24, 32, 48, 64, 96],
  sizes: {
    container: "48em",
    measure: "32em",
    header: "4rem",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  styles: {
    ...system.styles,
    body: {
      fontFamily: "monospace",
    },
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      ...heading,
      fontSize: [5, 6, 7],
    },
    h2: {
      ...heading,
      mt: 4,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    a: {
      color: "text",
      textDecoration: "underline",
      transition: "color 250ms ease-in-out",

      "&:hover": {
        color: "primary",
      },
    },
    p: {
      code: {
        p: "2px",
        borderRadius: "4px",
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      ...nightOwl,
      backgroundColor: "muted",
      p: 2,
      borderRadius: "4px",
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    blockquote: {
      mt: 0,
      mx: 0,
      py: 0,
      pr: 0,
      pl: 3,
      borderLeft: "solid 4px hsla(0,0%,0%,0.13)",
      color: "hsla(0,0%,0%,0.53)",
    },
    ul: {},
    li: {
      pb: 1,
    },
  },
};

export default theme;
