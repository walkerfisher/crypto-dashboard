import { SearchInputProps } from "@/types/searchInput.type";
import { useEffect, useState } from "react";

export default function SearchInput({
  onSearch,
  placeholder = 'Search...',
  delay = 300,
}: SearchInputProps){
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input);
    }, delay);

  return () => clearTimeout(timeout);
},[input, delay, onSearch]);

return (
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder={placeholder}
    className="px-4 py-2 w-full max-w-md rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
  );
}