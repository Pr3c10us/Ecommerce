import React from "react";

const OrderNav = ({ activeStep, setActiveStep }) => {
  const steps = [
    { id: "contact", name: "Contact", status: 1 },
    { id: "shipping", name: "Shipping", status: 2 },
    { id: "payment", name: "Payment", status: 3 },
  ];
  return (
    <nav className="relative flex w-full py-4 md:py-8">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex w-full text-sm md:text-base flex-1 ${
            step.status == 2 && "justify-center"
          } ${step.status == 3 && "justify-end"}`}
        >
          <div
            className={`font-semibold italic ${
              step.status === activeStep
                ? " text-asisDark"
                : "text-asisDark/50 "
            }`}
          >
            (0{step.status}/{step.name})
          </div>
        </div>
      ))}
      {/* <div className="absolute bottom-0 w-full bg-gray-300">
          <div
            className={`bottom-0 h-0.5 w-1/2 bg-yellow-200 transition-all duration-200 ${
              activeStep ? "translate-x-full" : ""
            }`}
          ></div>
        </div> */}
      <div className="absolute bottom-0 h-0.5 w-full bg-[#B0B0B0]">
        <div
          className={`absolute h-full w-1/3 bg-asisDark transition-all duration-200 ${
            activeStep == 2 && "translate-x-full"
          } ${activeStep == 3 && "translate-x-[200%]"}`}
        ></div>
      </div>
      {/* <div
        onClick={() => {
          if (activeStep < 3) setActiveStep(activeStep + 1);
          if (activeStep == 3) setActiveStep(1);
        }}
        className="absolute right-0 top-0 h-4 w-20 bg-[#B0B0B0]"
      ></div> */}
    </nav>
  );
};

export default OrderNav;
