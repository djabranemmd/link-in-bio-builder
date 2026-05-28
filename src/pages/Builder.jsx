import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfilePreview from "../components/ProfilePreview";

const defaultProfile = {
  username: "",
  name: "",
  bio: "",
  avatar: "",
};

export default function Builder() {
  const [profile, setProfile] =
    useState(defaultProfile);

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));
  }

  return (
    <main className="app-shell">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>

      <div className="container">
        <section className="editor-panel glass">
          <h2>Link-in-Bio Builder</h2>

          <ProfileForm
            profile={profile}
            onChange={handleChange}
            onImageUpload={handleImageUpload}
          />
        </section>

        <section className="preview-panel">
          <ProfilePreview
            profile={profile}
          />
        </section>
      </div>
    </main>
  );
}