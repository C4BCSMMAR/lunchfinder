# LunchFinder 🍽️

> Never wonder where to eat again

A modern, real-time lunch coordination application that streamlines team meal planning with an intuitive interface, live order tracking, and seamless restaurant selection.

## 🎯 Problem We're Solving

Every day, teams waste valuable time coordinating lunch orders through endless group chats, managing individual preferences, and keeping track of who ordered what from where.

## 💡 Our Solution

LunchFinder provides a centralized platform for lunch coordination featuring:

- 👤 **Simple Entry** - No complex authentication, just enter your name
- 🏪 **Curated Restaurants** - Pre-selected quality restaurant options
- ⚡ **Real-time Updates** - See orders appear instantly as teammates place them
- 📱 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 📋 **Order Tracking** - Live sidebar showing all recent team orders

## ✨ Key Features

- **Instant Coordination** - Quick name entry and restaurant selection
- **Real-time Updates** - Live order feed updates automatically
- **Restaurant Showcase** - Beautifully presented restaurant options with direct menu links
- **Order History** - Recent orders sidebar with user names and meal details
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern Interface** - Glassmorphism UI with gradient backgrounds and smooth animations

## 🛠️ Tech Stack

**Frontend:**
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Vite** for build tooling
- **Custom CSS animations** and glassmorphism effects
- **Responsive design** with mobile-first approach

**Backend:**
- **PocketBase** - Self-hosted backend with real-time subscriptions
- **SQLite** database with automatic migrations
- **RESTful API** with real-time WebSocket support
- **File-based** deployment (no complex server setup)

**Key Features:**
- **Real-time coordination** via PocketBase subscriptions
- **Modern UI patterns** with glassmorphism and gradient effects
- **Responsive animations** and smooth transitions
- **Live data updates** without page refreshes

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

#### 1. Start PocketBase Backend
```bash
cd backend
./pocketbase.exe serve --http=0.0.0.0:8080
```

#### 2. Setup Database
1. Visit http://localhost:8080/_/
2. Create admin account (email: admin@example.com)
3. The collections will be created automatically

#### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

#### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend Admin**: http://localhost:8080/_/

### Current Status
✅ **Fully Functional** - Complete lunch coordination system with real-time updates and modern UI.

## 📁 Project Structure

```
votingsystem/
├── backend/           # PocketBase backend server
│   ├── pocketbase.exe # PocketBase executable
│   └── pb_data/      # Database and uploads
├── frontend/         # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/   # API services
│   │   └── types/      # TypeScript definitions
│   └── package.json
├── docs/            # GitHub Pages landing page
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://yourusername.github.io/lunchfinder/) (GitHub Pages)
- [Issues](https://github.com/yourusername/lunchfinder/issues)
- [Discussions](https://github.com/yourusername/lunchfinder/discussions)

## 📊 Roadmap

- [x] **Frontend Application** - Modern React app with glassmorphism UI
- [x] **Real-time Backend** - PocketBase integration with live updates
- [x] **Restaurant Management** - Curated restaurant selection system
- [x] **Order Coordination** - Live order tracking and history
- [x] **Responsive Design** - Mobile and desktop optimization
- [ ] **Enhanced Features** - User preferences and favorites
- [ ] **Restaurant Integration** - Direct ordering API connections
- [ ] **Mobile App** - Native iOS/Android applications
- [ ] **Advanced Analytics** - Order patterns and recommendations

---

**Made with ❤️ by the LunchFinder team**