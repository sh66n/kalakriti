"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Home = () => {
  const [position, setPosition] = useState(80);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const moveCarousel = (buttonRef) => {
    if (buttonRef.current.id == "next") {
      setPosition((prevPosition) => prevPosition - 30);
    } else {
      setPosition((prevPosition) => prevPosition + 30);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full pt-26 relative flex overflow-x-hidden">
      <div className="absolute top-50 left-8 text-white text-3xl w-[22rem] z-0">
        A showcase of the web's finest design + talent
      </div>
      <div className="w-full z-10 flex items-center flex-grow relative  ">
        <div
          className={`absolute flex gap-4 w-fit `}
          style={{
            right: `-${position}rem`, // Dynamic inline style for the right position
            transition: "right 0.5s ease-in-out", // Smooth transition for the right property
          }}
        >
          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/5.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/2.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/3.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 flex gap-4 p-2 rounded-lg">
        <button
          className=" bottom-2 right-12 text-white z-100"
          onClick={() => moveCarousel(prevButtonRef)}
          ref={prevButtonRef}
          id="prev"
        >
          prev
        </button>
        <button
          className=" bottom-2 right-2 text-white z-100"
          onClick={() => moveCarousel(nextButtonRef)}
          ref={nextButtonRef}
          id="next"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Home;
