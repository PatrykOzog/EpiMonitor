import React from "react";
import "./HomePage.css";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { LoginPage } from "./LoginPage";
import surveyImage from "../assets/survey.png";
import dashboardImage from "../assets/dashboard.png";
import contactImage from "../assets/contact.png";

const HomePageContent: React.FC = () => {
  return (
    <>
      <h4>Monitor, report and analyse disease cases in your region.</h4>
      <div className="features-container">
        <div className="feature-card">
          <h5>Fill Out a Survey</h5>
          <p>
            Share your current symptoms anonymously to support early detection
            and response efforts.
          </p>
          <img
            className="feature-card-image"
            src={surveyImage}
            alt="Survey illustration"
            style={{ width: "50%", borderRadius: "8px" }}
          />
        </div>
        <div className="feature-card">
          <h5>View Statistics</h5>
          <p>
            Explore up-to-date data on reported symptoms and trends in your area
            and nationwide.
          </p>
          <img
            className="feature-card-image"
            src={dashboardImage}
            alt="Dashboard illustration"
            style={{ width: "50%", borderRadius: "8px" }}
          />
        </div>
        <div className="feature-card">
          <h5>Contact Us</h5>
          <p>
            Reach out to our team for questions, feedback, or to connect with
            local health resources.
          </p>
          <img
            className="feature-card-image"
            src={contactImage}
            alt="Contact illustration"
            style={{ width: "50%", borderRadius: "8px" }}
          />
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
      <main>
        {loggedIn ? (
          <HomePageContent />
        ) : (
          <LoginPage onLogin={() => setLoggedIn(true)} />
        )}
      </main>
    </>
  );
};
