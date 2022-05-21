import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Category from "./pages/Category";
import Discovery from "./pages/Discovery";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import TV from "./pages/TV";
import { auth, db } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { useStore } from "./store";
import ChatBox from "./pages/ChatBox";
import { doc, setDoc } from "firebase/firestore";
import Chat from "./pages/ChatBox/Chat";

const App: FC = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const location = useLocation();

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
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<Movie />} />
      <Route path="tv/:id" element={<TV />} />
      <Route path="search" element={<Search />} />
      <Route path="explore" element={<Explore />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="history" element={<History />} />
      <Route path="category/:id" element={<Category />} />
      <Route path="discovery" element={<Discovery />} />
      <Route path="chat-box" element={<ChatBox />} />
      <Route path="chat-box/:id" element={<Chat />} />
    </Routes>
  );
};

export default App;
