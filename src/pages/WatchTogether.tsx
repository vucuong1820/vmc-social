import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import HlsPlayer from 'react-hls-player';
import { subtitleProxy } from '../shared/constants';
import { Player } from 'react-tuby';
import ChatBox from './ChatBox';
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../shared/firebase';
import useFirestore from '../hooks/useFirestore';
import Video from '../components/WatchTogether/Video.jsx';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../services/movie';
import useSWR from 'swr';
import Error from '../components/Error';
WatchTogether.propTypes = {};

function WatchTogether(props) {
  const { id } = useParams();
  const { data, error } = useSWR(`movie-${id}`, () => getMovieDetail(id as string));

  const ref = useRef();
  const [documents, isLoading] = useFirestore('room-watch', null);
  const playerRef = useRef<any>();
  const handleChangeTime = () => {
    const dataRef = doc(collection(db, 'room-watch'));
    setDoc(dataRef, {
      movie: 'SpiderMan',
      currentTime: '1p24s',
      paused: true,
      roomId: '123',
      users: ['123', '456'],
      createdAt: serverTimestamp(),
    });
  };
  const handleUpdate = async (updatedObj) => {
    const watchRef = doc(db, 'room-watch', 'rIRB7I7lJSAgCOaUYDOf');
    await updateDoc(watchRef, {
      ...updatedObj,
    });
    console.log('updated!!!');
  };
  const handlePause = async (e) => {
    const watchRef = doc(db, 'room-watch', 'rIRB7I7lJSAgCOaUYDOf');
    await updateDoc(watchRef, {
      paused: true,
    });
    console.log('updated pause!!!');
  };

  const handlePlay = async (e) => {
    const watchRef = doc(db, 'room-watch', 'rIRB7I7lJSAgCOaUYDOf');
    await updateDoc(watchRef, {
      paused: false,
    });
    console.log('updated play!!!');
  };

  const handleTimeUpdate = async (e) => {
    const watchRef = doc(db, 'room-watch', 'rIRB7I7lJSAgCOaUYDOf');
    await updateDoc(watchRef, {
      currentTime: e.target.currentTime,
    });
    console.log('updated time!!!');
  };
  if (error) return <Error />;
  console.log('here:', data, error);
  return (
    <div>
      <Player
        playerKey={'123'}
        primaryColor="#0D90F3"
        src={data?.sources || []}
        subtitles={
          data?.subtitles?.map((subtitle) => ({
            ...subtitle,
            url: subtitleProxy(subtitle.url),
          })) || []
        }
      >
        {(ref, props) => {
          return (
            <HlsPlayer
              onSeeked={handleTimeUpdate}
              onPlay={handlePlay}
              onPause={handlePause}
              playerRef={ref}
              {...props}
              src={`${props.src}`}
              controls={false}
            />
          );
        }}
      </Player>
      <button onClick={handleChangeTime}>setTime</button>
      <button onClick={handleUpdate}>set Update</button>
      <ChatBox />
    </div>
  );
}

export default WatchTogether;
