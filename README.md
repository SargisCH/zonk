# 🧩 Zonk

Zonk is a modular, TypeScript-based React application/game powered by Vite and Zustand. I have created it just to work with a technologies that I am interested in and also to have it in my portfolio . It includes a clean architecture with separation of concerns across components, controllers, services, hooks, and helpers. Controllers and service act like a back and service or a class that handles business logic.

DEMO: https://zonk-demo.surge.sh/

## 📁 Project Structure

zonk/
├── App.css
├── App.tsx
├── assets/ # Static files like images, icons, fonts  
├── components/ # Reusable UI components  
├── controllers/ # Application logic controllers (e.g., RoundController.ts)  
├── helpers/ # Utility functions  
├── hooks/ # Custom React hooks  
├── index.css  
├── main.tsx # Application entry point  
├── pages/ # Route-specific pages  
├── services/ # Business logic/services (e.g., shaker.ts)  
├── store/ # Global state management (Zustand)  
├── types.d.ts # Shared TypeScript type declarations  
├── vite-env.d.ts  
└── package.json

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js ≥ 18
- pnpm / npm / yarn

### 🔧 Installation

git clone https://github.com/your-username/zonk.git  
cd zonk  
npm install

### 🛠 Running the App

To start the development server:

npm run dev

Then open http://localhost:5173 in your browser.

To build for production:

npm run build

To preview the production build locally:

npm run preview

To lint the code:

npm run lint

## 🧪 Tech Stack

- React 19
- TypeScript
- Vite – lightning-fast bundler and dev server
- Zustand – simple and scalable state management
- React Router v7 – routing
- TailwindCSS – utility-first styling
- ESLint – linting
- UUID – unique ID generation

## 📚 Scripts

dev – Run dev server with Vite  
build – Type check and build project  
preview – Preview production build  
lint – Run ESLint across the project
