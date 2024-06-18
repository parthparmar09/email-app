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
import { useEffect, useRef, useState } from "react";
import EmailInput from "./EmailInput";
import { useDispatch, useSelector } from "react-redux";
import { closeCompose } from "./emailComposeSlice";
import { useCreateEmailMutation } from "./emailApi";
import toast from "react-hot-toast";

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
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const { isOpen, emailData } = useSelector((state) => state.emailCompose);
  const [createEmail] = useCreateEmailMutation();
  const [isBig, setIsBig] = useState(false);
  const [showCcs, setShowCcs] = useState(false);
  const [body, setBody] = useState(emailData.body);
  const [subject, setSubject] = useState(emailData.subject);
  const [recipientIds, setRecipientIds] = useState(emailData.recipientIds);
  const [ccIds, setCcIds] = useState(emailData.ccIds);
  const [bccIds, setBccIds] = useState(emailData.bccIds);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: isBig ? 400 : 250,
  };

  const handleSend = async (isDraft) => {
    if (!body || !subject || recipientIds.length === 0) {
      toast.error(
        "Please fill out all required fields: Body, Subject, Recipients"
      );
      return;
    }

    const email = {
      body,
      subject,
      recipientIds,
      ccIds,
      bccIds,
      isDraft,
    };

    try {
      const { data, error } = await createEmail({
        data: email,
        id: emailData._id,
      });
      if (error) {
        throw new Error(error.data.message);
      }
      toast.success(data.message);
      dispatch(closeCompose());
      setBody("");
      setSubject("");
      setRecipientIds([]);
      setCcIds([]);
      setBccIds([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setBody(emailData.body);
    setSubject(emailData.subject);
    setRecipientIds(emailData.recipientIds);
    setCcIds(emailData.ccIds);
    setBccIds(emailData.bccIds);
  }, [emailData]);

  return (
    isOpen && (
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
          sx={{
            justifyContent: "space-between",
            px: 2,
            py: 1,
            bgcolor: "grey.main",
          }}
        >
          <Typography fontWeight="500" variant="h6">
            New Message
          </Typography>
          <Box className="flex-centered">
            <IconButton onClick={() => setIsBig(!isBig)}>
              <OpenInFullRounded />
            </IconButton>
            <IconButton onClick={() => dispatch(closeCompose())}>
              <CloseRounded />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            px: 2,
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
            ref={editorRef}
            value={body}
            config={config}
            onBlur={(newContent) => setBody(newContent)}
          />
        </Box>
        <Box
          className="flex-centered"
          sx={{ justifyContent: "flex-end", gap: 2, p: 2, mt: "auto" }}
        >
          <Button
            endIcon={<DraftsRounded />}
            onClick={() => handleSend(true)}
            variant="outlined"
          >
            Draft
          </Button>
          <Button
            endIcon={<SendRounded />}
            variant="contained"
            color="secondary"
            onClick={() => handleSend(false)}
          >
            Send
          </Button>
        </Box>
      </Paper>
    )
  );
}

export default EmailCompose;
