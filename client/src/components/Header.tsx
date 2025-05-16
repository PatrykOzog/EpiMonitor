import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

type HeaderProps = {
  loggedIn: boolean;
};

const NavigationBar: React.FC = () => {
  return (
    <nav className="header-navigation">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/survey">Survey</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
  return (
    <header className="header">
      <h1>Epidemiology Monitor</h1>
      {loggedIn ? <NavigationBar /> : null}
    </header>
  );
};
