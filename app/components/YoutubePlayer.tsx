import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import Moveable from "react-moveable";
import { textBoxType } from "@/templates";

const YouTubePlayer = ({
  setYoutubeBoxes,
  youtubeBoxes,
  preview,
}: {
  setYoutubeBoxes: React.Dispatch<React.SetStateAction<textBoxType[]>>;
  youtubeBoxes: textBoxType[];
  preview: Boolean;
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const updateYoutubeBoxPosition = (id: number, left: number, top: number) => {
    setYoutubeBoxes((prev) =>
      prev.map((box) =>
        box.id === id
          ? {
              ...box,
              left: `${(left / window.innerWidth) * 100}%`,
              top: `${(top / window.innerHeight) * 100}%`,
            }
          : box
      )
    );
  };

  const aspectRatio = 16 / 9;
  const updateYoutubeBoxSize = (id: number, width: number) => {
    setYoutubeBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, width, height: width / aspectRatio } : box
      )
    );
  };

  const onReady = (event: any) => {
    const player = event.target;
    player.playVideo();
  };

  const onError = (error: any) => {
    console.error("YouTube Player Error:", error);
  };

  return (
    <>
      {youtubeBoxes.map((youtubeBox) => (
        <React.Fragment key={youtubeBox.id}>
          <div
            id={youtubeBox.id + "yt"}
            ref={(el) => {
              if (el && selectedId === youtubeBox.id) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            style={{
              position: "absolute",
              top: youtubeBox.top,
              left: youtubeBox.left,
              width: youtubeBox.width,
              height: youtubeBox.height,
              transform: youtubeBox.transform,
            }}
            onClick={() => setSelectedId(youtubeBox.id)}
          >
            <YouTube
              videoId={youtubeBox.content}
              onReady={onReady}
              onError={onError}
              opts={{
                width: youtubeBox.width,
                height: youtubeBox.height,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "move",
                background: "transparent",
                zIndex: 10,
              }}
            />
            {!preview && (
              <span
                className="absolute top-[0%] right-[0%] z-[999] text-sm cursor-pointer"
                onClick={() => {
                  console.log("Remove");
                  setYoutubeBoxes((prev) => {
                    const filtered = prev.filter((b) => b.id !== youtubeBox.id);
                    return filtered;
                  });
                }}
              >
                ❌
              </span>
            )}
          </div>
          {!preview && selectedId === youtubeBox.id && (
            <Moveable
              target={document.getElementById(youtubeBox.id + "yt")}
              draggable
              resizable
              keepRatio
              onDrag={({ left, top }) => {
                updateYoutubeBoxPosition(youtubeBox.id, left, top);
              }}
              onResize={({ width }) => {
                updateYoutubeBoxSize(youtubeBox.id, width);
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default YouTubePlayer;
