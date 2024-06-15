import { EmailOutlined, FiberManualRecordRounded } from "@mui/icons-material";
import { Avatar, Box, ListItemButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "@app";
import { useState } from "react";
import moment from "moment";
import { useUpdateRecipientMetadataMutation } from "./emailApi";

function EmailListItem({ email }) {
  const user = useSelector((state) => state.user);
  const selectedEmail = useSelector((state) => state.selectedEmail);
  const [updateEmailMetadata] = useUpdateRecipientMetadataMutation();
  const dispatch = useDispatch();
  const [isRead, setIsRead] = useState(
    email?.isDraft || email?.userMetadata[user?._id]?.isRead
  );

  const handleEmailClick = () => {
    dispatch(selectEmail(email));
    setIsRead(true);
    updateEmailMetadata({
      emailId: email._id,
      update: {
        isRead: true,
      },
    });
  };

  return (
    <ListItemButton
      sx={{
        borderRadius: 2.5,
        bgcolor: selectedEmail?._id === email._id && "grey.main",
        color: "primary.dark",
        gap: 2,
      }}
      onClick={handleEmailClick}
    >
      <Avatar />
      <Box>
        <Typography fontWeight="bold" color="primary">
          {email.senderId.username}
        </Typography>
        <Typography
          variant="body2"
          color={!isRead && "primary.light"}
          fontWeight={!isRead && "600"}
        >
          {email.subject.length > 25
            ? email.subject.substr(0, 25) + " ..."
            : email.subject}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="body2">
          {moment(email.createdAt).format("DD MMM")}
        </Typography>
        <FiberManualRecordRounded
          sx={{
            fontSize: "small",
            color: "secondary.main",
            ml: "auto",
            visibility: isRead ? "hidden" : "visible",
          }}
        />
      </Box>
    </ListItemButton>
  );
}

export default EmailListItem;
