import { useEffect, useState } from "react";

const defaultProfile = {
  username: "ahmed",
  name: "Ahmed",
  bio: "Frontend Developer • Building cool things on the web",
  avatar: "",
};

const defaultLinks = [
  {
    id: crypto.randomUUID(),
    title: "GitHub",
    url: "https://github.com",
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
    const saved = localStorage.getItem("link-bio-data");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setProfile({
        ...parsed.profile,
        avatar: "",
      });

      setLinks(parsed.links || defaultLinks);
      setTheme(parsed.theme || defaultTheme);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const dataToSave = {
        profile: {
          ...profile,
          avatar: "",
        },
        links,
        theme,
      };

      localStorage.setItem(
        "link-bio-data",
        JSON.stringify(dataToSave)
      );
    } catch (error) {
      console.error(error);
    }
  }, [profile, links, theme]);

  function handleProfileChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2MB");
      return;
    }

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

  function shareProfile() {
    const url = `${window.location.origin}/${profile.username}`;

    navigator.clipboard.writeText(url);

    alert("Profile link copied to clipboard");
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
            <label>Username</label>

            <input
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
            />
          </div>

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
            <label>Profile Image</label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageUpload}
            />
          </div>

          <div className="links-editor">
            <div className="links-header">
              <h3>Links</h3>

              <button
                className="add-btn"
                onClick={addLink}
              >
                + Add Link
              </button>
            </div>

            {links.map((link) => (
              <div
                key={link.id}
                className="link-editor-card"
              >
                <input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    updateLink(
                      link.id,
                      "title",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    updateLink(
                      link.id,
                      "url",
                      e.target.value
                    )
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

          <button
            className="reset-btn"
            onClick={shareProfile}
          >
            Share Profile
          </button>
        </section>

        <section className="preview-panel">
          <div className="profile-card glass">
            <img
              src={
                profile.avatar ||
                "https://via.placeholder.com/150"
              }
              alt={profile.name}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/150";
              }}
            />

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