"use server";
import { textBoxType } from "@/templates";
import prisma from "../../prisma/prisma";

export const saveCard = async ({
  id,
  imageBoxes,
  textBoxes,
  name,
  youtubeBoxes,
  bg,
}: {
  id: number | undefined;
  imageBoxes: textBoxType[];
  textBoxes: textBoxType[];
  youtubeBoxes: textBoxType[];
  name: string;
  bg: string;
}) => {
  const boxes = [
    ...imageBoxes.map((ib) => ({ ...ib, type: "image" })),
    ...textBoxes.map((ib) => ({ ...ib, type: "text" })),
    ...youtubeBoxes.map((ib) => ({ ...ib, type: "video" })),
  ];

  if (id) {
    await prisma.box.deleteMany({ where: { cardId: id } });
  }

  if (id) {
    return await prisma.card.update({
      where: { id },
      data: {
        name: name,
        bg,
        boxes: {
          create: boxes.map((box) => ({
            type: box.type,
            top: box.top.toString(),
            left: box.left.toString(),
            width: box.width.toString(),
            height: box.height.toString(),
            content: box.content,
            fontSize: box.fontSize,
            maxWidth: box.maxWidth,
            transform: box.transform,
          })),
        },
      },
    });
  } else {
    return await prisma.card.create({
      data: {
        name: name,
        bg: bg,
        boxes: {
          create: boxes.map((box) => ({
            type: box.type,
            top: box.top.toString(),
            left: box.left.toString(),
            width: box.width.toString(),
            height: box.height.toString(),
            content: box.content,
            fontSize: box.fontSize,
            maxWidth: box.maxWidth,
            transform: box.transform,
          })),
        },
      },
    });
  }
};
export const getCard = async (cardId: number) => {
  return await prisma.card.findFirst({
    where: { id: cardId },
    include: {
      boxes: true,
    },
  });
};
export default saveCard;
