import {
  DeleteRounded,
  EditRounded,
  LabelImportantRounded,
  MarkEmailUnreadRounded,
  StarRounded,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateRecipientMetadataMutation } from "./emailApi";
import { updateMetadata } from "@app";
import { openCompose } from "./emailComposeSlice";
import { selectEmail } from "@app";

function EmailHeader({ commonStyles }) {
  const user = useSelector((state) => state.user);
  const email = useSelector((state) => state.selectedEmail);
  const metaData = email?.userMetadata[user?._id];
  const [updateEmailMetadata] = useUpdateRecipientMetadataMutation();
  const dispatch = useDispatch();

  const EmailOptions = [
    {
      name: "starred",
      condition: metaData?.isStarred,
      icon: <StarRounded sx={{ color: metaData?.isStarred && "#fbc901" }} />,
      tooltipText: metaData?.isStarred ? "Remove Starred" : "Mark Starred",
      update: {
        isStarred: !metaData?.isStarred,
      },
    },
    {
      name: "important",
      condition: metaData?.isImportant,
      icon: (
        <LabelImportantRounded
          sx={{ color: metaData?.isImportant && "secondary.dark" }}
        />
      ),
      tooltipText: metaData?.isImportant
        ? "Remove Important"
        : "Mark Important",
      update: {
        isImportant: !metaData?.isImportant,
      },
    },
    {
      name: "read",
      condition: metaData?.isRead,
      icon: (
        <MarkEmailUnreadRounded
          sx={{ color: metaData?.isRead && "primary.light" }}
        />
      ),
      tooltipText: metaData?.isRead ? "Mark Read" : "Mark Unread",
      update: {
        isRead: !metaData?.isRead,
      },
    },
    {
      name: "trash",
      condition: metaData?.isTrashed,
      icon: (
        <DeleteRounded sx={{ color: metaData?.isTrashed && "error.main" }} />
      ),
      tooltipText: metaData?.isTrashed ? "Undo Trash" : "Trash",
      update: {
        isTrashed: !metaData?.isTrashed,
      },
    },
  ];

  const handleClick = (update) => {
    dispatch(updateMetadata({ userId: user._id, update }));
    updateEmailMetadata({
      emailId: email._id,
      update,
    });
  };

  const handleOpenDraft = () => {
    const emailData = {
      _id: email._id,
      subject: email.subject,
      body: email.body,
      recipientIds: email.recipientIds.map((r) => r.email),
      ccIds: email.ccIds.map((r) => r.email),
      bccIds: email.bccIds.map((r) => r.email),
    };

    dispatch(openCompose(emailData));
    dispatch(selectEmail(null));
  };

  return (
    <Box
      className="flex-centered"
      sx={{
        justifyContent: "space-between",
        ...commonStyles,
        py: 1,
      }}
    >
      <Button
        startIcon={<EditRounded />}
        sx={{ visibility: email?.isDraft ? "visible" : "hidden" }}
        onClick={handleOpenDraft}
        variant="outlined"
      >
        Edit Draft
      </Button>
      <Box className="flex-cenetered">
        {EmailOptions.map((opt, i) => (
          <Tooltip key={i} title={opt.tooltipText}>
            <IconButton onClick={() => handleClick(opt.update)}>
              {opt.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

export default EmailHeader;
