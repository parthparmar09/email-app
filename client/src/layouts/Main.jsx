import { Box } from "@mui/material";
import SideBar from "./SideBar";

function Main({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        height: "100vh",
        p: 3,
        bgcolor: "grey.main",
        position: "relative",
      }}
    >
      <SideBar sx={{ flex: 0.15 }} />
      <Box sx={{ flex: 0.85, height: 1 }}>{children}</Box>
    </Box>
  );
}

export default Main;
