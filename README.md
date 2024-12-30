# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

React Application

## Introduction

Welcome to the **React Application**! This project is a feature-rich web application built with React, implementing user authentication, theming, and dynamic routing to provide a seamless user experience.

## Features

- **User Authentication**
  - Registration and Login functionalities  
  - Forgot Password feature
- **Theming**
  - Toggle between Light and Dark modes  
  - Persist theme preference with `localStorage`
- **Routing**
  - Client-side routing with React Router  
  - Protected routes for authenticated users
- **User Profiles**
  - View and edit user profiles  
  - Profile settings management
- **Modal Components**
  - Reusable modal dialogs for various interactions

## Project Structure
```
    .
    ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.js
   ├─ public
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ App.jsx
   │  ├─ assets
   │  │  ├─ images
   │  │  │  └─ defaultProfile.jpg
   │  │  └─ react.svg
   │  ├─ components
   │  │  ├─ Dashboard.jsx
   │  │  ├─ DefaultSidebar.jsx
   │  │  ├─ ForgotPassword.jsx
   │  │  ├─ ListUsers.jsx
   │  │  ├─ Login.jsx
   │  │  ├─ LogoutButton.jsx
   │  │  ├─ Modal.jsx
   │  │  ├─ Profile.jsx
   │  │  ├─ ProfileSettings.jsx
   │  │  └─ Registrations.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ HomePage.jsx
   │  │  ├─ LoginPage.jsx
   │  │  ├─ ProfilePage.jsx
   │  │  ├─ ProfileSettingsPage.jsx
   │  │  └─ UsersPage.jsx
   │  └─ ThemeContext.js
   ├─ tailwind.config.js
   └─ vite.config.js
```
## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/awesome-react-app.git

2. **Navigate to the project directory**
    ```bash 
    cd react-app

3. **Install Dependencies**
    ```bash 
    npm install

4. **Start the development server**
    ```bash
    npm start

## Backend

The backend part of this project is available in a separate repository. You can find it at the following link:

[Backend Repository](https://github.com/muz2002/Inventory-Management-Backend.git)
