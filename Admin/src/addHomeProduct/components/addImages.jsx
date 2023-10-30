import React, { useState } from "react";
import { BsCloudPlusFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
const AddImages = ({ fileList, setFileLIst }) => {
  const [image, setImage] = useState();
  const [error, setError] = useState("");
  const [hoverEffect, setHoverEffect] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let image = e.target.files[0];
      if (
        !image.name.endsWith(".png") &&
        !image.name.endsWith(".jpg") &&
        !image.name.endsWith(".gif") &&
        !image.name.endsWith(".raw") &&
        !image.name.endsWith(".jpeg") &&
        !image.name.endsWith(".svg") &&
        !image.name.endsWith(".webp") &&
        !image.name.endsWith(".bmp") &&
        !image.name.endsWith(".tiff")
      ) {
        return setError("File not Supported.");
      }
      if (fileList.filter((file) => file.name === image.name).length > 0) {
        return setError(
          "File already present, try to change the name of the file and reupload.",
        );
      }
      setError("");
      setImage(image);

      //   setFileLIst([...fileList, image]);
    }
    e.target.value = "";
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    setHoverEffect(false);
    if (e.dataTransfer.files[0]) {
      let image = e.dataTransfer.files[0];
      if (
        !image.name.endsWith(".png") &&
        !image.name.endsWith(".jpg") &&
        !image.name.endsWith(".gif") &&
        !image.name.endsWith(".raw") &&
        !image.name.endsWith(".jpeg") &&
        !image.name.endsWith(".svg") &&
        !image.name.endsWith(".webp") &&
        !image.name.endsWith(".bmp") &&
        !image.name.endsWith(".tiff")
      ) {
        return setError("File not Supported");
      }
      if (fileList.filter((file) => file.name === image.name).length > 0) {
        return setError("File already present");
      }
      setError("");
      setImage(image);
      //   setFileLIst([...fileList, image]);
    }
  };
  const handleOver = (e) => {
    e.preventDefault();
    setHoverEffect(true);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-y-4">
      {error && <h2 className=" italic text-red-500">{error}</h2>}
      <label
        onDragOver={handleOver}
        onDragLeave={(e) => {
          e.preventDefault();
          setHoverEffect(false);
        }}
        onDrop={handleFileDrop}
        className={`flex min-h-[40rem] w-full cursor-pointer appearance-none justify-center rounded border-2 border-asisDark transition-all duration-200 focus:outline-none ${
          hoverEffect ? "border-gray-400" : ""
        }`}
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="product"
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="flex flex-col items-center justify-center space-x-2 text-center">
            <BsCloudPlusFill className="h-12 w-12" />
            <span className="font-medium capitalize text-gray-600">
              Drop a picture, or Click in this area to select.
            </span>
          </span>
        )}
        <input
          type="file"
          name="fileUpload"
          className="hidden"
          title=" "
          onChange={handleFileUpload}
        />
      </label>
      <button
        onClick={() => {
          if (image) {
            setFileLIst([...fileList, image]);
            setImage(null);
          }
        }}
        type="button"
        className="rounded border border-asisDark/50 px-4 py-2 text-sm text-asisDark"
      >
        + Add Image
      </button>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {fileList.map((file, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                src={URL.createObjectURL(file)}
                alt="product"
                className="h-32 w-32 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setFileLIst(
                    fileList.filter((item) => item.name !== file.name),
                  );
                }}
                className="flex w-full items-center justify-center gap-1 rounded border border-asisDark/50 py-1 text-sm"
              >
                <FaTrash className="text-red-500" /> Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddImages;
