import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoCall from '../components/VoiceCall/components/VideoCall';

VoiceCall.propTypes = {
    
};

function VoiceCall(props) {
    const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <button
          onClick={() => setInCall(true)}
        >
          Join Call
        </button>
      )}
    </div>
  );
}

export default VoiceCall;