import getLinkIcon from "../utils/getLinkIcon";

export default function ProfilePreview({
  profile,
  links,
}) {
  return (
    <div className="profile-card glass">
      <img
        src={
          profile.avatar ||
          "https://via.placeholder.com/150"
        }
        alt={profile.name}
      />

      <h1>{profile.name || "Your Name"}</h1>

      <p>
        {profile.bio ||
          "Your bio will appear here"}
      </p>

      <div className="links-wrapper">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url || "#"}
            className="link-button"
            target="_blank"
            rel="noreferrer"
          >
            {getLinkIcon(link.url)}{" "}
            {link.title || "Untitled Link"}
          </a>
        ))}
      </div>
    </div>
  );
}