import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserBar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) return null;

  return (
    <div
      className="glass"
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        padding: "16px 20px",
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <span>
        Signed in as {user.email}
      </span>

      <button
        className="add-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}