import { Box, Chip, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const commonStyles = {
  borderBottom: "1.5px dashed",
  borderColor: "divider",
  p: 1,
};
function EmailSection({ sx }) {
  const email = useSelector((state) => state.selectedEmail);
  return (
    <Paper elevation={0} sx={{ ...sx }}>
      {email ? (
        <>
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
          </Box>
        </>
      ) : (
        <h6>Select an email</h6>
      )}
    </Paper>
  );
}

export default EmailSection;
