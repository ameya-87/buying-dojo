import React from "react";
import "./FormFields.css";

export default function FloatingField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  children,
}) {
  const hasValue = value !== undefined && value !== "";

  return (
    <label className={`form-field ${hasValue ? "is-filled" : ""}`}>
      <span className="form-field-label">{label}</span>
      {children ?? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}
