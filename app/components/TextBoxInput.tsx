import { baseTextBox, textBoxType } from "@/templates";
import React, { useState } from "react";

type Props = {
  setTextBoxes: React.Dispatch<React.SetStateAction<textBoxType[]>>;
};

function TextBoxInput({ setTextBoxes }: Props) {
  const [newContent, setNewContent] = useState<string>("");

  const addTextBox = () => {
    const newTextBox = baseTextBox;
    setTextBoxes((prev) => [
      ...prev,
      { ...newTextBox, content: newContent, id: Date.now() },
    ]);
    setNewContent("");
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="p-2 border border-gray-300 rounded-l text-black w-[150px] h-[35px]"
        placeholder="type..."
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

export default TextBoxInput;
