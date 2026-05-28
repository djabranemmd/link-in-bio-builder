import { useParams } from "react-router-dom";
import ProfilePreview from "../components/ProfilePreview";

export default function PublicPage() {
  const { username } = useParams();

  const savedUser = localStorage.getItem(
    `user-${username.toLowerCase()}`
  );

  if (!savedUser) {
    return (
      <main className="app-shell">
        <div className="container">
          <section className="preview-panel">
            <div className="profile-card glass">
              <h1>User not found</h1>

              <p>
                This profile does not exist.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const data = JSON.parse(savedUser);

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
            links={data.links || []}
            theme={data.theme}
          />
        </section>
      </div>
    </main>
  );
}