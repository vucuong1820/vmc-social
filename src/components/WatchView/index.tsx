import { FC, useEffect } from 'react';
import { subtitleProxy } from '../../shared/constants';

import HlsPlayer from 'react-hls-player';
import { Player } from 'react-tuby';
import { DetailType } from '../../shared/types';
import NavBar from '../NavBar';
import Skeleton from '../Skeleton';
import Title from '../Title';
import Comment from './Comment';
import MetaData from './MetaData';
import Similar from './Similar';

interface WatchViewProps {
  data?: DetailType;
  sources:
    | {
        quality: number;
        url: string;
      }[]
    | undefined;
  subtitles?:
    | {
        language: string;
        url: string;
        lang: string;
      }[]
    | undefined;
  episodeIndex?: number;
}

const WatchView: FC<WatchViewProps> = ({ data, sources, subtitles, episodeIndex }) => {
  const mediaType = typeof episodeIndex === 'undefined' ? 'movie' : 'tv';
  const playerKey = `${mediaType}-${data?.id}${episodeIndex ? `-${episodeIndex}` : ''}`;

  useEffect(() => {
    if (!data) return;
    let existing = JSON.parse(localStorage.getItem('vmcsocial-recent') || '[]') as {
      id: string;
      category: number;
      coverVerticalUrl: string;
      name: string;
    }[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data.id);

    existing.unshift({
      id: data.id,
      category: data.category,
      coverVerticalUrl: data.coverVerticalUrl,
      name: data.name,
    });

    localStorage.setItem('vmcsocial-recent', JSON.stringify(existing));
  }, [data]);
  return (
    <>
      {data && (
        <Title
          value={`Watch ${data.name}${
            typeof episodeIndex !== 'undefined' ? ` - Episode ${episodeIndex + 1}` : ''
          } - VMCSocial`}
        />
      )}
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />

          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div key={episodeIndex} className="w-full">
                {data && sources && subtitles ? (
                  <Player
                    playerKey={playerKey}
                    primaryColor="#0D90F3"
                    src={sources}
                    subtitles={
                      subtitles?.map((subtitle) => ({
                        ...subtitle,
                        url: subtitleProxy(subtitle.url),
                      })) || []
                    }
                  >
                    {(ref, props) => {
                      return <HlsPlayer playerRef={ref} {...props} src={`${props.src}`} />;
                    }}
                  </Player>
                ) : (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <Skeleton className="absolute top-0 left-0 w-full h-full" />
                  </div>
                )}
              </div>

              <MetaData data={data} episodeIndex={episodeIndex} />

              {data && <Comment data={data} episodeIndex={episodeIndex} />}
            </div>

            <Similar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchView;
