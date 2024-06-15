import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

function EmailListFooter({ page, total, setPage }) {
  return (
    <Box
      className="flex-centered"
      sx={{
        borderTop: 2,
        borderColor: "divider",
        justifyContent: "space-between",
        p: 1,
        color: "primary.dark",
      }}
    >
      <Typography>
        {(page - 1) * 12 + 1} - {Math.min(page * 12, total)} of {total} Emails
      </Typography>
      <Box>
        <Tooltip title="Prev">
          <span>
            <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ArrowBackIosNewRounded />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Next">
          <span>
            <IconButton
              onClick={() => setPage(page + 1)}
              disabled={page >= total / 12}
            >
              <ArrowForwardIosRounded />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default EmailListFooter;
