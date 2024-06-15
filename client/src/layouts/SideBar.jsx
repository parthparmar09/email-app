import { Box } from "@mui/material";
import { CategoryList, ComposeButton, UserLabels, UserMenu } from "@components";
import logo from "@assets/logo.png";

function SideBar({ sx }) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",

        gap: 1,
      }}
    >
      <Box component="img" src={logo} sx={{ height: 60 }} />
      <ComposeButton />
      <CategoryList />
      <UserLabels />
      <UserMenu />
    </Box>
  );
}

export default SideBar;
