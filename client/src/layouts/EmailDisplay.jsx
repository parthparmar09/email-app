import { Box } from "@mui/material";
import { EmailList, EmailSection } from "../features/emails";

function EmailDisplay({ sx }) {
  return (
    <Box sx={{ display: "flex", height: 1, gap: 2, ...sx }}>
      <EmailList sx={{ flex: 0.5, borderRadius: 5 }} />
      <EmailSection sx={{ flexGrow: 1, borderRadius: 5 }} />
    </Box>
  );
}

export default EmailDisplay;
