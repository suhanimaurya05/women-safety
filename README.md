# women-safety
# SafeX – Women Safety App

Live demo: https://suhanimaurya05.github.io/women-safety/

A comprehensive women safety application designed to provide quick emergency response, trusted contact management, and intelligent route guidance. SafeX empowers users with essential safety tools during emergencies.

## Overview

SafeX combines critical safety features into a single, intuitive platform:

- **Emergency SOS**: One-touch activation for rapid emergency response
- **Trusted Contacts**: Manage and notify emergency contacts instantly
- **Live Location Sharing**: Share your real-time location with trusted people
- **Nearby Help Finder**: Locate police stations, hospitals, and emergency services
- **Safe Route Guidance**: Get safety-rated route recommendations
- **Fake Call Feature**: Discreet escape option for unsafe situations
- **Incident Reporting**: Document and report safety incidents
- **Status Tracking**: Communicate your current safety status

## Features

### Authentication & Profile

- User sign-up and secure login
- Profile management and customization
- Session persistence with browser storage
- Account settings and preferences

### Emergency Response

- **SOS Button**: Press and hold for 3 seconds to activate emergency mode
- **Countdown**: Visual countdown during activation with cancel option
- **Auto-notifications**: Alerts trusted contacts when SOS is activated
- **Live Location**: Automatic location sharing during emergencies
- **Emergency Dial**: One-tap calling to 112 and saved contact numbers

### Contact Management

- Add, edit, and delete emergency contacts
- Mark primary emergency contact
- Select which contacts receive notifications
- Store contact relationships and phone numbers

### Safety Navigation

- View nearby police stations, hospitals, and emergency services
- Filter help locations by type
- Display distance and address information
- Simulated GPS-based discovery

### Route Planning

- Compare multiple safe routes
- View route distance, time, and safety ratings
- Visual route selection and planning interface

### Incident Reporting

- Structured incident report form
- Multiple incident categories (harassment, stalking, etc.)
- Location and timestamp logging
- Form submission confirmation

### Safety Status

- Toggle between Safe / At Risk / Emergency states
- Quick status indicator in dashboard
- Status sync across the application

### User Experience

- Responsive design for mobile, tablet, and desktop
- Intuitive navigation with sidebar and top bar
- Real-time notifications panel
- Dark-friendly, accessible color scheme

## Tech Stack

| Layer          | Technology           |
| -------------- | -------------------- |
| **Frontend**   | React 19             |
| **Build Tool** | Vite 8               |
| **Styling**    | Tailwind CSS 4       |
| **Icons**      | Lucide React         |
| **Language**   | JavaScript (JSX)     |
| **State**      | React Hooks          |
| **Storage**    | Browser localStorage |
| **Deployment** | GitHub Pages         |

## Project Structure

```
safex/
├── src/
│   ├── App.jsx              # Main application shell and state orchestration
│   ├── App.css              # App-specific styling and UI treatments
│   ├── constants.js         # Shared app constants and default data
│   ├── utils.js             # Reusable helper functions and storage logic
│   ├── index.css            # Global styles and Tailwind base setup
│   ├── main.jsx             # Application entry point
│   ├── assets/              # Images, icons, and static assets
│   └── components/
│       ├── TopBar.jsx       # Header, status selector, notifications, profile menu
│       └── views/           # Feature-specific views and panels
├── public/                  # Static public files
├── index.html               # HTML entry template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── README.md                # Project documentation
├── package-lock.json        # Lockfile for installed dependencies
└── dist/                    # Production build output
```

## Installation

### Prerequisites

- Node.js 16+ and npm 8+

### Setup

```bash
# Clone the repository
git clone https://suhanimaurya05.github.io/women-safety/
cd safex

# Install dependencies
npm install

# Run the development server
npm run dev
```



## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Build & Deployment

### Production Build

```bash
# Create optimized build
npm run build

# Output will be in the dist/ folder
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and push the dist folder to the `gh-pages` branch.

## Environment Variables

The application uses browser localStorage for state persistence. No external API keys or environment variables are required for the prototype version.

For production deployment with real services, you would need:

- Google Maps API key (for real location services)
- Twilio API credentials (for actual calling)
- Backend server endpoints (for incident storage)

## Usage Guide

### First Time Login

1. Sign up with your name and email
2. Add your primary emergency contact
3. Complete the onboarding tutorial
4. Review your safety settings

### Emergency SOS

1. Press and hold the SOS button on the dashboard
2. Hold for 3 seconds until activation
3. Trusted contacts will be notified
4. Live location sharing begins
5. Call emergency services if needed
6. Release to cancel before activation

### Managing Contacts

1. Navigate to "Emergency Contacts"
2. Click "Add Emergency Contact"
3. Enter contact details
4. Select which contacts to notify during emergencies

### Reporting Incidents

1. Go to "Report Incident"
2. Select incident category
3. Add details and description
4. Submit the report

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized with Vite for fast builds
- Tree-shaking and code splitting
- Responsive images and lazy loading
- Minimal dependencies for fast load times

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Focus indicators on interactive elements

## Future Enhancements

- Backend API integration for persistent storage
- Real-time location tracking with Google Maps
- SMS notifications via Twilio
- Push notifications for web
- Multi-language support
- Progressive Web App (PWA) features
- Dark mode toggle

## License

This project is provided as-is for educational and safety purposes.

## Credits

**Development Team**: CodeSherlox

- Janvi
- Mansi
- Suhani

## Support

For issues, feature requests, or questions, please open an issue on the [GitHub repository](https://suhanimaurya05.github.io/women-safety/).
