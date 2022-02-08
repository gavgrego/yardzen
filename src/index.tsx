import { createTheme, ThemeProvider } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Budget from "./pages/Budget/index";
import Welcome from "./pages/Welcome/index";

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

//TODO: Stick this theme config somewhere else
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
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textAlign: "center",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        inputAdornedStart: {
          marginLeft: ".25rem",
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="budget" element={<Budget />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
