import React from 'react'

const Marquee = () => {
  return (
    <div class="relative flex w-full overflow-x-hidden border-y border-y-asisDark ">
      <div class="flex animate-marquee whitespace-nowrap py-1">
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      </div>

      <div class="absolute top-0 flex animate-marquee2 whitespace-nowrap py-1 ">
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span class=" mx-2 flex items-center gap-x-2 text-base font-semibold ">
          BREAKING NEWS{" "}
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      </div>
    </div>
  );
}

export default Marquee