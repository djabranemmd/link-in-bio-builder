import { useParams } from "react-router-dom";

export default function PublicProfile() {
  const { username } = useParams();

  return (
    <main className="app-shell">
      <div className="container">
        <section className="preview-panel">
          <div className="profile-card glass">
            <h1>@{username}</h1>

            <p>
              Public profile page
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}