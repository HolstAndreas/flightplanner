interface CheckboxElementProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (name: string, checked: boolean) => void;
}

const CheckboxElement = ({ label, name, checked, onChange }: CheckboxElementProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange(name, e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  )
}

export default CheckboxElement;