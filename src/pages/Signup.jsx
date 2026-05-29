import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(
        email,
        password
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        "Signup failed"
      );
    }
  }

  return (
    <main className="app-shell">
      <div className="container">
        <section className="editor-panel glass">
          <h2>Create Account</h2>

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
              Sign Up
            </button>
          </form>

          <br />

          <Link to="/login">
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
}