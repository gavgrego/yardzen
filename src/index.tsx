import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStyles, createTheme, ThemeProvider } from "@mui/material";
import { green, purple, red, yellow } from "@mui/material/colors";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#000",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    error: red,
    warning: yellow,
    success: green,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 400,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h4: {
      fontSize: "1.75rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
