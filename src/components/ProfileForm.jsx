export default function ProfileForm({
  profile,
  onChange,
  onImageUpload,
  usernameStatus,
}) {
  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={profile.username}
        onChange={onChange}
      />

      {usernameStatus ===
        "available" && (
        <p
          style={{
            color: "#22c55e",
            fontSize: "14px",
          }}
        >
          ✓ Available
        </p>
      )}

      {usernameStatus ===
        "taken" && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "14px",
          }}
        >
          ✕ Username already
          taken
        </p>
      )}

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={onChange}
      />

      <textarea
        name="bio"
        placeholder="Bio"
        value={profile.bio}
        onChange={onChange}
      />

      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
      />
    </div>
  );
}