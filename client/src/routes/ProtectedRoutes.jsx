import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDataQuery, setUser } from "@features/users";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useGetUserDataQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    if (!user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (userData) {
      dispatch(setUser({ user: userData }));
    }
  }, [userData, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || (!user && !userData)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
