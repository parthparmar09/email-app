import { StarRounded } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import EmailHeader from "./EmailHeader";

function EmailSection({ sx }) {
  const email = useSelector((state) => state.selectedEmail);
  return (
    <Paper elevation={0} sx={{ ...sx }}>
      {email ? (
        <>
          <EmailHeader email={email} />
        </>
      ) : (
        <h6>Select an email</h6>
      )}
    </Paper>
  );
}

export default EmailSection;
