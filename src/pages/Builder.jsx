import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfilePreview from "../components/ProfilePreview";
import LinksEditor from "../components/LinksEditor";

const defaultProfile = {
  username: "",
  name: "",
  bio: "",
  avatar: "",
};

export default function Builder() {
  const [profile, setProfile] =
    useState(defaultProfile);

  const [links, setLinks] = useState([
    {
      id: crypto.randomUUID(),
      title: "",
      url: "",
    },
  ]);

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

  function addLink() {
    setLinks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        url: "",
      },
    ]);
  }

  function updateLink(id, field, value) {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              [field]: value,
            }
          : link
      )
    );
  }

  function removeLink(id) {
    setLinks((prev) =>
      prev.filter((link) => link.id !== id)
    );
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

          <LinksEditor
            links={links}
            onAdd={addLink}
            onUpdate={updateLink}
            onDelete={removeLink}
          />
        </section>

        <section className="preview-panel">
          <ProfilePreview
            profile={profile}
            links={links}
          />
        </section>
      </div>
    </main>
  );
}