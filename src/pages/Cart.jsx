import { Link } from "react-router-dom";
import {
  getDishPrice,
  useApp,
} from "../context/AppContext";

function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useApp();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <p className="font-bold text-orange-500">
          FOOD MUNCH
        </p>

        <h1 className="mt-2 text-4xl font-extrabold">
          Your Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Your cart is empty
            </h2>

            <Link
              to="/restaurants"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
            >
              Browse Restaurants
            </Link>

          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* Items */}
            <div className="space-y-4">

              {cart.map((item) => {

                const price =
                  getDishPrice(item);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">

                      <div>

                        <h2 className="font-bold">
                          {item.name}
                        </h2>

                        <p className="mt-1 font-semibold text-orange-500">
                          ₹{price}
                        </p>

                      </div>

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              decreaseQty(
                                item.id
                              )
                            }
                            className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800"
                          >
                            −
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(
                                item.id
                              )
                            }
                            className="h-8 w-8 rounded-full bg-orange-500 text-white"
                          >
                            +
                          </button>

                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="text-sm font-semibold text-red-500"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-gray-500">
                  <span>Items</span>
                  <span>{cartCount}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <div className="border-t pt-5 dark:border-gray-700">

                  <div className="flex justify-between text-2xl font-bold">

                    <span>Total</span>

                    <span className="text-orange-500">
                      ₹{cartTotal.toFixed(0)}
                    </span>

                  </div>

                </div>

              </div>

              <Link
                to="/checkout"
                className="mt-6 block rounded-xl bg-orange-500 py-3 text-center font-bold text-white"
              >
                Proceed to Checkout
              </Link>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;