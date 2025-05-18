import { useState } from "react";
import { Button } from "../components/Button";
import "./LoginPage.css";

const RegisterModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords must match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Internal error.");
        return;
      }

      onClose();
    } catch (err) {
      setError("Internal error");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleRegister} className="modal-content">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? "input-error" : ""}
        />
        <input
          type="password"
          placeholder="Repeat password"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className={error ? "input-error" : ""}
        />
        <div style={{ minHeight: "2rem" }}>
          {error && <div className="error-popup">{error}</div>}
        </div>
        <div className="buttons">
          <Button text="Register" type="submit" />
          <Button text="Close" type="button" onClick={onClose} />
        </div>
      </form>
    </div>
  );
};

const LoginModal: React.FC<{
  onClose: () => void;
  onLogin: () => void;
}> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLogin();
        onClose();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Internal error");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleLogin} className="modal-content">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={error ? "input-error" : ""}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? "input-error" : ""}
        />
        <div style={{ minHeight: "2rem" }}>
          {error && <div className="error-popup">{error}</div>}
        </div>
        <div className="buttons">
          <Button text="Log in" type="submit" />
          <Button text="Close" type="button" onClick={onClose} />
        </div>
      </form>
    </div>
  );
};

export const LoginPage: React.FC<{
  onLogin: () => void;
}> = ({ onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="login-content">
      <h4 className="text">Welcome to Epidemiology Monitor</h4>
      <p className="text">
        Track and monitor epidemiological data with ease. Log in or create an
        account to continue.
      </p>
      <div className="buttons">
        <Button text="Log in" onClick={() => setShowLoginModal(true)} />
        <Button text="Register" onClick={() => setShowRegisterModal(true)} />
      </div>
      <div className="buttons">
        <Button
          text="Log in as guest"
          onClick={async () => {
            try {
              const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ guest: true }),
              });

              const data = await response.json();
              if (response.ok) {
                localStorage.setItem("token", data.token);
                onLogin();
              } else {
                alert(data.error || "Login failed");
              }
            } catch (err) {}
          }}
        />
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={() => onLogin()}
        />
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
};
