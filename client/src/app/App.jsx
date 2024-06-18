import { ThemeProvider, createTheme } from "@mui/material";
import { Routes } from "@routes";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      light: "#27374D",
      main: "#373A40",
      dark: "#686D76",
      contrastText: "#fff",
    },
    secondary: {
      light: "#003285",
      main: "#2A629A",
      dark: "#4F93CC",
      contrastText: "#fff",
    },
    grey: {
      main: "#eeeeee",
    },
  },

  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
          textTransform: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Poppins",
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
