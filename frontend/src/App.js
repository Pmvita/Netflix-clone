import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MovieRow from './components/MovieRow';
import VideoPlayer from './components/VideoPlayer';
import ProfileSelector from './components/ProfileSelector';
import { featuredContent, movieCategories, userProfiles } from './data/mock';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';

const NetflixHomepage = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(movieCategories);
  const { toast } = useToast();

  useEffect(() => {
    // Set default profile
    setCurrentProfile(userProfiles[0]);
  }, []);

  const handleProfileSelect = (profile) => {
    setCurrentProfile(profile);
  };

  const handlePlay = (content) => {
    setSelectedContent(content);
    setIsVideoPlayerOpen(true);
  };

  const handleAddToList = (movie) => {
    toast({
      title: "Added to My List",
      description: `${movie.title} has been added to your list.`,
    });
  };

  const handleMoreInfo = (content) => {
    toast({
      title: "More Info",
      description: `Showing details for ${content.title}`,
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredCategories(movieCategories);
      return;
    }

    const filtered = movieCategories.map(category => ({
      ...category,
      movies: category.movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      )
    })).filter(category => category.movies.length > 0);

    setFilteredCategories(filtered);
  };

  // If no profile selected, show profile selector
  if (!currentProfile) {
    return (
      <div className="bg-black min-h-screen">
        <ProfileSelector 
          profiles={userProfiles} 
          onSelectProfile={handleProfileSelect}
        />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header 
        currentProfile={currentProfile}
        onSearch={handleSearch}
      />
      
      {/* Hero Section */}
      <HeroSection 
        content={featuredContent}
        onPlay={handlePlay}
        onMoreInfo={handleMoreInfo}
      />

      {/* Movie Rows */}
      <div className="relative z-10 -mt-32 pb-20">
        {filteredCategories.map((category) => (
          <MovieRow
            key={category.id}
            title={category.title}
            movies={category.movies}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            onShowDetails={handleMoreInfo}
          />
        ))}
      </div>

      {/* Video Player Modal */}
      <VideoPlayer
        content={selectedContent}
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
      />

      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NetflixHomepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;