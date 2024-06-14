import { Box, Typography } from "@mui/material";
import { CategoryList, ComposeButton, UserLabels } from "@components";

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
      <Typography variant="h4" fontWeight="bold">
        MailHub
      </Typography>
      <ComposeButton />
      <CategoryList />
      <UserLabels />
    </Box>
  );
}

export default SideBar;
