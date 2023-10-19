import React from "react";

// This imports the functional component from the previous sample.
import VideoJS from "../components/videoJs";
import CustomCursorInDiv from "../components/customCursor";
import { motion } from "framer-motion";

const SelectedTwo = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: "muted",
    loop: true,
    controls: false,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "../../../public/vid1.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <section className="relative flex h-full w-full overflow-hidden px-[14vw]">
      <div className="fixed left-1/2 h-[200%] w-screen -translate-x-1/2 -translate-y-1/3">
        <div
          className={`fixed inset-y-0 left-1/2 w-[12vw] -translate-x-1/2 -rotate-[30deg]  bg-asisGreen`}
          flow={100}
        />
      </div>
      <motion.img
        src="/eclipse.svg"
        alt="eclipse"
        className="fixed -bottom-44 -right-1/3 w-[70vw] object-center lg:-right-32"
      />
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </section>
  );
};

export default SelectedTwo;
