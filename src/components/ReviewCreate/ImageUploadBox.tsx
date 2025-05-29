import React from "react";
import defaultIcon from "../../assets/icon-upload.png";

interface ImageUploadBoxProps {
  currentFile: File | null;
  onImageUpload: (file: File | null) => void;
  iconSrc?: string;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  currentFile,
  onImageUpload,
  iconSrc = defaultIcon,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageUpload(file);
  };

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {" "}
      <label className="text-base font-semibold text-gray-800 mb-2">
        강의 사진 등록하기
      </label>
      <label
        htmlFor="imageUpload"
        className="w-48 h-48 border-2 border-dashed border-green-400 rounded-xl flex items-center justify-center cursor-pointer"
      >
        <img src={iconSrc} alt="upload icon" className="w-10 h-10" />
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {currentFile && (
        <p className="text-sm text-gray-600 mt-2">파일명: {currentFile.name}</p>
      )}
    </div>
  );
};

export default ImageUploadBox;
