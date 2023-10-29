import React from "react";

const Measurements = ({ measurements, setMeasurements }) => {
  return (
    <>
      {measurements.map((measurement, index) => {
        return (
          <section className="flex gap-2 capitalize ">
            <label htmlFor="name" className="flex font-semibold">
              {measurement?.name}
            </label>
            <div className="relative">
              <input
                type="number"
                id="unitValue"
                name="unitValue"
                value={measurement?.value || 0}
                className="w-36 rounded border border-asisDark bg-transparent pl-2 pr-12"
                onChange={(e) => {
                  let temp = [...measurements];
                  temp[index].value = Number(e.target.value);
                  setMeasurements(temp);
                }}
              />
              <span className="text-xs font-light absolute right-2 bottom-1">{measurement?.unit}</span>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Measurements;
