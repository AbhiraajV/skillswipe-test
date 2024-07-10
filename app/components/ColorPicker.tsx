import React, { useEffect, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

type Props = {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
};

function ColorPicker({ color, setColor }: Props) {
  const [toggleBg, setToggleBg] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as any)
      ) {
        setToggleBg(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);
  return (
    <div className=" flex justify-center flex-col">
      <span
        className="text-md bg-black w-[240px] text-white font-bold border-2 px-2 py-1 rounded-sm cursor-pointer"
        style={{
          opacity: toggleBg ? 1 : "0.2",
        }}
        onClick={() => setToggleBg(!toggleBg)}
      >
        Change Background Color
      </span>
      {toggleBg && (
        <div ref={pickerRef}>
          <HexAlphaColorPicker
            style={{ width: "240px" }}
            color={color}
            onChange={setColor}
          />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
