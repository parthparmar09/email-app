import { LogoutRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };
  return (
    <>
      <Box
        onClick={handleClick}
        className="flex-centered"
        sx={{
          mt: "auto",
          justifyContent: "flex-start",
          gap: 1,
          borderTop: 2,
          borderColor: "divider",
          p: 1,
          cursor: "pointer",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          "&:hover": {
            bgcolor: "divider",
          },
        }}
      >
        <Avatar />
        <Box>
          <Typography fontWeight="500">{user?.username}</Typography>
          <Typography variant="subtitle2" fontStyle="italic">
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
