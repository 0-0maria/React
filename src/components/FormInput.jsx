import React, { forwardRef } from "react";

const FormInput = forwardRef(({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  error = "",
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="font-semibold text-slate-700"
        >
          {label} {required && "*"}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;