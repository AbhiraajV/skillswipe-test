import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import { baseTextBox, textBoxType } from "@/templates";
const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const UploadButtonMain = ({
  setUploadFile,
}: {
  setUploadFile: React.Dispatch<React.SetStateAction<textBoxType[]>>;
}) => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
        setUploadFile((prev) => [
          ...prev,
          {
            ...baseTextBox,
            content: res[0].url,
            width: 100,
            id: Date.now(),
          },
        ]);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};
