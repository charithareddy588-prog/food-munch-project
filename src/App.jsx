import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AppProvider, useApp } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";

function AppContent() {
  const {
    cartCount,
    wishlistCount,
    darkMode,
    setDarkMode,
    cartOpen,
    setCartOpen,
  } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openCart={() => setCartOpen(true)}
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        {/* Both paths work */}
        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />

        <Route
          path="/restaurants/:id"
          element={<RestaurantDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/track-order/:id"
          element={<TrackOrder />}
        />

      </Routes>

      <Footer />

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;