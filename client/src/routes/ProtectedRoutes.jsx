import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDataQuery, setUser } from "@features/users";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { data: userData, error, isLoading, refetch } = useGetUserDataQuery();

  useEffect(() => {
    if (!user && !isLoading && !error) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  // if (!user && !isLoading) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
