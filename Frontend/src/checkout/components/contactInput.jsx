import React from "react";

const ContactInput = ({ touched, errors, fieldProps, name, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        className={`w-full border bg-transparent px-4 py-2.5 focus:outline-none focus:ring-0 ${
          touched && errors ? "border-red-500" : "border-asisDark"
        }`}
        {...fieldProps}
      />
      <div className="h-1.5">
        {touched && errors ? (
          <p className="text-xs italic font-semibold text-red-500">{errors}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ContactInput;

