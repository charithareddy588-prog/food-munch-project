import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

function Profile({
  user,
  setUser,
}) {
  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.removeItem(
      "foodMunchUser"
    );

    setUser(null);

    toast.success(
      "Logged out successfully."
    );

    navigate("/");
  };

  if (!user) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">

        <div className="text-7xl">
          👤
        </div>

        <h1 className="mt-5 text-3xl font-bold">
          Please Login
        </h1>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-orange-500 px-7 py-3 font-bold text-white"
        >
          Login
        </Link>

      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-12">

      <div className="rounded-2xl bg-white p-8 shadow dark:bg-gray-800">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 text-6xl">
            👤
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.firstName}{" "}
              {user.lastName}
            </h1>

            <p className="mt-2 text-gray-500">
              {user.email}
            </p>

            <p className="mt-2 text-gray-500">
              {user.phone}
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">

          <div className="rounded-xl bg-orange-50 p-6 dark:bg-gray-700">
            <p className="text-gray-500">
              Orders
            </p>

            <p className="mt-2 text-3xl font-bold">
              12
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 p-6 dark:bg-gray-700">
            <p className="text-gray-500">
              Favorites
            </p>

            <p className="mt-2 text-3xl font-bold">
              8
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 p-6 dark:bg-gray-700">
            <p className="text-gray-500">
              Reviews
            </p>

            <p className="mt-2 text-3xl font-bold">
              5
            </p>
          </div>

        </div>

        <button
          onClick={logout}
          className="mt-8 rounded-lg bg-red-500 px-7 py-3 font-bold text-white"
        >
          Logout
        </button>

      </div>

    </section>
  );
}

export default Profile;