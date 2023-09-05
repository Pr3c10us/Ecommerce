import React from "react";

const Input = ({ touched, errors, fieldProps, name, placeholder }) => {
  return (
    <div className={`flex w-full flex-col gap-1 `}>
      <label htmlFor={name} className="text-sm capitalize text-asisDark">
        {placeholder}
      </label>
      <input
        type={name == "password" || name == "confirmPassword" ? "password" : "text"}
        name={name}
        id={name}
        // placeholder={placeholder}
        className={`w-full rounded border bg-[#FFF4D9] px-4 py-2 focus:outline-none focus:ring-0 ${
          touched && errors ? "border-red-500" : "border-asisDark"
        }`}
        {...fieldProps}
      />
      <div className="h-1">
        {touched && errors ? (
          <p className="text-[0.6rem] font-semibold text-red-500 capitalize">{errors}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
