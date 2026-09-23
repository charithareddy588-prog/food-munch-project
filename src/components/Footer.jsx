import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">

        <div>
          <h2 className="text-2xl font-extrabold text-orange-500">
            🍔 Food Munch
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Delicious food from your favorite
            restaurants delivered directly to
            your doorstep.
          </p>
        </div>

        <div>
          <h3 className="font-bold">
            Navigation
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-gray-400">

            <Link to="/">
              Home
            </Link>

            <Link to="/restaurants">
              Restaurants
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <Link to="/cart">
              Cart
            </Link>

          </div>
        </div>

        <div>
          <h3 className="font-bold">
            Account
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-gray-400">

            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Sign Up
            </Link>

            <Link to="/profile">
              My Profile
            </Link>

            <Link to="/checkout">
              Checkout
            </Link>

          </div>
        </div>

        <div>
          <h3 className="font-bold">
            Follow Food Munch
          </h3>

          <div className="mt-5 flex gap-3">

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              f
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              ◎
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              X
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              in
            </span>

          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © 2026 Food Munch. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;