export default function ProfileForm({
  profile,
  onChange,
  onImageUpload,
}) {
  return (
    <div className="profile-form">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={profile.username || ""}
        onChange={onChange}
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name || ""}
        onChange={onChange}
      />

      <textarea
        name="bio"
        placeholder="Bio"
        value={profile.bio || ""}
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