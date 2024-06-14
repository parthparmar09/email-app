import { Avatar, Box, Typography } from "@mui/material";

function UserMenu() {
  return (
    <Box
      className="flex-centered"
      sx={{
        mt: "auto",
        justifyContent: "flex-start",
        gap: 1,
        borderTop: "1px dashed",
        borderColor: "divider",
        pt: 1,
      }}
    >
      <Avatar />
      <Box>
        <Typography fontWeight="500">Parth Parmar</Typography>
        <Typography variant="subtitle1" fontStyle="italic">
          parth@gmail.com
        </Typography>
      </Box>
    </Box>
  );
}

export default UserMenu;
