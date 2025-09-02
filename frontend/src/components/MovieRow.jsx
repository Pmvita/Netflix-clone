import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const MovieCard = ({ movie, onPlay, onAddToList, onShowDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-36 object-cover rounded-lg transition-all duration-300"
        />
        
        {/* Hover overlay */}
        {isHovered && (
          <Card className="absolute top-0 left-0 w-80 bg-gray-900 border-gray-700 shadow-2xl transform -translate-y-2">
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-lg" />
                
                {/* Play button overlay */}
                <Button
                  size="sm"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 text-black hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay && onPlay(movie);
                  }}
                >
                  <Play size={16} className="fill-black" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="rounded-full bg-white text-black hover:bg-gray-200 p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlay && onPlay(movie);
                      }}
                    >
                      <Play size={14} className="fill-black" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-gray-600 text-white hover:bg-gray-800 p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToList && onAddToList(movie);
                      }}
                    >
                      <Plus size={14} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-gray-600 text-white hover:bg-gray-800 p-2"
                    >
                      <ThumbsUp size={14} />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-gray-600 text-white hover:bg-gray-800 p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowDetails && onShowDetails(movie);
                    }}
                  >
                    <ChevronDown size={14} />
                  </Button>
                </div>

                {/* Title and metadata */}
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">{movie.title}</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {movie.rating}
                    </Badge>
                    <span className="text-gray-400">{movie.year}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1">
                  {movie.genre?.slice(0, 3).map((genre) => (
                    <span key={genre} className="text-xs text-gray-400">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const MovieRow = ({ title, movies, onPlay, onAddToList, onShowDetails }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Update scroll button states
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-4 px-4">{title}</h2>
      
      <div className="relative group">
        {/* Left scroll button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/80 text-white hover:bg-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={20} />
          </Button>
        )}

        {/* Right scroll button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/80 text-white hover:bg-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={20} />
          </Button>
        )}

        {/* Movies container */}
        <div 
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 pb-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies?.map((movie) => (
            <div key={movie.id} className="flex-none w-60">
              <MovieCard 
                movie={movie} 
                onPlay={onPlay}
                onAddToList={onAddToList}
                onShowDetails={onShowDetails}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;