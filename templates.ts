export type textBoxType = {
  id: number;
  top: number | string;
  left: number | string;
  width: number | string;
  height: number | string;
  content: string;
  fontSize: number;
  maxWidth: string;
  transform: string;
  type: "text" | "image" | "video";
};

export const baseTextBox = {
  id: Date.now(),
  top: "50%",
  left: "50%",
  width: "fit-content",
  maxWidth: "fit-content",
  fontSize: 40,
  transform: "translate(-50%, -50%)",
  height: 50,
  content: "Edit me",
} as textBoxType;
