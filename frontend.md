# Frontend Application Flow for Zet Health

This document outlines the structure, components, routing, state management, API integration, and user flows of the frontend application built with React, Vite, Tailwind CSS, and React Router. The app provides a user-friendly interface for browsing medicines, pathology tests, radiology services, managing a shopping cart for orders, booking tests, and viewing bookings.

## Project Structure

The frontend is located in the `frontend/` directory. Key files and directories:

- **Entry Point**: `src/main.jsx` - Renders the `App` component into the DOM.
- **Main App Component**: `src/App.jsx` - Sets up routing, provides Cart context, and wraps the app in a styled container.
- **Components** (`src/components/`):
  - `Navbar.jsx`: Navigation bar with links to all major sections and cart item count.
  - `MedicineCard.jsx`: Displays individual medicine details (name, price, etc.) with add-to-cart functionality.
  - `PathologyCard.jsx`: Displays pathology test details with booking options.
  - `RadiologyCard.jsx`: Displays radiology test details with booking options.
- **Context** (`src/context/`):
  - `CartContext.jsx`: Manages cart state (add/remove/update items, total items/price) with localStorage persistence.
- **Pages** (`src/pages/`):
  - `Home.jsx`: Landing page with overview and quick links.
  - `Medicines.jsx`: Lists medicines with search and add-to-cart.
  - `Cart.jsx`: Displays cart items, allows quantity updates/removal, and places orders.
  - `OrderConfirmation.jsx`: Shows order details after successful purchase.
  - `Pathology.jsx`: Lists pathology tests with booking form.
  - `Radiology.jsx`: Lists radiology tests with booking form.
  - `Bookings.jsx`: Lists user's bookings with delete option.
- **Services** (`src/services/`):
  - `api.js`: Handles all API calls to the backend (e.g., fetch medicines, place orders, book tests).
- **Styling**:
  - `src/index.css` and `src/App.css`: Global and app-specific styles using Tailwind CSS.
  - `tailwind.config.js`: Tailwind configuration.
- **Configuration**:
  - `package.json`: Dependencies (React, React Router, Axios not used directly—fetch is used).
  - `vite.config.js`: Vite build tool configuration.
  - `eslint.config.js` and `postcss.config.js`: Linting and PostCSS setup.

## Technology Stack

- **Framework**: React (with hooks like `useState`, `useEffect`, `useContext`).
- **Routing**: React Router DOM (BrowserRouter, Routes, Route, Link).
- **State Management**: React Context API for cart (no Redux).
- **Styling**: Tailwind CSS for utility-first classes; custom gradients and backgrounds.
- **Build Tool**: Vite for fast development and bundling.
- **API Communication**: Native `fetch` API (no Axios).
- **Persistence**: localStorage for cart state.
- **Other**: React hooks for side effects (e.g., loading cart on mount).

## App Initialization Flow

1. **Browser Load**:
   - Vite serves `index.html` (entry point).
   - `src/main.jsx` imports and renders `<App />` into `#root`.

2. **App Setup** (`App.jsx`):
   - Wraps the app in `<CartProvider>` for global cart access.
   - Sets up `<BrowserRouter>` for client-side routing.
   - Renders `<Navbar />` at the top.
   - Defines `<Routes>` with paths:
     - `/` → `<Home />`
     - `/medicines` → `<Medicines />`
     - `/cart` → `<Cart />`
     - `/confirmation/:id` → `<OrderConfirmation />` (dynamic ID for order details)
     - `/pathology` → `<Pathology />`
     - `/radiology` → `<Radiology />`
     - `/bookings` → `<Bookings />`
   - Applies global styles: `min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`.

3. **Cart Initialization** (`CartContext.jsx`):
   - On mount (`useEffect`), loads cart from localStorage.
   - Persists cart changes back to localStorage on every update.
   - Provides functions: `addToCart`, `updateQuantity`, `removeItem`, `clearCart`.
   - Computes `totalItems` and `totalPrice` reactively.
   - Used via `useCart()` hook in components (e.g., Navbar for count, Cart for management).

## Navigation Flow

- **Navbar** (present on all pages):
  - Logo: "Zet Health 🚑".
  - Links: Home, Medicines, Cart (with item count from `useCart`), Pathology, Radiology, My Bookings.
  - Uses `Link` from React Router for seamless navigation.
  - Styles: Blue background, white text, hover underlines.

- **Home Page** (`Home.jsx`):
  - Full-screen hero with background image (Unsplash medical theme).
  - Welcome message and description.
  - Quick action buttons (styled with Tailwind colors): Medicines (blue), Pathology (green), Radiology (purple), Cart (orange), My Bookings (red).
  - Links to respective pages.

## User Flows

### 1. Medicines and Ordering Flow
   - **Browse Medicines** (`/medicines` → `Medicines.jsx`):
     - Fetches medicines via `getMedicines(search)` from `api.js` (supports search query).
     - Displays list using `<MedicineCard />` components.
     - Each card shows medicine details (name, price, description).
     - "Add to Cart" button calls `addToCart(medicine)` from `useCart()`, shows alert on add.
   
   - **View Cart** (`/cart` → `Cart.jsx`):
     - Displays cart items from `useCart()`.
     - Allows quantity updates (`updateQuantity(id, qty)`) and removal (`removeItem(id)`).
     - Shows totals (items and price).
     - "Place Order" button: Collects user info (e.g., name, address—form not detailed in code), calls `placeOrder(order)` via `api.js`.
     - On success, clears cart (`clearCart()`) and navigates to `/confirmation/:id`.
   
   - **Order Confirmation** (`/confirmation/:id` → `OrderConfirmation.jsx`):
     - Fetches order details via `getOrderById(id)` from `api.js`.
     - Displays order summary (items, total, status).
     - Option to view all orders or return to shop.

   - **View Orders**: Integrated into Bookings or separate; uses `getOrders()` for history.

### 2. Pathology Tests Booking Flow
   - **Browse Pathology** (`/pathology` → `Pathology.jsx`):
     - Fetches tests via `getPathologyTests()` from `api.js`.
     - Displays list using `<PathologyCard />` components (test name, price, description).
     - Booking form: User inputs details (e.g., name, date, test ID).
     - "Book Test" button calls `bookPathology(booking)` via `api.js`.
   
   - **View Bookings** (`/bookings` → `Bookings.jsx`):
     - Fetches all bookings via `getBookings()` from `api.js`.
     - Lists bookings (pathology/radiology/orders?) with details.
     - Delete button: Calls `deleteBooking(id)` via `api.js`.

### 3. Radiology Tests Booking Flow
   - Similar to Pathology:
     - **Browse Radiology** (`/radiology` → `Radiology.jsx`):
       - Fetches tests via `getRadiologyTests()` from `api.js`.
       - Displays using `<RadiologyCard />`.
       - Booking form calls `bookRadiology(booking)`.
     - Integrated into `/bookings` for management.

### 4. General Flows
   - **Error Handling**: Basic (e.g., fetch errors not explicitly handled; assume console logs or alerts).
   - **Loading States**: Not implemented in provided code; could add spinners via state.
   - **Search**: Only in Medicines (query param); extendable to others.
   - **Authentication**: None; assumes public access or session-based (not in code).
   - **Responsive Design**: Tailwind classes ensure mobile-friendliness (flex, space-x, etc.).

## API Integration Details (`api.js`)

All API calls target `http://localhost:5000/api` (backend server).

- **Medicines**:
  - GET `/medicines?search=query` → List with optional search.
  - POST `/orders` → Place order (body: { medicines, userInfo, total }).

- **Orders**:
  - GET `/orders` → User's orders.
  - GET `/orders/:id` → Specific order.

- **Pathology**:
  - GET `/tests/pathology` → List tests.
  - POST `/bookings/pathology` → Book (body: { testId, userInfo, date }).

- **Radiology**:
  - GET `/tests/radiology` → List tests.
  - POST `/bookings/radiology` → Book (similar to pathology).

- **Bookings**:
  - GET `/bookings` → All bookings.
  - DELETE `/bookings/:id` → Cancel booking.

Uses `fetch` with JSON headers; assumes backend handles auth/errors.

## Development and Running

1. **Install Dependencies**: `cd frontend && npm install`.
2. **Run Dev Server**: `npm run dev` (starts on http://localhost:5173).
3. **Build**: `npm run build` (outputs to `dist/`).
4. **Lint**: `npm run lint`.
5. **Backend Requirement**: Ensure backend runs on port 5000 for API calls.

## Potential Improvements
- Add authentication (JWT/login page).
- Implement loading/error states and toasts (e.g., react-hot-toast).
- Paginate lists for large datasets.
- Add user profiles for personalized bookings.
- Optimize images and add more assets.
- Unit tests for components/context.
- Integrate payments (e.g., Stripe for orders).

This covers the complete frontend flow. Refer to individual files for code details.
