import React from 'react'
import {GiSpades} from "react-icons/gi"

const Marquee = () => {
  return (
    <div class="relative flex w-full overflow-x-hidden border-y border-y-asisDark ">
      <div class="flex animate-marquee whitespace-nowrap py-1">
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
      </div>

      <div class="absolute top-0 flex animate-marquee2 whitespace-nowrap py-1 ">
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
        <span class=" mx-2 flex items-center gap-x-0 text-base font-semibold ">
          BREAKING FASHION NEWS@{" "}
          <GiSpades className="h-5 w-5"/>
        </span>
      </div>
    </div>
  );
}

export default Marquee