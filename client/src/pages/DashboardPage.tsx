import React from "react";
import "./HomePage.css";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";

export const DashboardPage: React.FC = () => {
  const { loggedIn } = useAuth();
  return (
    <>
      <Header loggedIn={loggedIn} />
    </>
  );
};
