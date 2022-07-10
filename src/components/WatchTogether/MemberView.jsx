import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Navbar';
import Title from '../Title';
import { Player } from 'react-tuby';
import { subtitleProxy } from '../../shared/constants';
import HlsPlayer from 'react-hls-player';
import MetaData from '../WatchView/MetaData';
import Similar from '../WatchView/Similar';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import Spin from 'react-cssfx-loading/src/Spin';

MemberView.propTypes = {};

function MemberView({ movieDetail, roomInfo, role, roomId }) {
  const playerRef = useRef();
  const [roomData, setRoomData] = useState();
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'room-watch', roomId), (doc) => {
      setRoomData(doc.data());
    });

    return unsubscribe;
  }, [movieDetail, roomId]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.currentTime = roomData?.currentTime;
    }
  }, [roomData?.currentTime]);

  const handleTimeUpdate = (e) => {
      return; 
      console.log(e.target.currentTime)
  }

  if (!roomData) return <Spin />;
  return (
    <>
      <Title value={'Watch-together'} />
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />
          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
            {/* <div className="overlay fixed top-[75px] left-0 right-[350px    ] bottom-0"></div> */}
              <div className="w-full z-[-1]">
                <Player
                  playerRef={playerRef}
                  playerKey={'123'}
                  primaryColor="#0D90F3"
                  src={movieDetail?.sources || []}
                  subtitles={
                    movieDetail?.subtitles?.map((subtitle) => ({
                      ...subtitle,
                      url: subtitleProxy(subtitle.url),
                    })) || []
                  }
                >
                  {(ref, props) => {
                    if (ref.current) {
                      if (roomData?.paused) {
                        ref.current.pause();
                      } else {
                        ref.current.play();
                      }
                    }
                    return <HlsPlayer onSeeked={handleTimeUpdate} playerRef={ref} {...props} src={`${props.src}`} />;
                    // return (
                    //   <HlsPlayer
                    //     onSeeked={handleTimeUpdate}
                    //     onPlay={handlePlay}
                    //     onPause={handlePause}
                    //     playerRef={ref}
                    //     {...props}
                    //     src={`${props.src}`}
                    //     controls={false}
                    //   />
                    // );
                  }}
                </Player>
              </div>
              <span class="w-max block mt-8 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                {role}
              </span>

              <MetaData data={movieDetail?.data} />
            </div>
            <Similar data={movieDetail?.data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberView;
