export default function ProfilePreview({
  profile,
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
    </div>
  );
}