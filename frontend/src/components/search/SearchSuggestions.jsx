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
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-medium text-surface-500 flex items-center gap-1.5 mr-1">
        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        Gợi ý tìm kiếm:
      </span>
      {SUGGESTIONS.map((item) => {
        const isSelected = activeQuery?.toLowerCase() === item.toLowerCase();
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
              isSelected
                ? 'bg-brand-600 text-white border-brand-600 font-medium shadow-xs'
                : 'bg-surface-50 text-surface-600 border-surface-200 hover:bg-surface-100 hover:border-surface-300 hover:text-surface-900'
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
