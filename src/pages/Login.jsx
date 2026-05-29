import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <main className="app-shell">
      <div className="container">
        <section className="editor-panel glass">
          <h2>Login</h2>

          <form
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <br />
            <br />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              className="add-btn"
              type="submit"
            >
              Login
            </button>
          </form>

          <br />

          <Link to="/signup">
            Create account
          </Link>
        </section>
      </div>
    </main>
  );
}