import {
  CloseRounded,
  DraftsRounded,
  OpenInFullRounded,
  SendRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { useState } from "react";
import EmailInput from "./EmailInput";

const inputFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-root": {
    "&::before, &::after": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    border: "none",
  },
};

function EmailCompose({ sx }) {
  const [isBig, setIsBig] = useState(false);
  const [showCcs, setShowCcs] = useState(false);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [recipientIds, setRecipientIds] = useState([]);
  const [ccIds, setCcIds] = useState([]);
  const [bccIds, setBccIds] = useState([]);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: isBig ? 400 : 250,
  };

  return (
    <Paper
      sx={{
        height: isBig ? 0.95 : 0.6,
        width: isBig ? 0.975 : 0.45,
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Box
        className="flex-centered"
        sx={{ justifyContent: "space-between", p: 2, bgcolor: "grey.main" }}
      >
        <Typography fontWeight="500" variant="h6">
          New Message
        </Typography>
        <Box className="flex-centered">
          <IconButton onClick={() => setIsBig(!isBig)}>
            <OpenInFullRounded />
          </IconButton>
          <IconButton>
            <CloseRounded />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          maxHeight: 0.8,
          overflowY: "scroll",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailInput
            emails={recipientIds}
            setEmails={setRecipientIds}
            title={"To"}
            sx={inputFieldStyle}
          />
          <Typography
            variant="body2"
            fontWeight="500"
            sx={{
              cursor: "pointer",
              width: 0.1,
              ":hover": { textDecoration: "underline" },
            }}
            onClick={() => setShowCcs(!showCcs)}
          >
            CC/BCC
          </Typography>
        </Box>
        {showCcs && (
          <>
            <EmailInput
              emails={ccIds}
              setEmails={setCcIds}
              title={"CC"}
              sx={inputFieldStyle}
            />
            <EmailInput
              emails={bccIds}
              setEmails={setBccIds}
              title={"BCC"}
              sx={inputFieldStyle}
            />
          </>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
            mb: 1,
          }}
        >
          Subject:{" "}
          <TextField
            size="small"
            fullWidth
            sx={{ ...inputFieldStyle }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Box>
        <JoditEditor
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </Box>
      <Box
        className="flex-centered"
        sx={{ justifyContent: "flex-end", gap: 2, p: 2, mt: "auto" }}
      >
        <Button
          endIcon={<DraftsRounded />}
          variant="outlined"
          color="secondary"
        >
          Draft
        </Button>
        <Button endIcon={<SendRounded />} variant="contained" color="secondary">
          Send
        </Button>
      </Box>
    </Paper>
  );
}

export default EmailCompose;
