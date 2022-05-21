import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseApp = initializeApp(
  JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)
);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

enableIndexedDbPersistence(db, { forceOwnership: false });
