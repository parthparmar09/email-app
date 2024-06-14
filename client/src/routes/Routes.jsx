import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth, Emails, User } from "@pages";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Emails />} />
          {/* <Route path="/emails/:id" element={<Emails />} /> */}
          <Route path="/profile" element={<User />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
