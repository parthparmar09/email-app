import { EditRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

function ComposeButton() {
  return (
    <Button startIcon={<EditRounded />} variant="contained" sx={{ py: 1 }}>
      Compose
    </Button>
  );
}

export default ComposeButton;
