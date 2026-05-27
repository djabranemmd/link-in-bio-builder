import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

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

function SortableLinkEditor({
  link,
  handleLinkChange,
  removeLink,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="link-editor-card"
    >
      <div
        {...attributes}
        {...listeners}
        className="drag-handle"
      >
        ⋮⋮
      </div>

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
  );
}

function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [links, setLinks] = useState(defaultLinks);
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedLinks = localStorage.getItem("links");
    const savedTheme = localStorage.getItem("theme");

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedLinks) setLinks(JSON.parse(savedLinks));
    if (savedTheme) setTheme(JSON.parse(savedTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("links", JSON.stringify(links));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [profile, links, theme]);

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
        link.id === id
          ? { ...link, [field]: value }
          : link
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
    setLinks((prev) =>
      prev.filter((link) => link.id !== id)
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setLinks((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      );

      return arrayMove(items, oldIndex, newIndex);
    });
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
              rows="4"
              name="bio"
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

              <button
                className="add-btn"
                onClick={addLink}
              >
                + Add Link
              </button>
            </div>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={links}
                strategy={verticalListSortingStrategy}
              >
                {links.map((link) => (
                  <SortableLinkEditor
                    key={link.id}
                    link={link}
                    handleLinkChange={handleLinkChange}
                    removeLink={removeLink}
                  />
                ))}
              </SortableContext>
            </DndContext>
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
                  className="link-button"
                  target="_blank"
                  rel="noreferrer"
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