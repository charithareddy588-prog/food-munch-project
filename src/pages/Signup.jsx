import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSignup(e) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name || !email || !password || !form.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    if (password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    /* Get existing registered users */
    const existingUsers = JSON.parse(
      localStorage.getItem("foodMunchUsers") || "[]"
    );

    /* Check duplicate email */
    const userAlreadyExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email
    );

    if (userAlreadyExists) {
      toast.error("An account with this email already exists");
      return;
    }

    /* Create new user */
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    /* Save user */
    const updatedUsers = [
      ...existingUsers,
      newUser,
    ];

    localStorage.setItem(
      "foodMunchUsers",
      JSON.stringify(updatedUsers)
    );

    toast.success("Account created successfully!");

    /* Go to login */
    navigate("/login");
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
              Create Account
            </h1>

            <p className="mt-2 text-gray-500">
              Join Food Munch today
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

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
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white transition hover:bg-orange-600"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default Signup;