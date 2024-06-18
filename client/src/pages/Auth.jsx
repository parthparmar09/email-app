import { useLocation } from "react-router-dom";
import { LoginForm, SignupForm } from "@features/auth";
import { Box } from "@mui/material";

const Auth = () => {
  const location = useLocation();

  return (
    <Box
      className="flex-centered"
      sx={{ height: "100vh", w: 1, bgcolor: "grey.main" }}
    >
      {location.pathname === "/login" && <LoginForm />}
      {location.pathname === "/signup" && <SignupForm />}
    </Box>
  );
};

export default Auth;
