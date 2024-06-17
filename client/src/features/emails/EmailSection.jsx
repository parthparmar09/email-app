import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EmailHeader from "./EmailHeader";
import moment from "moment";
import noMail from "@assets/no-mail.svg";

const commonStyles = {
  borderBottom: "1.5px dashed",
  borderColor: "divider",
  p: 1,
  py: 2,
};

function EmailSection({ sx }) {
  const email = useSelector((state) => state.selectedEmail);
  return (
    <Paper elevation={0} sx={{ ...sx }}>
      {email ? (
        <>
          <EmailHeader email={email} commonStyles={commonStyles} />

          <Box
            className="flex-centered"
            sx={{ justifyContent: "space-between", ...commonStyles }}
          >
            <Typography fontWeight="500" sx={{ maxWidth: 0.8 }}>
              {email.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {moment(email.createdAt).format("DD MMM YYYY, h:mm a")}
            </Typography>
          </Box>
          <Box
            className="flex-centered"
            sx={{
              justifyContent: "flex-start",
              gap: 1,
              ...commonStyles,
            }}
          >
            <Avatar sx={{ height: 48, width: 48 }} />
            <Box>
              <Box
                className="flex-centered"
                sx={{
                  justifyContent: "flex-start",
                  gap: 1,
                }}
              >
                <Typography fontWeight="500">
                  {email.senderId.username}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle1"
                >{`<${email.senderId.email}>`}</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                To: {email.recipientIds.map((r) => r.email).join(", ")}
              </Typography>
              {email.ccIds.length > 0 && (
                <Typography variant="subtitle2" color="text.secondary">
                  CC: {email.ccIds.map((r) => r.email).join(", ")}
                </Typography>
              )}
            </Box>
          </Box>
          <Typography
            sx={{ p: 2, textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: email.body }}
          />
        </>
      ) : (
        <Box
          className="flex-centered"
          sx={{ height: 1, width: 1, flexDirection: "column" }}
        >
          <img src={noMail} alt="No Mail" height="220" />
          <Typography variant="h6" color="text.secondary">
            No Email Selected
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Select an email to read
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default EmailSection;
