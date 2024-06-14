import { ThemeProvider, createTheme } from "@mui/material";
import { Routes } from "@routes";

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
      dark: "#3572EF",
      contrastText: "#fff",
    },
    grey: {
      main: "#eeeeee",
    },
  },

  typography: {
    fontFamily: "Roboto",
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
    </ThemeProvider>
  );
}

export default App;
