import React, { useState } from "react";
import { BsCloudPlusFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
const AddVideos = ({ fileList, setFileLIst }) => {
  const [video, setVideo] = useState();
  const [error, setError] = useState("");
  const [hoverEffect, setHoverEffect] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let video = e.target.files[0];
      if (
        !video.name.endsWith(".mp4") &&
        !video.name.endsWith(".mov") &&
        !video.name.endsWith(".wmv") &&
        !video.name.endsWith(".flv") &&
        !video.name.endsWith(".avi") &&
        !video.name.endsWith(".avchd") &&
        !video.name.endsWith(".webm") &&
        !video.name.endsWith(".mkv") &&
        !video.name.endsWith(".m4v") &&
        !video.name.endsWith(".gif")
      ) {
        return setError("File not Supported.");
      }
      if (fileList.filter((file) => file.name === video.name).length > 0) {
        return setError(
          "File already present, try to change the name of the file and reupload.",
        );
      }
      setError("");
      setVideo(video);

      //   setFileLIst([...fileList, video]);
    }
    e.target.value = "";
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    setHoverEffect(false);
    if (e.dataTransfer.files[0]) {
      let video = e.dataTransfer.files[0];
      if (
        !video.name.endsWith(".mp4") &&
        !video.name.endsWith(".mov") &&
        !video.name.endsWith(".wmv") &&
        !video.name.endsWith(".flv") &&
        !video.name.endsWith(".avi") &&
        !video.name.endsWith(".avchd") &&
        !video.name.endsWith(".webm") &&
        !video.name.endsWith(".mkv") &&
        !video.name.endsWith(".m4v") &&
        !video.name.endsWith(".gif")
      ) {
        return setError("File not Supported");
      }
      if (fileList.filter((file) => file.name === video.name).length > 0) {
        return setError("File already present");
      }
      setError("");
      setVideo(video);
      //   setFileLIst([...fileList, video]);
    }
  };
  const handleOver = (e) => {
    e.preventDefault();
    setHoverEffect(true);
  };

  return (
    <div className="flex w-full flex-col gap-y-4">
      {error && <h2 className=" italic text-red-500">{error}</h2>}
      <label
        onDragOver={handleOver}
        onDragLeave={(e) => {
          e.preventDefault();
          setHoverEffect(false);
        }}
        onDrop={handleFileDrop}
        className={`flex h-[40rem] w-full cursor-pointer appearance-none justify-center rounded border-2 border-asisDark transition-all duration-200 focus:outline-none ${
          hoverEffect ? "border-gray-400" : ""
        }`}
      >
        {video ? (
          <video autoPlay loop muted
            src={URL.createObjectURL(video)}
            alt="product"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex flex-col items-center justify-center space-x-2 text-center">
            <BsCloudPlusFill className="h-12 w-12" />
            <span className="font-medium capitalize text-gray-600">
              Drop a video, or Click in this area to select.
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
          if (video) {
            if (fileList.length >= 1) {
              return setError("Only one video is allowed.");
            }
            setFileLIst([...fileList, video]);
            setVideo(null);
          }
        }}
        type="button"
        className="rounded border border-asisDark/50 px-4 py-2 text-sm text-asisDark"
      >
        + Add Video
      </button>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {fileList.map((file, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <video
                autoPlay
                loop
                muted
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

export default AddVideos;
