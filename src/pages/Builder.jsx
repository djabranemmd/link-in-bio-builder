import { useEffect, useState } from "react";

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

  const [profile, setProfile] =
    useState(defaultProfile);

  const [links, setLinks] =
    useState(defaultLinks);

  const [theme, setTheme] =
    useState(defaultTheme);

  const [usernameStatus, setUsernameStatus] =
    useState("");

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

      if (!snap.exists()) return;

      const data = snap.data();

      if (data.profile)
        setProfile(data.profile);

      if (data.links)
        setLinks(data.links);

      if (data.theme)
        setTheme(data.theme);
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

      const usersRef =
        collection(
          db,
          "users"
        );

      const q = query(
        usersRef,
        where(
          "profile.username",
          "==",
          username
        )
      );

      const snapshot =
        await getDocs(q);

      if (snapshot.empty) {
        setUsernameStatus(
          "available"
        );
        return;
      }

      const existsForSameUser =
        snapshot.docs.some(
          (doc) =>
            doc.id === user.uid
        );

      setUsernameStatus(
        existsForSameUser
          ? "available"
          : "taken"
      );
    }

    if (user)
      checkUsername();
  }, [
    profile.username,
    user,
  ]);

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
    profile,
    links,
    theme,
    user,
  ]);

  async function handleImageUpload(
    e
  ) {
    const file =
      e.target.files?.[0];

    if (!file || !user)
      return;

    const storageRef = ref(
      storage,
      `avatars/${user.uid}`
    );

    await uploadBytes(
      storageRef,
      file
    );

    const url =
      await getDownloadURL(
        storageRef
      );

    setProfile((prev) => ({
      ...prev,
      avatar: url,
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

  return (
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
            setLinks={setLinks}
          />

          <ThemeCustomizer
            theme={theme}
            setTheme={setTheme}
          />

          <ShareButton
            username={
              profile.username
            }
          />
        </section>

        <section className="preview-panel">
          <ProfilePreview
            profile={profile}
            links={links}
            theme={theme}
          />
        </section>
      </div>
    </main>
  );
}