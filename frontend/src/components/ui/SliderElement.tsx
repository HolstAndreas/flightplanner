import React from "react";

interface SliderElementProps {
  id:string,
  name: string,
  min: string,
  max: string,
  value: string,
  step: string,
  label: string,
  onChange: (name: string, value: string) => void;
}

const SliderElement = ({ id, name, min, max, value, step, label, onChange}: SliderElementProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="w-60 mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}: {value}
      </label>
      <input
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default SliderElement