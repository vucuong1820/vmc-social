import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchKeywords, searchWithKeyword } from "../../services/search";
import { htmlToText } from "../../shared/utils";



const SearchBoxWatchTogether: FC<any> = ({ autoFocus, setMovieInfo, setError }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const timeoutRef = useRef<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setSuggestions([]);

    if (!inputValue.trim()) return;

    timeoutRef.current = setTimeout(async () => {
      const data = await searchWithKeyword(inputValue.trim());
      console.log(data)

      setSuggestions(data.map((item) => ({name: item.name, id: item.id})));
    }, 500);
  }, [inputValue]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
    //   navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleClickMovie = (movie) => {
    
    setInputValue(movie.name)
    setMovieInfo(movie)
    setError(prev => ({...prev, movie: false}))
  }

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="relative group w-full">
      <form onSubmit={handleFormSubmit} className="relative">
        <input
          value={inputValue}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent outline-none border border-gray-600 w-full rounded-lg py-2 pl-4 pr-8"
          type="text"
          placeholder="Search..."
          autoFocus={autoFocus}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <i className="fas fa-search text-xl"></i>
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 top-full left-0 w-full bg-dark-lighten rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch hidden group-focus-within:flex">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleClickMovie(suggestion)}
            //   to={`/search?q=${encodeURIComponent(suggestion)}`}
            >
              <button
                className={`text-left p-2 w-full ${
                  index !== suggestions.length - 1
                    ? "border-b border-gray-500"
                    : ""
                }`}
              >
                {suggestion.name}
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBoxWatchTogether;
