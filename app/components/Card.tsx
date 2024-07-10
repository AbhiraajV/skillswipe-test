"use client";
import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { textBoxType } from "@/templates";
import TextBoxInput from "./TextBoxInput";
import TextBoxes from "./TextBoxes";
import { UploadButtonMain } from "./uploadthing";
import ImageBoxes from "./ImageBoxes";
import YouTubePlayer from "./YoutubePlayer";
import YoutubeURLInput from "./YoutubeURLInput";
import saveCard, { getCard } from "../action/card.action";
import Link from "next/link";

type Props = {
  cardId: string | undefined;
};

function Card({ cardId }: Props) {
  const [color, setColor] = useState("#fff");
  const [loadingSave, setLoadingSave] = useState(false);
  const [name, setName] = useState("New Name" + Date.now());
  const [textBoxes, setTextBoxes] = useState<textBoxType[]>([]);
  const [youtubeBoxes, setYoutubeBoxes] = useState<textBoxType[]>([]);
  const [uploadedFile, setUploadedFile] = useState<textBoxType[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    const getCardBoxes = async () => {
      if (!cardId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const card = await getCard(parseInt(cardId));
      setLoading(false);

      if (!card) return;

      setName(card.name);
      setColor(card.bg ? card.bg : "#fff");
      setTextBoxes(
        card.boxes.filter((box) => box.type === "text") as textBoxType[]
      );
      setUploadedFile(
        card.boxes
          .filter((box) => box.type === "image")
          .map((b) => ({
            ...b,
            height: parseFloat(b.height!),
            width: parseFloat(b.width!),
          })) as textBoxType[]
      );
      setYoutubeBoxes(
        card.boxes.filter((box) => box.type === "video") as textBoxType[]
      );
      setLoading(false);
    };
    getCardBoxes();
  }, [cardId]);
  if (loading)
    return (
      <div className=" text-black absolute overflow-hidden flex flex-col justify-center items-center top-[5vh] left-0 md:left-0 w-[100vw] h-[90vh] bg-white">
        Loading
      </div>
    );
  return (
    <div className="absolute overflow-hidden flex flex-col justify-center items-center top-[5vh] left-0 md:left-0 w-[100vw] h-[90vh] bg-white">
      <div
        id="edit-zone"
        className="relative w-full h-full"
        style={{ background: color }}
      >
        {!preview && (
          <div className="flex flex-wrap items-start justify-start gap-4 absolute top-0 left-0 z-[9999]">
            <button
              className="text-sm font-bold py-2 px-3 bg-blue-500 text-white"
              onClick={() => setPreview(!preview)}
            >
              Toggle Preview{" "}
            </button>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="text-black h-[35px]"
            />
            <ColorPicker color={color} setColor={setColor} />
            <TextBoxInput setTextBoxes={setTextBoxes} />
            <UploadButtonMain setUploadFile={setUploadedFile} />
            <YoutubeURLInput setTextBoxes={setYoutubeBoxes} />
            <button
              className="text-sm font-bold py-2 px-3 bg-blue-500 text-white"
              onClick={async () => {
                setLoadingSave(true);
                const savedCards = await saveCard({
                  id: cardId ? parseInt(cardId) : undefined,
                  imageBoxes: uploadedFile,
                  name: name,
                  textBoxes: textBoxes,
                  youtubeBoxes: youtubeBoxes,
                  bg: color,
                });
                setLoadingSave(false);
                console.log({ savedCards });
              }}
            >
              {loadingSave ? "Saving..." : "Save"}
            </button>
            <Link href={"/"}>
              <button className="text-sm font-bold py-2 px-3 bg-blue-500 text-white">
                Home
              </button>
            </Link>
          </div>
        )}
        {preview && (
          <button
            className="text-sm font-bold py-2 px-3 bg-blue-500 text-white"
            onClick={() => setPreview(!preview)}
          >
            Toggle Preview{" "}
          </button>
        )}
        <TextBoxes
          preview={preview}
          setTextBoxes={setTextBoxes}
          textBoxes={textBoxes}
        />
        <ImageBoxes
          preview={preview}
          imageBoxes={uploadedFile}
          setImageBoxes={setUploadedFile}
        />
        <YouTubePlayer
          preview={preview}
          setYoutubeBoxes={setYoutubeBoxes}
          youtubeBoxes={youtubeBoxes}
        />
      </div>
    </div>
  );
}

export default Card;
