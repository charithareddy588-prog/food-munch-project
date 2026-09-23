import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useApp } from "../context/AppContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useApp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      /*
        STEP 1
        Check account created through Signup
      */

      const savedUsers = JSON.parse(
        localStorage.getItem("foodMunchUsers") || "[]"
      );

      const localUser = savedUsers.find(
        (user) =>
          user.email.toLowerCase() === email &&
          user.password === password
      );

      if (localUser) {
        login({
          id: localUser.id,
          name: localUser.name,
          email: localUser.email,
        });

        toast.success("Login successful!");

        const destination =
          location.state?.from || "/";

        navigate(destination, {
          replace: true,
        });

        return;
      }

      /*
        STEP 2
        If it isn't a locally created account,
        try DummyJSON demo login.
      */

      try {
        const response = await axios.post(
          "https://dummyjson.com/auth/login",
          {
            username: email,
            password: password,
            expiresInMins: 30,
          }
        );

        const apiUser = response.data;

        login({
          id: apiUser.id,
          name:
            apiUser.firstName ||
            apiUser.username ||
            "User",
          email:
            apiUser.email ||
            apiUser.username ||
            email,
          username: apiUser.username,
          image: apiUser.image,
        });

        toast.success("Login successful!");

        const destination =
          location.state?.from || "/";

        navigate(destination, {
          replace: true,
        });

      } catch {
        toast.error(
          "Invalid email or password"
        );
      }

    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">

      <div className="mx-auto max-w-md">

        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900">

          {/* Heading */}
          <div className="text-center">

            <div className="text-5xl">
              🍔
            </div>

            <h1 className="mt-4 text-3xl font-extrabold">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-500">
              Login to your Food Munch account
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default Login;