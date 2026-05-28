export default function ProfileForm({
  profile,
  onChange,
  onImageUpload,
}) {
  return (
    <>
      <div className="form-group">
        <label>Username</label>

        <input
          name="username"
          placeholder="ahmed"
          value={profile.username}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Name</label>

        <input
          name="name"
          placeholder="Ahmed"
          value={profile.name}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Bio</label>

        <textarea
          name="bio"
          rows="4"
          placeholder="Frontend Developer..."
          value={profile.bio}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Profile Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
        />
      </div>
    </>
  );
}