import { useState } from "react";

function App() {
  const [profile, setProfile] = useState({
    name: "Ahmed",
    bio: "Frontend Developer • Building cool things on the web",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
  });

  const links = ["GitHub", "LinkedIn", "Portfolio", "Contact Me"];

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <main className="app-shell">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>

      <div className="container">
        <section className="editor-panel glass">
          <h2>Customize Profile</h2>
          <p>Build your personal page in real time.</p>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>

            <textarea
              name="bio"
              rows="4"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Avatar URL</label>

            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="preview-panel">
          <div className="profile-card glass">
            <img src={profile.avatar} alt={profile.name} />

            <h1>{profile.name}</h1>

            <p>{profile.bio}</p>

            <div className="links-wrapper">
              {links.map((link) => (
                <button key={link} className="link-button">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;