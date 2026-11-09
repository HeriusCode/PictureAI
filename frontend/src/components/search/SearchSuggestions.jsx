import React from 'react';
import { Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'black dog',
  'red fox',
  'blue whale',
  'golden eagle',
  'red hat',
  'blue car',
  'botanical rose',
  'autumn maple',
  'vintage locomotive'
];

export function SearchSuggestions({ onSelect, activeQuery }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
      <span className="text-xs font-semibold text-surface-500 flex items-center gap-1.5 mr-1">
        <Sparkles className="w-4 h-4 text-brand-500" />
        Gợi ý tìm kiếm:
      </span>
      {SUGGESTIONS.map((item) => {
        const isSelected = activeQuery?.toLowerCase() === item.toLowerCase();
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              isSelected
                ? 'bg-brand-600 text-white border-brand-600 font-semibold shadow-xs'
                : 'bg-white text-surface-700 border-surface-200 hover:bg-surface-100 hover:border-surface-300 hover:text-surface-900 shadow-2xs'
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default SearchSuggestions;
