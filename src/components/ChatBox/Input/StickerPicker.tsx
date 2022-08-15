import { FC, Fragment, useState } from "react";

import stickersDataJson from "../../../../public/zalo-stickers/data/favourite.json";
import ClickAwayListener from "../ClickAwayListener";
import SpriteRenderer from "../SpriteRenderer";

interface StickerPickerOpened {
  setIsOpened: (value: boolean) => void;
  onSelect: (value: string) => void;
}

const getRecentStickers = () => {
  const existing = localStorage.getItem("fireverse-recent-stickers") || "[]";
  try {
    const parsed = JSON.parse(existing);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (error) {
    return [];
  }
};

const StickerPicker: FC<StickerPickerOpened> = ({ setIsOpened, onSelect }) => {
  // const { data, loading, error } = useFetch<StickerCollections>("sticker", () =>
  //   fetch(STICKERS_URL).then((res) => res.json())
  // );

  const [recentStickers, setRecentStickers] = useState(getRecentStickers());

  const addRecentSticker = (url: string) => {
    const added = [...new Set([url, ...recentStickers])];

    localStorage.setItem("fireverse-recent-stickers", JSON.stringify(added));

    setRecentStickers(added);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      {(ref) => (
        <div
          ref={ref}
          className="border-dark-lighten absolute -left-16 bottom-full h-80 w-80 rounded-lg border-2 bg-[#222222] shadow-2xl"
        >
            <div className="flex h-full w-full flex-col">
              <div className="flex-grow overflow-y-auto p-3 pt-1">
                {recentStickers.length > 0 && (
                  <>
                    <h1 className="mt-2" id="sticker-recent">
                      Recent stickers
                    </h1>
                    <div className="grid w-full grid-cols-5 justify-between">
                      {recentStickers.map((url) => (
                        <SpriteRenderer
                          size={60}
                          onClick={() => {
                            onSelect(url);
                            addRecentSticker(url);
                            setIsOpened(false);
                          }}
                          className="hover:bg-dark-lighten cursor-pointer"
                          src={url}
                          runOnHover
                        />
                      ))}
                    </div>
                  </>
                )}

                {stickersDataJson?.map((collection) => (
                  <Fragment key={collection.id}>
                    <h1 className="mt-2" id={`sticker-${collection.id}`}>
                      {collection.name}
                    </h1>
                    <div className="grid w-full grid-cols-5 justify-between">
                      {collection.stickers.map((sticker) => (
                        <SpriteRenderer
                          key={sticker.spriteURL}
                          size={60}
                          onClick={() => {
                            onSelect(sticker.spriteURL);
                            addRecentSticker(sticker.spriteURL);
                            setIsOpened(false);
                          }}
                          className="hover:bg-dark-lighten cursor-pointer"
                          src={sticker.spriteURL}
                          runOnHover
                        />
                      ))}
                    </div>
                  </Fragment>
                ))}
              </div>

              <div className="h-18 border-t-dark-lighten flex w-full flex-shrink-0 gap-2 overflow-x-auto border-t p-2">
                {recentStickers.length > 0 && (
                  <button
                    onClick={() =>
                      document
                        .querySelector(`#sticker-recent`)
                        ?.scrollIntoView()
                    }
                    className="flex h-9 w-9 items-center"
                  >
                    <i className="bx bx-time text-[26px] leading-[26px]"></i>
                  </button>
                )}
                {stickersDataJson?.map((collection) => (
                  <img
                    onClick={() =>
                      document
                        .querySelector(`#sticker-${collection.id}`)
                        ?.scrollIntoView()
                    }
                    className="h-9 w-9 cursor-pointer object-cover"
                    src={collection.icon}
                    alt=""
                  />
                ))}
              </div>
            </div>
          
        </div>
      )}
    </ClickAwayListener>
  );
};

export default StickerPicker;
