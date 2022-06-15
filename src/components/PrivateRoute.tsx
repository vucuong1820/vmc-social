import { Navigate, Route, Outlet } from "react-router-dom";

import React, { Component, FC } from "react";
import { useStore } from "../store";

const PrivateRoute: FC<any> = ( ) => {
  const currentUser = useStore((state) => state.currentUser);

  return currentUser ? <Outlet/> : <Navigate to="/"/>
};

export default PrivateRoute;
