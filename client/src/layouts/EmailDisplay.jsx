import { Box } from "@mui/material";
import { EmailList, EmailSection } from "@features/emails";

function EmailDisplay({ sx }) {
  return (
    <Box sx={{ display: "flex", height: 1, gap: 2, ...sx }}>
      <EmailList sx={{ flex: 0.3, borderRadius: 5, p: 2 }} />
      <EmailSection sx={{ borderRadius: 5, flex: 0.7, p: 2 }} />
    </Box>
  );
}

export default EmailDisplay;
