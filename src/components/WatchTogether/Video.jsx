import React from 'react';
import PropTypes from 'prop-types';
import HlsPlayer from 'react-hls-player';

 Video.propTypes = {
    
};

function  Video({ref, props}) {
    return <HlsPlayer playerRef={ref} {...props} src={`${props.src}`} />;
}

export default  Video;