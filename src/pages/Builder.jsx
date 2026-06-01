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
  collection,
  query,
  where,
  getDocs,
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

  const [usernameStatus, setUsernameStatus] =
    useState("");

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

      const snap = await getDoc(
        doc(
          db,
          "users",
          user.uid
        )
      );

      if (snap.exists()) {
        const data = snap.data();

        if (data.profile)
          setProfile(data.profile);

        if (data.links)
          setLinks(data.links);

        if (data.theme)
          setTheme(data.theme);
      }
    }

    loadUserData();
  }, [user]);

  useEffect(() => {
    async function checkUsername() {
      if (
        !profile.username?.trim()
      ) {
        setUsernameStatus("");
        return;
      }

      const username =
        profile.username
          .trim()
          .toLowerCase();

      const q = query(
        collection(
          db,
          "users"
        ),
        where(
          "profile.username",
          "==",
          username
        )
      );

      const result =
        await getDocs(q);

      if (result.empty) {
        setUsernameStatus(
          "available"
        );
        return;
      }

      const sameUser =
        result.docs.some(
          (doc) =>
            doc.id === user?.uid
        );

      setUsernameStatus(
        sameUser
          ? "available"
          : "taken"
      );
    }

    checkUsername();
  }, [
    profile.username,
    user,
  ]);

  useEffect(() => {
    async function saveData() {
      if (!user) return;

      if (
        usernameStatus ===
        "taken"
      )
        return;

      await setDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          profile: {
            ...profile,
            username:
              profile.username
                .trim()
                .toLowerCase(),
          },
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
    usernameStatus,
  ]);

  async function handleImageUpload(
    e
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

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

    setProfile((prev) => ({
      ...prev,
      avatar: downloadURL,
    }));
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
        <div className="container">
          <section className="editor-panel glass">
            <UserBar />

            <ProfileForm
              profile={profile}
              onChange={handleChange}
              onImageUpload={
                handleImageUpload
              }
              usernameStatus={
                usernameStatus
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
                profile.username
              }
            />
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
          profile.username
        }
        isOpen={showQR}
        onClose={() =>
          setShowQR(false)
        }
      />
    </>
  );
}