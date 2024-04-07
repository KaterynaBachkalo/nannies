import React from "react";
import Home from "../../components/Home/Home";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const currentUser = useSelector(selectUser);

  return <>{!currentUser ? <Home /> : <Navigate to="/nannies" />}</>;
};

export default HomePage;
