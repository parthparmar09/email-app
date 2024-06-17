import { Box } from "@mui/material";
import { CategoryList, ComposeButton } from "@components";
import { UserMenu } from "@features/users";
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
      <UserMenu />
    </Box>
  );
}

export default SideBar;
