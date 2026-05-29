import {
  useEffect,
  useState,
  useRef,
} from "react";

import * as htmlToImage from "html-to-image";

import ProfileForm from "../components/ProfileForm";
import ProfilePreview from "../components/ProfilePreview";
import LinksEditor from "../components/LinksEditor";
import ShareButton from "../components/ShareButton";
import ThemeCustomizer from "../components/ThemeCustomizer";
import QRModal from "../components/QRModal";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultProfile = {
  username: "",
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
  const previewRef = useRef(null);

  const [profile, setProfile] =
    useLocalStorage(
      "profile",
      defaultProfile
    );

  const [links, setLinks] =
    useLocalStorage(
      "links",
      defaultLinks
    );

  const [theme, setTheme] =
    useLocalStorage(
      "theme",
      defaultTheme
    );

  const [showQR, setShowQR] =
    useState(false);

  useEffect(() => {
    if (!profile.username?.trim())
      return;

    localStorage.setItem(
      `user-${profile.username
        .trim()
        .toLowerCase()}`,
      JSON.stringify({
        profile,
        links,
        theme,
      })
    );
  }, [profile, links, theme]);

  async function exportImage() {
    if (!previewRef.current) return;

    const dataUrl =
      await htmlToImage.toPng(
        previewRef.current
      );

    const link =
      document.createElement("a");

    link.download = `${profile.username}-profile.png`;

    link.href = dataUrl;

    link.click();
  }

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
      prev.filter(
        (link) => link.id !== id
      )
    );
  }

  return (
    <>
      <main
        className="app-shell"
        style={{
          backgroundColor:
            theme.background,
        }}
      >
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>

        <div className="container">
          <section className="editor-panel glass">
            <h2>
              Link-in-Bio Builder
            </h2>

            <ProfileForm
              profile={profile}
              onChange={handleChange}
              onImageUpload={
                handleImageUpload
              }
            />

            <LinksEditor
              links={links}
              onAdd={addLink}
              onUpdate={updateLink}
              onDelete={removeLink}
              onReorder={setLinks}
            />

            <ThemeCustomizer
              theme={theme}
              onChange={
                handleThemeChange
              }
            />

            <ShareButton
              username={
                profile.username ||
                "your-profile"
              }
            />

            <button
              className="add-btn"
              onClick={() =>
                setShowQR(true)
              }
            >
              Show QR Code
            </button>

            <button
              className="add-btn"
              onClick={exportImage}
            >
              Export as Image
            </button>
          </section>

          <section className="preview-panel">
            <ProfilePreview
              ref={previewRef}
              profile={profile}
              links={links}
              theme={theme}
            />
          </section>
        </div>
      </main>

      <QRModal
        username={
          profile.username ||
          "your-profile"
        }
        isOpen={showQR}
        onClose={() =>
          setShowQR(false)
        }
      />
    </>
  );
}