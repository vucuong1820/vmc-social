import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store";
import { ChatEngine } from "react-chat-engine";
import SideBarChatbox from "../components/Chat Box/SideBarChatbox";

ChatBox.propTypes = {};

function ChatBox(props: any) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const currentUser = useStore((state) => state.currentUser);

  return (
    <>
      <div className="mt-6 flex justify-between px-[4vw] sm:hidden">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-8 w-8" src="/icon.png" alt="" />
          <span className="text-xl font-medium">FilmHot</span>
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      <div className="flex">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />

        <SideBarChatbox />

        <div className="hidden flex-grow flex-col items-center justify-center gap-3 md:!flex">

          <h1 className="text-center">
            Select a conversation to start chatting
          </h1>

        </div>

      </div>
    </>
  );
}

export default ChatBox;
