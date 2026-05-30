import {
  useEffect,
  useState,
  useRef,
} from "react";

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

import {
  db,
  storage,
} from "../lib/firebase";

import { useAuth } from "../context/AuthContext";

import UserBar from "../components/UserBar";
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
  const { user } = useAuth();

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
    async function loadUserData() {
      if (!user) return;

      const snap =
        await getDoc(
          doc(
            db,
            "users",
            user.uid
          )
        );

      if (snap.exists()) {
        const data = snap.data();

        if (data.profile)
          setProfile(
            data.profile
          );

        if (data.links)
          setLinks(
            data.links
          );

        if (data.theme)
          setTheme(
            data.theme
          );
      }
    }

    loadUserData();
  }, [user]);

  useEffect(() => {
    async function saveData() {
      if (!user) return;

      await setDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          profile,
          links,
          theme,
        }
      );
    }

    saveData();
  }, [
    user,
    profile,
    links,
    theme,
  ]);

  async function handleImageUpload(
    e
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      if (!user) {
        const previewUrl =
          URL.createObjectURL(
            file
          );

        setProfile(
          (prev) => ({
            ...prev,
            avatar:
              previewUrl,
          })
        );

        return;
      }

      const storageRef = ref(
        storage,
        `avatars/${user.uid}`
      );

      await uploadBytes(
        storageRef,
        file
      );

      const downloadURL =
        await getDownloadURL(
          storageRef
        );

      setProfile(
        (prev) => ({
          ...prev,
          avatar:
            downloadURL,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function exportImage() {
    if (!previewRef.current)
      return;

    const dataUrl =
      await htmlToImage.toPng(
        previewRef.current
      );

    const link =
      document.createElement("a");

    link.download =
      `${profile.username}-profile.png`;

    link.href = dataUrl;

    link.click();
  }

  function exportJson() {
    const data = {
      profile,
      links,
      theme,
    };

    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type:
          "application/json",
      }
    );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${profile.username}.json`;

    link.click();
  }

  function importJson(e) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (
      event
    ) => {
      const data =
        JSON.parse(
          event.target.result
        );

      setProfile(
        data.profile ||
          defaultProfile
      );

      setLinks(
        data.links ||
          defaultLinks
      );

      setTheme(
        data.theme ||
          defaultTheme
      );
    };

    reader.readAsText(file);
  }

  function handleChange(e) {
    const { name, value } =
      e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleThemeChange(
    e
  ) {
    const { name, value } =
      e.target;

    setTheme((prev) => ({
      ...prev,
      [name]:
        name === "radius"
          ? Number(value)
          : value,
    }));
  }

  function handlePresetSelect(
    preset
  ) {
    setTheme(preset);
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
            <UserBar />

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
              onPresetSelect={
                handlePresetSelect
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

            <button
              className="add-btn"
              onClick={exportJson}
            >
              Export JSON
            </button>

            <label className="add-btn">
              Import JSON
              <input
                hidden
                type="file"
                accept=".json"
                onChange={importJson}
              />
            </label>
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