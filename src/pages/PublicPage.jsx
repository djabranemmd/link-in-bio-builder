import { useParams } from "react-router-dom";

export default function PublicPage() {
  const { username } = useParams();

  const data = JSON.parse(localStorage.getItem(username));

  if (!data) {
    return <h2>User not found</h2>;
  }

  const { profile, links } = data;

  function getIcon(url) {
    if (url.includes("github")) return "🐙";
    if (url.includes("instagram")) return "📸";
    if (url.includes("linkedin")) return "💼";
    return "🔗";
  }

  return (
    <div className="preview-panel">
      <div className="profile-card glass">
        <img
          src={profile.avatar || "https://via.placeholder.com/100"}
        />

        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>

        {links.map((l) => (
          <a key={l.id} href={l.url}>
            {getIcon(l.url)} {l.title}
          </a>
        ))}
      </div>
    </div>
  );
}