import React, { useState } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const HeroSection = ({ content, onPlay, onMoreInfo }) => {
  const [isMuted, setIsMuted] = useState(true);

  if (!content) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${content.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6">
            {/* Logo/Title */}
            {content.logo ? (
              <img 
                src={content.logo} 
                alt={content.title}
                className="h-20 md:h-32 w-auto object-contain"
              />
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {content.title}
              </h1>
            )}

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="destructive" className="bg-red-600 text-white">
                {content.rating}
              </Badge>
              <span className="text-white font-medium">{content.year}</span>
              {content.seasons && (
                <span className="text-white">
                  {content.seasons} Season{content.seasons > 1 ? 's' : ''}
                </span>
              )}
              <div className="flex gap-2">
                {content.genre?.slice(0, 3).map((genre) => (
                  <Badge key={genre} variant="outline" className="border-gray-400 text-gray-300">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
              {content.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8"
                onClick={() => onPlay && onPlay(content)}
              >
                <Play size={20} className="mr-2 fill-black" />
                Play
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-gray-600/80 text-white hover:bg-gray-600 font-semibold px-8"
                onClick={() => onMoreInfo && onMoreInfo(content)}
              >
                <Info size={20} className="mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="absolute bottom-32 right-8">
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full border border-gray-400 text-white hover:bg-white/20"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
        </div>
      </div>

      {/* Age Rating Overlay */}
      <div className="absolute bottom-32 left-8 text-white">
        <div className="border border-gray-400 px-2 py-1 text-sm">
          {content.rating}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;