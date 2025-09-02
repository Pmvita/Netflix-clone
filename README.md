# 🎬 Netflix Clone

A pixel-perfect Netflix clone built with React and FastAPI, featuring authentic Netflix UI/UX, video streaming, and comprehensive content management.

![Netflix Clone](https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=600&fit=crop)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB
- Yarn package manager

### Installation & Setup

1. **Clone and Setup**
   ```bash
   # The project is already set up in your environment
   cd /app
   ```

2. **Start the Application**
   ```bash
   # Both frontend and backend are managed by supervisor
   sudo supervisorctl status

   # If needed, restart services
   sudo supervisorctl restart all
   ```

3. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8001/api`

## 📋 Project Overview

### Current Implementation Status
✅ **Frontend Complete** - Fully functional Netflix clone with mock data  
🔄 **Backend Ready** - FastAPI structure in place, ready for integration  
📋 **Integration Plan** - Detailed contracts and roadmap available  

### Key Features

#### 🎨 User Interface
- **Authentic Netflix Design** - Dark theme with Netflix red branding
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Profile System** - Multi-user profile selection interface

#### 🎬 Content Features
- **Hero Section** - Featured content with auto-playing background
- **Movie Rows** - Horizontal scrollable categories
- **Video Player** - YouTube integration for trailers
- **Search Functionality** - Real-time content filtering
- **Interactive Cards** - Detailed hover overlays with actions

#### 📱 Categories
- Trending Now
- Popular on Netflix
- Netflix Originals
- Action & Adventure
- *(Easily extensible for more categories)*

## 🏗️ Project Structure

```
/app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Header.jsx   # Navigation bar
│   │   │   ├── HeroSection.jsx
│   │   │   ├── MovieRow.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── ProfileSelector.jsx
│   │   │   └── ui/          # Shadcn/UI components
│   │   ├── data/
│   │   │   └── mock.js      # Mock data (to be replaced)
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.js           # Main application component
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # FastAPI application
│   ├── server.py           # Main FastAPI server
│   └── requirements.txt    # Python dependencies
├── contracts.md            # API contracts & integration plan
└── README.md              # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **JWT** - Authentication (ready for implementation)

### Development Tools
- **Supervisor** - Process management
- **CRACO** - Create React App Configuration Override
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🎯 Key Components Guide

### Header Component
```jsx
<Header 
  currentProfile={profile}
  onSearch={handleSearch}
/>
```
- Netflix-style navigation
- Search functionality
- Profile dropdown
- Responsive mobile menu

### Hero Section
```jsx
<HeroSection 
  content={featuredContent}
  onPlay={handlePlay}
  onMoreInfo={handleMoreInfo}
/>
```
- Full-screen featured content
- Play/More Info buttons
- Background video support
- Responsive design

### Movie Rows
```jsx
<MovieRow 
  title="Trending Now"
  movies={movies}
  onPlay={handlePlay}
  onAddToList={handleAddToList}
/>
```
- Horizontal scrollable movie cards
- Hover effects with detailed info
- Action buttons (Play, Add to List, Like)
- Smooth scroll navigation

### Video Player
```jsx
<VideoPlayer 
  content={selectedContent}
  isOpen={isPlayerOpen}
  onClose={handleClose}
/>
```
- Full-screen video player
- YouTube integration
- Custom controls
- Skip intro functionality

## 🔧 Development Commands

### Frontend Development
```bash
cd frontend
yarn start          # Start development server
yarn build          # Build for production
yarn test           # Run tests
```

### Backend Development
```bash
cd backend
python server.py    # Start FastAPI server (not needed with supervisor)
```

### Service Management
```bash
sudo supervisorctl status          # Check service status
sudo supervisorctl restart frontend # Restart frontend
sudo supervisorctl restart backend  # Restart backend
sudo supervisorctl restart all     # Restart all services
```

## 📊 Mock Data Structure

Current implementation uses mock data in `/app/frontend/src/data/mock.js`:

- **Featured Content** - Hero section content
- **Movie Categories** - 4 categories with 6 movies each
- **User Profiles** - 3 sample user profiles
- **Popular Titles** - Stranger Things, Wednesday, Squid Game, etc.

## 🚀 Next Steps for Full Implementation

### Phase 1: Backend Integration
1. **TMDB API Integration** - Real movie data
2. **User Authentication** - JWT-based auth system
3. **Database Models** - MongoDB schemas
4. **API Endpoints** - RESTful API implementation

### Phase 2: Advanced Features
1. **User Management** - Registration, login, profiles
2. **Watch History** - Continue watching functionality
3. **My List** - Personal movie/show lists
4. **Recommendations** - AI-powered suggestions

### Phase 3: Production Features
1. **Video Streaming** - Real video content delivery
2. **Admin Panel** - Content management system
3. **Analytics** - User behavior tracking
4. **Performance** - CDN, caching, optimization

## 📝 API Documentation

See `/app/contracts.md` for detailed API contracts and integration guidelines.

### Key Endpoints (Planned)
- `GET /api/featured` - Get featured content
- `GET /api/categories` - Get movie categories
- `GET /api/search?q={query}` - Search content
- `GET /api/profiles` - Get user profiles
- `POST /api/profiles` - Create new profile

## 🎨 Design System

### Colors
- **Primary**: Netflix Red (#e50914)
- **Background**: Black (#000000)
- **Text**: White (#ffffff)
- **Secondary**: Gray variants

### Typography
- **Font Family**: Helvetica Neue, Arial, sans-serif
- **Headings**: Bold, large sizes for impact
- **Body**: Regular weight, readable sizes

### Components
- All components use Shadcn/UI for consistency
- Custom styling with Tailwind CSS
- Responsive design principles

## 🐛 Troubleshooting

### Common Issues

1. **Services not starting**
   ```bash
   sudo supervisorctl restart all
   ```

2. **Port conflicts**
   - Frontend runs on port 3000
   - Backend runs on port 8001
   - Check if ports are available

3. **Dependencies issues**
   ```bash
   cd frontend && yarn install
   cd backend && pip install -r requirements.txt
   ```

## 📄 License

This project is for educational purposes. Netflix is a trademark of Netflix, Inc.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using modern web technologies**

For detailed technical documentation, see `/app/contracts.md`