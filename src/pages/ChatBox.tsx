import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

import BarWave from "react-cssfx-loading/src/BarWave";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "../components/PrivateRoute";
import { useStore } from "../store";
import { auth, db } from "../shared/firebase";
import Home from "./ChatBox/Home";
import Chat from "./ChatBox/Chat";
import SideBar from "../components/ChatBox/Home/Sidebar";

const ChatBox: FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || user.providerData?.[0]?.phoneNumber,
        });
      } else setCurrentUser(null);
    });
  }, []);

  if (typeof currentUser === "undefined")
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarWave />
      </div>
    );

  return (
    <div className="flex">
      <SideBar />

      <div className="hidden flex-grow flex-col items-center justify-center gap-3 md:!flex">
        <h1 className="text-center">Select a conversation to start chatting</h1>
      </div>
    </div>
    // <Routes>
    //   <Route
    //     index
    //     element={
    //       <PrivateRoute>
    //         <Home />
    //       </PrivateRoute>
    //     }
    //   />
    //   <Route
    //     path=":id"
    //     element={
    //       <PrivateRoute>
    //         <Chat />
    //       </PrivateRoute>
    //     }
    //   />
    // </Routes>
  );
};

export default ChatBox;
