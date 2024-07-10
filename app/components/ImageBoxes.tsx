import { textBoxType } from "@/templates";
import Image from "next/image";
import React, { useState } from "react";
import Moveable from "react-moveable";

type Props = {
  setImageBoxes: React.Dispatch<React.SetStateAction<textBoxType[]>>;
  imageBoxes: textBoxType[];
  preview: Boolean;
};

function ImageBoxes({ setImageBoxes, imageBoxes, preview }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const updateImageBoxPosition = (id: number, left: number, top: number) => {
    setImageBoxes((prev) =>
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

  const updateImageBoxSize = (id: number, width: number, height: number) => {
    setImageBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, width, height } : box))
    );
  };

  return (
    <>
      {imageBoxes.map((box) => (
        <React.Fragment key={box.id}>
          <div
            id={box.id + "image-id"}
            className="absolute border cursor-pointer text-black"
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
              fontSize: "0.8rem",
              transform: box.transform + " transform: scale(-1, 1)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(box.id);
            }}
          >
            <Image
              src={box.content}
              alt="image"
              layout="intrinsic"
              width={box.width as number}
              height={box.height as number}
              onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                const maxWidth = 600;
                const maxHeight = 400;
                const aspectRatio = naturalWidth / naturalHeight;

                let newWidth = naturalWidth;
                let newHeight = naturalHeight;

                if (naturalWidth > maxWidth) {
                  newWidth = maxWidth;
                  newHeight = maxWidth / aspectRatio;
                }

                if (newHeight > maxHeight) {
                  newHeight = maxHeight;
                  newWidth = maxHeight * aspectRatio;
                }

                setImageBoxes((prev) =>
                  prev.map((b) =>
                    b.id === box.id
                      ? {
                          ...b,
                          width: newWidth,
                          height: newHeight,
                        }
                      : b
                  )
                );
              }}
              unoptimized={true}
            />
            {!preview && (
              <span
                className="absolute top-[0%] right-[0%] z-[999] text-sm cursor-pointer"
                onClick={() => {
                  console.log("Remove");
                  setImageBoxes((prev) => {
                    const filtered = prev.filter((b) => b.id !== box.id);
                    return filtered;
                  });
                }}
              >
                ❌
              </span>
            )}
          </div>
          {!preview && selectedId === box.id && (
            <Moveable
              target={document.getElementById(box.id + "image-id")}
              draggable
              resizable
              keepRatio
              onDrag={({ left, top }) => {
                updateImageBoxPosition(box.id, left, top);
              }}
              onResize={({ width, height }) => {
                updateImageBoxSize(box.id, width, height);
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default ImageBoxes;
