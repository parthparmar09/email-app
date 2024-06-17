import { StarRounded } from "@mui/icons-material";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const commonStyles = {
  borderBottom: "1.5px dashed",
  borderColor: "divider",
  p: 1,
};

function EmailHeader({ email }) {
  const user = useSelector((state) => state.user);
  const metaData = email?.userMetadata[user?._id];
  console.log(email?.userMetadata[user?._id]);
  return (
    <Box
      className="flex-centered"
      sx={{
        justifyContent: "space-between",
        ...commonStyles,
      }}
    >
      <Box>
        <Chip label="draft" variant="filled" sx={{ borderRadius: 2 }} />
      </Box>
      <Box className="flex-cenetered" sx={{ gap: 1 }}>
        <Tooltip
          title={metaData?.isStarred ? "Remove from Starred" : "Mark Starred"}
        >
          <IconButton>
            <StarRounded sx={{ color: metaData?.isStarred && "yellow" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default EmailHeader;
