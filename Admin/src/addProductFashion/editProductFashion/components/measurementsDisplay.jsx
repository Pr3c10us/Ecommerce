import React from "react";
import { TbClothesRack } from "react-icons/tb";
const MeasurementsDisplay = ({ setMeasurements, measurements }) => {
  const removeSize = (name) => {
    setMeasurements(measurements.filter((item) => item.name !== name));
  };
  return (
    <section className="flex w-full flex-wrap justify-center gap-5 font-medium md:justify-start">
      {measurements.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <p className="flex min-w-[100px] items-center justify-center gap-2 rounded border border-asisDark/50 px-3 py-2 text-center text-xs capitalize">
            <TbClothesRack className="inline-block h-4 w-4 " />
            <span className="font-semibold">{item.name}</span>({item.unit})
          </p>
          <button
            type="button"
            onClick={() => removeSize(item.name)}
            className="flex min-w-[100px] items-center justify-center gap-2 rounded bg-red-500 px-3 py-2 text-center text-[0.65rem] capitalize text-white"
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default MeasurementsDisplay;
