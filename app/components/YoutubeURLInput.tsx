import { baseTextBox, textBoxType } from "@/templates";
import React, { useState } from "react";

type Props = {
  setTextBoxes: React.Dispatch<React.SetStateAction<textBoxType[]>>;
};

function YoutubeURLInput({ setTextBoxes }: Props) {
  const [url, setUrl] = useState("");
  const addTextBox = () => {
    const newTextBox = baseTextBox;
    setTextBoxes((prev) => [
      ...prev,
      { ...newTextBox, content: url, id: Date.now(), width: 640, height: 360 },
    ]);
    setUrl("");
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded-l text-black w-[150px] h-[35px]"
        placeholder="youtube video id..."
      />
      <button
        onClick={addTextBox}
        className="p-2 bg-blue-500 text-white rounded-r h-[35px]"
      >
        Add
      </button>
    </div>
  );
}

export default YoutubeURLInput;
