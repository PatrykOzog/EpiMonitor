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
        <Button text="Register" type="submit" />
        <Button text="Close" type="button" onClick={onClose} />
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
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Internal error.");
        return;
      }

      onLogin();
      onClose();
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
        <Button text="Log in" type="submit" />
        <Button text="Close" type="button" onClick={onClose} />
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
      <Button text="Log in" onClick={() => setShowLoginModal(true)} />
      <Button text="Register" onClick={() => setShowRegisterModal(true)} />

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
