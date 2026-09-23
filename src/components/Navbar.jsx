import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({
  cartCount,
  wishlistCount,
  darkMode,
  setDarkMode,
  openCart,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavStyle = ({ isActive }) => ({
    color: isActive
      ? "#f97316"
      : darkMode
      ? "#e5e7eb"
      : "#1f2937",
    fontWeight: 500,
    transition: "color 0.2s ease",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <span className="text-3xl">
            🍔
          </span>

          <span className="text-xl font-extrabold text-orange-500 sm:text-2xl">
            Food Munch
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          {/* Home */}
          <NavLink
            to="/"
            end
            style={getNavStyle}
            className="hover:text-orange-500"
          >
            Home
          </NavLink>

          {/* Restaurants */}
          <NavLink
            to="/restaurants"
            style={getNavStyle}
            className="hover:text-orange-500"
          >
            Restaurants
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            style={getNavStyle}
            className="hover:text-orange-500"
          >
            Profile
          </NavLink>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full bg-gray-100 px-3 py-2 dark:bg-gray-800"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Wishlist */}
          <Link
            to="/favorites"
            className="hidden text-lg transition-colors hover:text-orange-500 sm:block"
          >
            ♡ {wishlistCount}
          </Link>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative rounded-full bg-gray-100 px-3 py-2 text-xl dark:bg-gray-800"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </button>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500 dark:text-gray-200"
                }`
            }
          >
            Orders
          </NavLink>

          {/* Login */}
          <Link
            to="/login"
            className="hidden rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600 md:block"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl dark:text-white md:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t bg-white px-5 py-5 dark:border-gray-700 dark:bg-gray-900 md:hidden">

          <div className="flex flex-col gap-5">

            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              style={getNavStyle}
            >
              Home
            </NavLink>

            <NavLink
              to="/restaurants"
              onClick={() => setMenuOpen(false)}
              style={getNavStyle}
            >
              Restaurants
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              style={getNavStyle}
            >
              Profile
            </NavLink>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-orange-500 py-3 text-center font-semibold text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg border border-orange-500 py-3 text-center font-semibold text-orange-500"
            >
              Sign Up
            </Link>
            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="hover:text-orange-500"
            >
              My Orders
            </Link>

          </div>
        </div>
      )}

    </header>
  );
}

export default Navbar;