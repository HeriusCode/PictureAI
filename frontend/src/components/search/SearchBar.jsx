import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';

export function SearchBar({
  onSearch,
  onClear,
  initialQuery = '',
  loading = false,
  placeholder = 'Search images... e.g. black dog, red hat, blue car',
  showSuggestions = true,
  autoFocus = false
}) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) onClear();
  };

  const handleSuggestionClick = (suggested) => {
    setQuery(suggested);
    onSearch(suggested);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative w-full">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-surface-400">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full pl-12 pr-28 py-3.5 bg-white border border-surface-300 rounded-2xl text-surface-900 placeholder-surface-400 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-24 pr-2 flex items-center text-surface-400 hover:text-surface-700 transition-colors focus:outline-none"
              title="Xóa từ khóa"
            >
              <X className="w-4 h-4 bg-surface-100 hover:bg-surface-200 rounded-full p-0.5" />
            </button>
          )}

          {/* Search Action Button inside or alongside */}
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl font-medium text-sm transition-colors shadow-xs flex items-center gap-2 disabled:opacity-60 focus:outline-none"
          >
            {loading ? (
              <span>Đang tìm...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested keywords */}
      {showSuggestions && (
        <SearchSuggestions
          activeQuery={query}
          onSelect={handleSuggestionClick}
        />
      )}
    </div>
  );
}

export default SearchBar;
