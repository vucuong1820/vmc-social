import { useState } from "react";
import VoiceModal from "../components/FormModal";

VoiceCall.propTypes = {};

function VoiceCall(props) {
  const [displayModal, setDisplayModal] = useState("hidden");

  return (
    <VoiceModal
      displayModal={displayModal}
      onSetDisplayModal={setDisplayModal}
    />
  );
}

export default VoiceCall;
