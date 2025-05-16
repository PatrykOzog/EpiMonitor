import React from "react";
import "./HomePage.css";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { LoginPage } from "./LoginPage";

const HomePageContent: React.FC = () => {
  return (
    <>
      <h2>Monitor, report and analyse disease cases in your region.</h2>
      <div className="features-container">
        <div className="feature-card">
          <h3>Fill Out a Survey</h3>
          <p>Report symptoms quickly and help identify outbreak trends.</p>
        </div>
        <div className="feature-card">
          <h3>View Statistics</h3>
          <p>Track the current situation in your region with dynamic charts.</p>
        </div>
        <div className="feature-card">
          <h3>Contact us</h3>
          <p>Compare your area to others and get local health updates.</p>
        </div>
      </div>
    </>
  );
};

export const HomePage: React.FC = () => {
  const { loggedIn, setLoggedIn } = useAuth();
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="homepage-container">
        {loggedIn ? (
          <HomePageContent />
        ) : (
          <LoginPage onLogin={() => setLoggedIn(true)} />
        )}
      </main>
    </>
  );
};
