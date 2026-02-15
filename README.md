# Cell Phone Management System

An efficient web application for managing cell phone store operations, including inventory tracking, balance management, and employee administration.

## Features

-   **Master Data Management**: Comprehensive tools for managing Admins, Employees, and Item Types.
-   **Inventory Control**:
    -   Track all Items.
    -   Log Incoming Items (Item In).
    -   Record Outgoing Items (Item Out).
-   **Financial Management**:
    -   Monitor Balances.
    -   Record Balance In transactions.
    -   Manage Credit Out and Topup Out activities.
-   **Dashboard**: A central hub for viewing key metrics and recent activities.

## Tech Stack

-   **Frontend Framework**: [Vue.js 3](https://vuejs.org/)
-   **State Management & Routing**: Vue Router
-   **HTTP Client**: Axios
-   **Styling**: [Bootstrap 5](https://getbootstrap.com/), Sass
-   **Icons**: Boxicons

## Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (Internet connection required for installation)
-   npm (comes with Node.js)

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/cell-phone-front-end.git
    cd cell-phone-front-end
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

### Development Server

To start the application in development mode with hot-reload:

```bash
npm run serve
```

Access the application at `http://localhost:8080`.

### Production Build

To compile and minify the application for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets.

## Project Structure

```
src/
├── assets/          # Static assets (images, styles)
├── components/      # Reusable Vue components (e.g., Sidebar)
├── router/          # Vue Router configuration
│   └── index.js     # Route definitions
├── views/           # Page components
│   ├── balances/    # Balance-related views
│   ├── items/       # Item-related views
│   └── masters/     # Admin and Employee management views
├── App.vue          # Root component
└── main.js          # Application entry point
```