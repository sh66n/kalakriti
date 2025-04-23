"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Home = () => {
  const [position, setPosition] = useState(30);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const moveCarousel = (buttonRef) => {
    if (buttonRef.current.id == "next") {
      setPosition((prevPosition) => prevPosition - 50);
    } else {
      setPosition((prevPosition) => prevPosition + 50);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full pt-26 relative flex overflow-x-hidden">
      <div className="absolute top-50 left-8 text-white text-3xl w-[22rem] z-0">
        A showcase of the web's finest design + talent
      </div>
      <div className="w-full z-10 flex items-center flex-grow relative">
        <div
          className={`absolute flex gap-4 w-fit -right-1300`}
          style={{
            left: `${position}rem`,
            transition: "left 0.5s ease-in-out",
          }}
        >
          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/12.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/14.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/6.png"}
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

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/7.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/8.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/11.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/13.png"}
              width={160 * 4.5}
              height={90 * 4.5}
              alt="1"
            ></Image>
          </div>

          <div className="p-4 bg-white inline-block">
            <Image
              src={"/images/10.png"}
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
