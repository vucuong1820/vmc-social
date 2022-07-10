import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import NavBar from '../Navbar';
import { Player } from 'react-tuby';
import HlsPlayer from 'react-hls-player';
import MetaData from '../WatchView/MetaData';
import Similar from '../WatchView/Similar';
import { subtitleProxy } from '../../shared/constants';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';

HostView.propTypes = {};

function HostView({ movieDetail, roomInfo, role, roomId }) {
    const handlePause = async (e) => {
        const watchRef = doc(db, 'room-watch', roomId);
        await updateDoc(watchRef, {
          paused: true,
        });
        console.log('updated pause!!!');
      };
    
      const handlePlay = async (e) => {
        const watchRef = doc(db, 'room-watch', roomId);
        await updateDoc(watchRef, {
          paused: false,
        });
        console.log('updated play!!!');
      };
    
      const handleTimeUpdate = async (e) => {
        const watchRef = doc(db, 'room-watch', roomId);
        await updateDoc(watchRef, {
          currentTime: e.target.currentTime,
        });
        console.log('updated time!!!');
      };
  return (
    <>
      <Title value={'Watch-together'} />
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />
          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full">
                <Player
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

export default HostView;
