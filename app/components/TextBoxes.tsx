import { baseTextBox, textBoxType } from "@/templates";
import React, { useState } from "react";
import Moveable from "react-moveable";

type Props = {
  setTextBoxes: React.Dispatch<React.SetStateAction<textBoxType[]>>;
  textBoxes: textBoxType[];
  preview: Boolean;
};

function TextBoxes({ preview, setTextBoxes, textBoxes }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const updateTextBoxPosition = (id: number, left: number, top: number) => {
    setTextBoxes((prev) =>
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

  const updateTextBoxSize = (id: number, width: number, height: number) => {
    setTextBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, width, height, fontSize: height - 10 } : box
      )
    );
  };

  return (
    <>
      {textBoxes.map((box) => (
        <React.Fragment key={box.id}>
          <div
            id={box.id + "bid"}
            ref={(el) => {
              if (el && selectedId === box.id) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="absolute border p-1 bg-white cursor-pointer text-black"
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
              fontSize: box.fontSize,
              transform: box.transform + " transform: scale(-1, 1)",
              // maxWidth: box.maxWidth,
              minWidth: "fit-content",
              background: "transparent",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(box.id);
            }}
          >
            <span className="w-full h-full relative">
              {!preview && (
                <span
                  className="absolute top-[-50%] right-[-10%] z-[999] text-sm"
                  onClick={() => {
                    console.log("Remove");
                    setTextBoxes((prev) => {
                      const filtered = prev.filter((b) => b.id !== box.id);
                      console.log(filtered);
                      return filtered;
                    });
                  }}
                >
                  ❌
                </span>
              )}
              {box.content}
            </span>
          </div>
          {!preview && selectedId === box.id && (
            <Moveable
              target={document.getElementById(box.id + "bid")}
              draggable
              resizable
              onDrag={({ left, top }) => {
                updateTextBoxPosition(box.id, left, top);
              }}
              onResize={({ width, height }) => {
                updateTextBoxSize(box.id, width, height);
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default TextBoxes;
