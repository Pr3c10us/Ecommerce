import React from "react";
import { IoAddOutline } from "react-icons/io5";

const Measurements = ({ setMeasurements, measurements }) => {
  const [name, setName] = React.useState("");
  const [unit, setUnit] = React.useState("inches");

  const handleAddSize = () => {
    console.log("object");
    // check if name is not empty
    if (name && unit) {
      // check if name already exist
      const exist = measurements.find((item) => item.name === name);

      if (exist) {
        // if exist update the unit
        setMeasurements(
          measurements.map((item) =>
            item.name === name ? { ...exist, unit } : item,
          ),
        );
      } else {
        // if not exist add the name
        setMeasurements([...measurements, { name, unit }]);
      }
    }
  };

  return (
    <section className="flex w-full flex-col gap-y-3">
      <div className="flex w-full gap-x-12 text-sm">
        <div className="flex items-center gap-4">
          <label className="font-medium" htmlFor="name">
            Name:
          </label>
          <input
            className="w-32 rounded border border-asisDark/50 bg-transparent px-2 py-2"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="font-medium capitalize" htmlFor="unit">
            unit:
          </label>
          <input
            className="w-16 rounded border border-asisDark/50 bg-transparent px-2 py-2 "
            type="text"
            id="unit"
            name="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleAddSize}
        type="button"
        className="flex w-24 items-center justify-center gap-2 rounded-md border border-asisDark/50 py-2 text-xs"
      >
        <IoAddOutline className="h-4 w-4" /> Add Size
      </button>
    </section>
  );
};

export default Measurements;
