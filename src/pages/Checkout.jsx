import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getDishPrice,
  useApp,
} from "../context/AppContext";

function Checkout() {
  const {
    cart,
    cartCount,
    cartTotal,
    clearCart,
    user,
    placeOrder,
  } = useApp();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      toast.error(
        "Please fill all delivery details"
      );
      return;
    }
    const newOrder = placeOrder(form);

    clearCart();

    toast.success(
      "Order placed successfully!"
    );

    navigate(`/track-order/${newOrder.id}`);
  }

  if (!user) {
    return (
      <main className="min-h-screen px-4 py-16">

        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow dark:bg-gray-900">

          <div className="text-5xl">
            🔐
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Login Required
          </h1>

          <p className="mt-3 text-gray-500">
            Please login to continue your order.
          </p>

          <div className="mt-6 flex gap-3">

            <Link
              to="/login"
              state={{ from: "/checkout" }}
              className="flex-1 rounded-xl bg-orange-500 py-3 font-bold text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="flex-1 rounded-xl border border-orange-500 py-3 font-bold text-orange-500"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen px-4 py-16">

        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow dark:bg-gray-900">

          <div className="text-5xl">
            🛒
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Your cart is empty
          </h1>

          <Link
            to="/restaurants"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
          >
            Browse Food
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <p className="font-bold text-orange-500">
          FOOD MUNCH
        </p>

        <h1 className="mt-2 text-4xl font-extrabold">
          Checkout
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Form */}
          <form
            onSubmit={handlePlaceOrder}
            className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
          >

            <h2 className="text-2xl font-bold">
              Delivery Details
            </h2>

            <div className="mt-6 space-y-5">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="4"
                placeholder="Delivery Address"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
              />

            </div>

            <h2 className="mt-8 text-xl font-bold">
              Payment Method
            </h2>

            <div className="mt-4 space-y-3">

              {[
                "Cash on Delivery",
                "UPI",
                "Credit / Debit Card",
              ].map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer gap-3 rounded-xl border p-4 dark:border-gray-700"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={
                      form.payment === method
                    }
                    onChange={handleChange}
                  />

                  <span>{method}</span>
                </label>
              ))}

            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"
            >
              Place Order • ₹
              {cartTotal.toFixed(0)}
            </button>

          </form>

          {/* Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {cart.map((item) => {

                const price =
                  getDishPrice(item);

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                      <div>

                        <p className="max-w-[170px] font-semibold">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          ₹{price} ×{" "}
                          {item.quantity}
                        </p>

                      </div>

                    </div>

                    <span className="font-bold">
                      ₹
                      {(
                        price *
                        item.quantity
                      ).toFixed(0)}
                    </span>

                  </div>
                );
              })}

            </div>

            <div className="mt-6 border-t pt-5 dark:border-gray-700">

              <div className="flex justify-between text-gray-500">
                <span>Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="mt-3 flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className="text-green-600">
                  FREE
                </span>
              </div>

              <div className="mt-5 flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-orange-500">
                  ₹{cartTotal.toFixed(0)}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default Checkout;