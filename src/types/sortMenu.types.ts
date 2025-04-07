export type SortOption = {
  label: string;
  value: string;
}

export type SortMenuProps = {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
}