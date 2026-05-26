import { useState } from "react";

function App() {
  const [profile, setProfile] = useState({
    name: "Ahmed",
    bio: "Frontend Developer • Building cool things on the web",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
  });

  const [links, setLinks] = useState([
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
  ]);

  function handleProfileChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
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

  return (
    <main className="app-shell">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>

      <div className="container">
        <section className="editor-panel glass">
          <h2>Customize Profile</h2>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>

            <textarea
              rows="4"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Avatar URL</label>

            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              onChange={handleProfileChange}
            />
          </div>

          <div className="links-editor">
            <div className="links-header">
              <h3>Links</h3>

              <button onClick={addLink} className="add-btn">
                + Add Link
              </button>
            </div>

            {links.map((link) => (
              <div key={link.id} className="link-editor-card">
                <input
                  type="text"
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(link.id, "title", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(link.id, "url", e.target.value)
                  }
                />

                <button
                  onClick={() => removeLink(link.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
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