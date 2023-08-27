import React from "react";
import OrderNav from "./orderNav";
import Contact from "./contact";
import Shipping from "./shipping";
import Payment from "./Payment";
// import Loading from "./loading";

const Order = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  return (
    <div className="flex flex-1 flex-col px-4 lg:px-8 py-4 ">
      <OrderNav activeStep={activeStep} setActiveStep={setActiveStep} />
      <section className="relative h-full">
        {activeStep === 1 && <Contact setActiveStep={setActiveStep} />}
        {activeStep === 2 && <Shipping setActiveStep={setActiveStep} />}
        {activeStep === 3 && <Payment setActiveStep={setActiveStep} />}
      </section>
    </div>
  );
};

export default Order;
