# Netflix Clone - Frontend to Backend Integration Contracts

## Current Implementation Status
✅ **Frontend-Only Complete** with mock data
- All UI components implemented and functional
- Interactive elements working (buttons, hover effects, search)
- Video player with YouTube integration
- Profile selector functionality
- Responsive design with Netflix-authentic styling

## API Contracts

### 1. User Management APIs

#### Get User Profiles
```
GET /api/profiles
Response: {
  profiles: [
    {
      id: string,
      name: string,
      avatar: string,
      isKids: boolean
    }
  ]
}
```

#### Create/Update Profile
```
POST /api/profiles
PUT /api/profiles/:id
Body: {
  name: string,
  avatar: string,
  isKids: boolean
}
```

### 2. Content Management APIs

#### Get Featured Content
```
GET /api/featured
Response: {
  id: string,
  title: string,
  description: string,
  backdrop: string,
  logo: string,
  genre: string[],
  rating: string,
  year: number,
  seasons?: number,
  trailerUrl: string
}
```

#### Get Movie Categories
```
GET /api/categories
Response: {
  categories: [
    {
      id: string,
      title: string,
      movies: Movie[]
    }
  ]
}
```

#### Search Content
```
GET /api/search?q={query}
Response: {
  results: Movie[]
}
```

#### Get Movie Details
```
GET /api/movies/:id
Response: Movie & {
  cast: string[],
  director: string,
  duration: number,
  releaseDate: string,
  synopsis: string
}
```

## Mock Data Integration Points

### Files Currently Using Mock Data:
1. **`/app/frontend/src/data/mock.js`** - Contains all mock data
   - `featuredContent` - Hero section content
   - `movieCategories` - All movie rows and categories
   - `userProfiles` - User profile data

### Frontend Components Needing Backend Integration:
1. **`App.js`** - Main component loading mock data
2. **`Header.jsx`** - Search functionality
3. **`HeroSection.jsx`** - Featured content
4. **`MovieRow.jsx`** - Category-based movie lists
5. **`ProfileSelector.jsx`** - User profiles

## Backend Implementation Plan

### 1. Database Schema (MongoDB)
```javascript
// Users Collection
{
  _id: ObjectId,
  email: string,
  password: string, // hashed
  profiles: [
    {
      id: string,
      name: string,
      avatar: string,
      isKids: boolean,
      watchHistory: ObjectId[],
      myList: ObjectId[]
    }
  ]
}

// Content Collection
{
  _id: ObjectId,
  tmdbId: number,
  title: string,
  description: string,
  backdrop: string,
  poster: string,
  genre: string[],
  rating: string,
  year: number,
  type: "movie" | "series",
  seasons?: number,
  trailerUrl: string,
  cast: string[],
  director: string,
  duration: number,
  featured: boolean,
  categories: string[]
}

// Categories Collection
{
  _id: ObjectId,
  name: string,
  displayOrder: number,
  contentIds: ObjectId[]
}
```

### 2. External API Integration
- **TMDB API Integration**: Use provided API keys to fetch real movie/TV data
  - Keys: `c8dea14dc917687ac631a52620e4f7ad`, `3cb41ecea3bf606c56552db3d17adefd`
  - Populate content database with trending, popular, and categorized content
  - Get YouTube trailer URLs for video player

### 3. Authentication System
- JWT-based authentication
- Profile-based access control
- Session management

## Frontend Changes Required for Backend Integration

### 1. API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const contentService = {
  getFeatured: () => fetch(`${API_BASE}/featured`),
  getCategories: () => fetch(`${API_BASE}/categories`),
  search: (query) => fetch(`${API_BASE}/search?q=${query}`)
}

export const userService = {
  getProfiles: () => fetch(`${API_BASE}/profiles`),
  createProfile: (data) => fetch(`${API_BASE}/profiles`, { method: 'POST', body: JSON.stringify(data) })
}
```

### 2. State Management
- Replace mock data imports with API calls
- Add loading states for all data fetching
- Error handling for failed API requests

### 3. Authentication Flow
- Add login/signup pages
- Protected routes for authenticated users
- Profile selection after login

## Additional Features for Full Netflix Experience

### 1. Advanced Features
- Continue watching functionality
- Watch history tracking
- My List management
- User ratings and recommendations
- Multiple language support
- Subtitle functionality

### 2. Admin Panel
- Content management system
- User analytics
- Content categorization tools

## Video Streaming Implementation

### Current: YouTube Integration
- Using embedded YouTube videos for trailers
- Click "Play" opens YouTube player in modal

### Future: Real Streaming
- Video file hosting (AWS S3/CloudFront)
- HLS/DASH streaming protocols
- Video quality adaptation
- Offline download capability

## Testing Strategy
- Unit tests for all components
- Integration tests for API endpoints
- E2E tests for user flows
- Performance testing for video streaming

This contracts document serves as the blueprint for seamlessly transitioning from the current mock-data frontend to a fully functional Netflix clone with backend integration.