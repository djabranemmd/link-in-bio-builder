import { useEffect, useState } from "react";

const defaultProfile = {
  name: "Ahmed",
  bio: "Frontend Developer • Building cool things on the web",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
};

const defaultLinks = [
  {
    id: crypto.randomUUID(),
    title: "GitHub",
    url: "https://github.com",
  },
  {
    id: crypto.randomUUID(),
    title: "Portfolio",
    url: "https://example.com",
  },
];

const defaultTheme = {
  background: "#070b14",
  buttonColor: "#6d5dfc",
  radius: 18,
};

function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [links, setLinks] = useState(defaultLinks);
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("profile");
      const savedLinks = localStorage.getItem("links");
      const savedTheme = localStorage.getItem("theme");

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedLinks) setLinks(JSON.parse(savedLinks));
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);

        setTheme({
          background: parsedTheme.background || defaultTheme.background,
          buttonColor: parsedTheme.buttonColor || defaultTheme.buttonColor,
          radius: Number(parsedTheme.radius) || defaultTheme.radius,
        });
      }
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function handleProfileChange(e) {
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
      [name]: name === "radius" ? Number(value) : value,
    }));
  }

  function handleLinkChange(id, field, value) {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
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

  function removeLink(id) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  function resetAll() {
    setProfile(defaultProfile);
    setLinks(defaultLinks);
    setTheme(defaultTheme);

    localStorage.removeItem("profile");
    localStorage.removeItem("links");
    localStorage.removeItem("theme");
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
          <h2>Customize Profile</h2>

          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              rows="4"
              value={profile.bio}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Avatar URL</label>
            <input
              name="avatar"
              value={profile.avatar}
              onChange={handleProfileChange}
            />
          </div>

          <div className="links-editor">
            <div className="links-header">
              <h3>Links</h3>

              <button className="add-btn" onClick={addLink}>
                + Add Link
              </button>
            </div>

            {links.map((link) => (
              <div key={link.id} className="link-editor-card">
                <input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(link.id, "title", e.target.value)
                  }
                />

                <input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(link.id, "url", e.target.value)
                  }
                />

                <button
                  className="delete-btn"
                  onClick={() => removeLink(link.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="theme-editor">
            <h3>Theme</h3>

            <div className="form-group">
              <label>Background Color</label>
              <input
                type="color"
                name="background"
                value={theme.background}
                onChange={handleThemeChange}
              />
            </div>

            <div className="form-group">
              <label>Button Color</label>
              <input
                type="color"
                name="buttonColor"
                value={theme.buttonColor}
                onChange={handleThemeChange}
              />
            </div>

            <div className="form-group">
              <label>Border Radius ({theme.radius}px)</label>
              <input
                type="range"
                min="8"
                max="40"
                name="radius"
                value={theme.radius}
                onChange={handleThemeChange}
              />
            </div>
          </div>

          <button className="reset-btn" onClick={resetAll}>
            Reset Everything
          </button>
        </section>

        <section className="preview-panel">
          <div className="profile-card glass">
            <img src={profile.avatar} alt={profile.name} />

            <h1>{profile.name}</h1>

            <p>{profile.bio}</p>

            <div className="links-wrapper">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="link-button"
                  style={{
                    backgroundColor: theme.buttonColor,
                    borderRadius: `${theme.radius}px`,
                  }}
                >
                  {link.title || "Untitled Link"}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;