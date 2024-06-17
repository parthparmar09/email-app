import { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const EmailInput = ({ emails, setEmails, title, sx }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = (email) => {
    if (isValidEmail(email)) {
      setEmails([...emails, email]);
      setInputValue("");
      setError("");
    } else {
      setError("Invalid email address");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail(inputValue.trim());
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: 1,
        borderColor: "divider",
        width: 1,
      }}
    >
      {title}:
      <Stack direction="row" spacing={0.5}>
        {emails.map((email, index) => (
          <Chip
            key={index}
            label={email}
            onDelete={() => handleRemoveEmail(email)}
          />
        ))}
      </Stack>
      <TextField
        size="small"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        fullWidth
        sx={{
          ...sx,
        }}
      />
    </Box>
  );
};

export default EmailInput;
