import React from "react";
import { Airport } from "../../types";


interface SelectElementProps {
  label?: string;
  name: string;
  value: string;
  options: string[] | Airport[];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectElement = ({ label, name, value, options, placeholder, onChange }: SelectElementProps) => {
  return (
    <div className="mb-2">
      {label && <h3 className="pl-1 text-sm text-gray-600 mb-1">{label}</h3>}
      <select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option 
            key={typeof option === 'string' ? option : option.iataCode} 
            value={typeof option === 'string' ? option : option.iataCode}
          >
            {typeof option === 'string' ? option : option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectElement