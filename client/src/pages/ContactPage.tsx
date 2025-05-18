import React from "react";
import "./HomePage.css";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import "./ContactPage.css";

export const ContactPage: React.FC = () => {
  const { loggedIn } = useAuth();
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <h4 className="text">Contact us</h4>
        <p className="text">
          If you have any questions or need assistance, feel free to reach out
          to us.
        </p>
        <div className="contact-info">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@epimonitor.com">support@epimonitor.com</a>
          </p>
          <p>
            <strong>Phone:</strong> +48 123 456 789
          </p>
          <p>
            <strong>Address:</strong> ul. Zdrowia 10, 80-100 Gdańsk, Poland
          </p>
        </div>
      </main>
    </>
  );
};
