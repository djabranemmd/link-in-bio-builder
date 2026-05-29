import { useParams } from "react-router-dom";
import ProfilePreview from "../components/ProfilePreview";

export default function PublicProfile() {
  const { username } = useParams();

  const saved = localStorage.getItem(
    `user-${username.toLowerCase()}`
  );

  if (!saved) {
    return (
      <main className="app-shell">
        <div className="container">
          <div className="profile-card glass">
            <h1>User not found</h1>

            <p>
              This profile does not exist
            </p>
          </div>
        </div>
      </main>
    );
  }

  const data = JSON.parse(saved);

  return (
    <main
      className="app-shell"
      style={{
        backgroundColor:
          data.theme?.background ||
          "#070b14",
      }}
    >
      <div className="aurora aurora-1"></div>

      <div className="aurora aurora-2"></div>

      <div className="container">
        <section className="preview-panel">
          <ProfilePreview
            profile={data.profile}
            links={data.links}
            theme={data.theme}
          />
        </section>
      </div>
    </main>
  );
}