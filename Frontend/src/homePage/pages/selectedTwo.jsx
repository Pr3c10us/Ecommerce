import React from "react";

// This imports the functional component from the previous sample.
import VideoJS from "../components/videoJs";
import CustomCursorInDiv from "../components/customCursor";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PiPauseFill, PiPlayFill } from "react-icons/pi";
import Curve from "../components/curve";

const SelectedTwo = ({ product, setNavType, direction }) => {
  const playerRef = React.useRef(null);
  const [play, setPlay] = React.useState(true);
  const [wait, setWait] = React.useState(true);

  React.useEffect(() => {
    setNavType(1);
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (!wait) {
      if (play) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [play]);

  return (
    <>
      {/* <AnimatePresence>
        {wait && (
          <motion.div
            initial={{
              x: `calc(${direction == "incr" ? -100 : 100}% + 100px)`,
            }}
            animate={{
              x: "0",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              x: `calc(${direction == "incr" ? 100 : -100}%)`,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed z-10 h-screen w-screen bg-black"
          >
            <Curve />
          </motion.div>
        )}
      </AnimatePresence> */}
      
        <section className="relative flex h-full w-screen flex-col-reverse  sm:flex-row">
          <div className="flex basis-[35.5%] flex-col justify-center gap-4 pl-[5vw] pr-[3.5vw] lg:pl-[10vw] lg:pr-[7vw]">
            <div className="flex grid-cols-2 flex-col items-center justify-center gap-4">
              <div className="hidden w-[15vw] flex-col items-center text-center text-sm font-extrabold uppercase lg:flex">
                <img
                  src="/spade.svg"
                  alt="spade logo"
                  className="pointer-events-none w-[260px] "
                />
                <p>
                  An <span className="text-gray-500 ">acees</span> creation
                </p>
              </div>
              <div className="flex flex-col gap-2 px-4 font-cinzel">
                {product?.name.split(" ").map((word, index) => {
                  return (
                    <p
                      key={index + 1}
                      className={`flex w-full items-center justify-center gap-2 text-2xl font-medium uppercase text-asisDark sm:text-3xl lg:text-4xl`}
                    >
                      {word}
                    </p>
                  );
                })}
              </div>
            </div>
            {!product?.isComingSoon && (
              <div className="flex items-center justify-center sm:justify-end">
                <Link
                  to={`/product/${product?.product._id}`}
                  className="flex items-center gap-2 rounded bg-black px-4 py-1.5 text-xs text-white sm:text-sm md:px-6 md:py-2"
                >
                  View Product{" "}
                  <img src="/arrow.svg" alt="arrow" className="w-3 " />
                </Link>
              </div>
            )}
          </div>
          <div className="group relative mt-[10vh] flex basis-[64.5%] cursor-pointer overflow-hidden sm:my-[10vh] sm:mr-[5vw] sm:rounded-3xl lg:mr-[10.4vw]">
            {" "}
            {/*<VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
            <video
              className="group h-full w-full bg-asisDark object-cover sm:rounded-3xl"
              ref={playerRef}
              onClick={() => {
                setPlay((prev) => !prev);
              }}
              // src={`${import.meta.env.VITE_BLOB_URL}${product?.video}`}
              loop
              autoPlay
              placeholder={`${import.meta.env.VITE_BLOB_URL}${
                product?.images[0]
              }`}
            ></video>
            {!play && (
              <>
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 text-4xl backdrop-blur-2xl lg:text-6xl ">
                  <PiPlayFill className="" />
                </div>{" "}
                <div className="pointer-events-none absolute inset-0 z-10 bg-black bg-opacity-20 p-4 text-4xl transition-all duration-100"></div>
              </>
            )}
            {play && (
              <>
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 text-4xl opacity-0 backdrop-blur-2xl transition-all duration-100  group-hover:opacity-100 lg:text-6xl">
                  <PiPauseFill />
                </div>
                <div className="pointer-events-none absolute inset-0 z-10 bg-black bg-opacity-20 p-4 text-4xl opacity-0 transition-all duration-100  group-hover:opacity-100 lg:text-6xl"></div>
              </>
            )}
          </div>
        </section>
    </>
  );
};

export default SelectedTwo;
