import { SortMenuProps, SortOption } from "@/types/sortMenu.types";

export default function SortMenu({
  value,
  onChange,
  options
}: SortMenuProps){
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {options.map((option: SortOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}