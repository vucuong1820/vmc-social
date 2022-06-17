import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoCall from '../components/VoiceCall/components/VideoCall';
import FormModal from '../components/FormModal';

VoiceCall.propTypes = {
    
};

function VoiceCall(props) {
    const [displayModal, setDisplayModal] = useState("hidden");

  return (
    <FormModal displayModal={displayModal} onSetDisplayModal={setDisplayModal} />
  );
}

export default VoiceCall;