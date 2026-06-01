import { useEffect, useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

import UserBar from "../components/UserBar";
import ProfileForm from "../components/ProfileForm";
import ProfilePreview from "../components/ProfilePreview";
import LinksEditor from "../components/LinksEditor";
import ShareButton from "../components/ShareButton";
import ThemeCustomizer from "../components/ThemeCustomizer";
import QRModal from "../components/QRModal";

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
  const { user } = useAuth();
  const previewRef = useRef(null);

  const [showQR, setShowQR] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] =
    useState(defaultProfile);

  const [links, setLinks] =
    useState(defaultLinks);

  const [theme, setTheme] =
    useState(defaultTheme);

  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      const snap = await getDoc(
        doc(db, "users", user.uid)
      );

      if (!snap.exists()) return;

      const data = snap.data();

      setProfile(
        data.profile || defaultProfile
      );

      setLinks(
        data.links || defaultLinks
      );

      setTheme(
        data.theme || defaultTheme
      );
    }

    loadUserData();
  }, [user]);

 async function saveChanges() {
  if (!user) return;

  setIsSaving(true);

  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        profile,
        links,
        theme,
      },
      { merge: true }
    );

    console.log(
      "Firestore save success"
    );
  } catch (error) {
    console.error(
      "Firestore save error:",
      error
    );
  } finally {
    setIsSaving(false);
  }
}

  function handleChange(e) {
    const { name, value } =
      e.target;

    setProfile((prev) => ({
      ...prev,
      [name]:
        name === "username"
          ? value
              .toLowerCase()
              .replace(
                /[^a-z0-9._]/g,
                ""
              )
          : value,
    }));
  }

async function handleImageUpload(e) {
  const file =
    e.target.files?.[0];

  if (!file || !user) return;

  try {
    const storageRef = ref(
      storage,
      `avatars/${user.uid}/${file.name}`
    );

    await uploadBytes(
      storageRef,
      file
    );

    const url =
      await getDownloadURL(
        storageRef
      );

    console.log(
      "Avatar uploaded:",
      url
    );

    setProfile((prev) => ({
      ...prev,
      avatar: url,
    }));
  } catch (error) {
    console.error(
      "Avatar upload error:",
      error
    );
  }
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

  function updateLink(
    id,
    field,
    value
  ) {
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
        (link) =>
          link.id !== id
      )
    );
  }

  async function exportPNG() {
    if (!previewRef.current) return;

    const dataUrl =
      await htmlToImage.toPng(
        previewRef.current
      );

    const a =
      document.createElement("a");

    a.href = dataUrl;
    a.download = "profile.png";
    a.click();
  }

  function exportJSON() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            profile,
            links,
            theme,
          },
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const a =
      document.createElement("a");

    a.href =
      URL.createObjectURL(blob);

    a.download =
      "profile-data.json";

    a.click();
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
        <div className="container">
          <section className="editor-panel glass">
            <UserBar />

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
              setTheme={setTheme}
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <button
                className="add-btn"
                onClick={
                  saveChanges
                }
              >
                {isSaving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                className="add-btn"
                onClick={
                  exportPNG
                }
              >
                Export PNG
              </button>

              <button
                className="add-btn"
                onClick={() =>
                  setShowQR(true)
                }
              >
                QR Code
              </button>

              <button
                className="add-btn"
                onClick={
                  exportJSON
                }
              >
                Export JSON
              </button>

              <ShareButton
                username={
                  profile.username
                }
              />
            </div>
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
        username={profile.username}
        isOpen={showQR}
        onClose={() =>
          setShowQR(false)
        }
      />
    </>
  );
}