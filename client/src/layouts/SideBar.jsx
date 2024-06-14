import { Box, Typography } from "@mui/material";
import { CategoryList, ComposeButton, UserLabels, UserMenu } from "@components";

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
      <Typography variant="h4" fontWeight="bold" color="divider">
        MailHub
      </Typography>
      <ComposeButton />
      <CategoryList />
      <UserLabels />
      <UserMenu />
    </Box>
  );
}

export default SideBar;
