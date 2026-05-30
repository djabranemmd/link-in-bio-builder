import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    "AIzaSyAI_D76LCE_iiDrsGdp0_QaSmaw9pRlw48",

  authDomain:
    "link-in-bio-builder-396d9.firebaseapp.com",

  projectId:
    "link-in-bio-builder-396d9",

  storageBucket:
    "link-in-bio-builder-396d9.firebasestorage.app",

  messagingSenderId:
    "476768268101",

  appId:
    "1:476768268101:web:eaae6d126a89af7ccf182c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);