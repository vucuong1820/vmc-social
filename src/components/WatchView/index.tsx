import { FC, useEffect } from "react";
import { PROXY, subtitleProxy } from "../../shared/constants";

import Comment from "./Comment";
import { DetailType } from "../../shared/types";
import HlsPlayer from "react-hls-player";
import MetaData from "./MetaData";
import NavBar from "../NavBar";
import { Player } from "react-tuby";
import Similar from "./Similar";
import Skeleton from "../Skeleton";
import Title from "../Title";
import { Link } from "react-router-dom";

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

const WatchView: FC<WatchViewProps> = ({
  data,
  sources,
  subtitles,
  episodeIndex,
}) => {
  console.log(sources)
  console.log(subtitles)
  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";
  const playerKey = `${mediaType}-${data?.id}${
    episodeIndex ? `-${episodeIndex}` : ""
  }`;

  useEffect(() => {
    if (!data) return;
    let existing = JSON.parse(
      localStorage.getItem("filmhot-recent") || "[]"
    ) as {
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

    localStorage.setItem("filmhot-recent", JSON.stringify(existing));
  }, [data]);
  return (
    <>
      {data && (
        <Title
          value={`Watch ${data.name}${
            typeof episodeIndex !== "undefined"
              ? ` - Episode ${episodeIndex + 1}`
              : ""
          } - FilmHot`}
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
                      return (
                        <HlsPlayer
                          playerRef={ref}
                          {...props}
                          src={`${props.src}`}
                        />
                      )
                    }}
                  </Player>
                ) : (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <Skeleton className="absolute top-0 left-0 w-full h-full" />
                  </div>
                )}
              </div>
              
              <Link
              to={`/watch-together/${data?.id}`}
              className={`mt-4 flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-people-arrows w-[24px] text-xl text-center"></i>
              <p className="block sm:hidden xl:block">Watch together</p>
            </Link>
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
