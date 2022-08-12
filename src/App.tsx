import AgoraRTC from "agora-rtc-sdk-ng";
import { Picker } from "emoji-mart";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import EmojiPicker from "./components/ChatBox/Input/EmojiPicker";
import ChatPopup from "./components/ChatPopup/ChatPopup";
import VoiceModal from "./components/FormModal";
import Toast from "./components/Toast";
import { client } from "./components/VoiceCall/settings";
import { auth, db } from "./shared/firebase";
import { useStore } from "./store";
import "emoji-mart/css/emoji-mart.css";

const App: FC = () => {
  const [localAudioTrack, setLocalAudioTrack] = useState<any>();
  const {
    displayVoiceModal,
    setDisplayVoiceModal,
    currentUser,
    setCurrentUser,
    voiceDetails,
  } = useStore((state) => state);
  const [isJoinVoice, setIsJoinVoice] = useState<any>(false);
  const [toast, setToast] = useState({
    isShow: false,
    error: false,
    message: "",
    duration: 3000,
  });
  const location = useLocation();

  // useEffect(() => {
  //   const appId = "3d3864b7b2b0419bacd5081751ce6a9e";
  //   const appCertificate = "0757ed5c6c1b43a284b4b2bd7cd3a8d1";
  //   const expirationTimeInSeconds = 3600;
  //   const uid = Math.floor(Math.random() * 100000);
  //   const role = RtcRole.SUBSCRIBER;
  //   const channel = "main";
  //   const currentTimestamp = Math.floor(Date.now() / 1000);
  //   const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  //   const token = RtcTokenBuilder.buildTokenWithUid(
  //     appId,
  //     appCertificate,
  //     channel,
  //     uid,
  //     role,
  //     expirationTimestamp
  //   );
  //   console.log(token);
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          ...user,
          displayName: user?.displayName || user?.phoneNumber,
          photoURL:
            user?.photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user?.displayName || user?.phoneNumber,
          photoURL:
            user?.photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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

  useEffect(() => {
    (async () => {
      client.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
          const remoteAudioTrack: any = user.audioTrack;
          remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        client.on("user-unpublished", async (user) => {
          // Unsubscribe from the tracks of the remote user.
          await client.unsubscribe(user);
        });
      });
    })();
  }, []);
  const handleLeave = async () => {
    try {
      if (localAudioTrack) {
        localAudioTrack.close();
        await client.leave();
        setIsJoinVoice(false);
      }
      setToast((prev) => ({
        ...prev,
        error: false,
        isShow: true,
        message: "Leave room chat sucessfully!",
      }));
    } catch (error) {
      console.log("failed to leave room:", { error });
      setToast((prev) => ({
        ...prev,
        error: true,
        isShow: true,
        message: "Failed to leave room chat !!",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formObject: any = Object.fromEntries(data.entries());
    try {
      await client.join(
        formObject["app-id"],
        formObject["channel-name"],
        formObject.token,
        null
      );
      const track: any = await AgoraRTC.createMicrophoneAudioTrack();
      setLocalAudioTrack(track);
      await client.publish([track]);
      setIsJoinVoice(true);
      console.log("publish success");
      setDisplayVoiceModal("hidden");
      setToast((prev) => ({
        ...prev,
        isShow: true,
        error: false,
        message: "Join room chat successfully!",
      }));
    } catch (error: any) {
      console.log("error join:", { error });
      setIsJoinVoice(false);
      setToast((prev) => ({
        ...prev,
        isShow: true,
        message: "Failed to join room chat. Please try again!",
        error: true,
      }));
    }
  };

  return (
    <>
      <AppRoutes />
      {currentUser?.uid && <ChatPopup currentUserId={currentUser?.uid} />}
      {isJoinVoice && (
        <span
          onClick={handleLeave}
          className="cursor-pointer hover:opacity-50 fixed bottom-12 left-7 z-10 flex h-14 w-14"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="justify-center relative inline-flex rounded-full h-14 w-14 bg-slate-700">
            <i className="flex items-center justify-center fas fa-phone w-[24px] text-xl"></i>
          </span>
        </span>
      )}
      <VoiceModal
        voiceDetails={voiceDetails}
        handleSubmit={handleSubmit}
        displayModal={displayVoiceModal}
        onSetDisplayModal={(display) => setDisplayVoiceModal(display)}
      />
      {toast.isShow && (
        <Toast
          duration={toast.duration}
          error={toast.error}
          message={toast.message}
          onSetIsShow={(res) => setToast((prev) => ({ ...prev, isShow: res }))}
        />
      )}
    </>
  );
};

export default App;
