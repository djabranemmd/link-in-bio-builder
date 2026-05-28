import { useState, useEffect } from "react";

const defaultProfile = {
  username: "ahmed",
  name: "Ahmed",
  bio: "Frontend Developer",
  avatar: "",
};

export default function Builder() {
  const [profile, setProfile] = useState(defaultProfile);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    localStorage.setItem(profile.username, JSON.stringify({ profile, links }));
  }, [profile, links]);

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function addLink() {
    setLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", url: "" },
    ]);
  }

  return (
    <div className="container">
      <div className="editor-panel glass">
        <h2>Builder</h2>

        <input
          placeholder="username"
          value={profile.username}
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
        />

        <input
          placeholder="name"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <textarea
          placeholder="bio"
          value={profile.bio}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <button onClick={addLink}>Add Link</button>

        {links.map((l) => (
          <div key={l.id}>
            <input
              placeholder="title"
              onChange={(e) =>
                setLinks((prev) =>
                  prev.map((x) =>
                    x.id === l.id ? { ...x, title: e.target.value } : x
                  )
                )
              }
            />

            <input
              placeholder="url"
              onChange={(e) =>
                setLinks((prev) =>
                  prev.map((x) =>
                    x.id === l.id ? { ...x, url: e.target.value } : x
                  )
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}