export default function VariantSelector({
  label,
  options,
  selected,
  onSelect,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-3 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${
              selected === option
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:border-blue-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
