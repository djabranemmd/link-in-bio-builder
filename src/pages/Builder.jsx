import { useEffect } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfilePreview from "../components/ProfilePreview";
import LinksEditor from "../components/LinksEditor";
import ShareButton from "../components/ShareButton";
import ThemeCustomizer from "../components/ThemeCustomizer";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultProfile = {
  username: "ahmed",
  name: "",
  bio: "",
  avatar: "",
};

const defaultLinks = [
  {
    id: crypto.randomUUID(),
    title: "",
    url: "",
  },
];

const defaultTheme = {
  background: "#070b14",
  buttonColor: "#6d5dfc",
  radius: 18,
};

export default function Builder() {
  const [profile, setProfile] = useLocalStorage(
    "profile",
    defaultProfile
  );

  const [links, setLinks] = useLocalStorage(
    "links",
    defaultLinks
  );

  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultTheme
  );

  useEffect(() => {
    if (!profile.username?.trim()) return;

    const userData = {
      profile,
      links,
      theme,
    };

    localStorage.setItem(
      `user-${profile.username.trim().toLowerCase()}`,
      JSON.stringify(userData)
    );
  }, [profile, links, theme]);

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleThemeChange(e) {
    const { name, value } = e.target;

    setTheme((prev) => ({
      ...prev,
      [name]:
        name === "radius"
          ? Number(value)
          : value,
    }));
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

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
          ? { ...link, [field]: value }
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
    <main
      className="app-shell"
      style={{
        backgroundColor: theme.background,
      }}
    >
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

          <ThemeCustomizer
            theme={theme}
            onChange={handleThemeChange}
          />

          <ShareButton
            username={
              profile.username || "your-profile"
            }
          />
        </section>

        <section className="preview-panel">
          <ProfilePreview
            profile={profile}
            links={links}
            theme={theme}
          />
        </section>
      </div>
    </main>
  );
}