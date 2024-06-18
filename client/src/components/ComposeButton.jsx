import { EditRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openCompose } from "@features/emails";

function ComposeButton() {
  const dispatch = useDispatch();

  return (
    <Button
      startIcon={<EditRounded />}
      onClick={() => dispatch(openCompose())}
      variant="contained"
      sx={{ py: 1 }}
    >
      Compose
    </Button>
  );
}

export default ComposeButton;
