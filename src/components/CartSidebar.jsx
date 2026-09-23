import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  getDishPrice,
  useApp,
} from "../context/AppContext";

function CartSidebar({ open, onClose }) {
  const {
    cart,
    cartTotal,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useApp();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-[70] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl dark:bg-gray-900"
          >

            {/* Header */}
            <div className="flex items-center justify-between border-b p-5 dark:border-gray-700">

              <h2 className="text-xl font-bold">
                Your Cart 🛒
              </h2>

              <button
                onClick={onClose}
                className="text-2xl"
              >
                ×
              </button>

            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">

              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">

                  <div className="text-6xl">
                    🛒
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Add delicious food to continue.
                  </p>

                  <Link
                    to="/restaurants"
                    onClick={onClose}
                    className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
                  >
                    Browse Food
                  </Link>

                </div>
              ) : (
                <div className="space-y-4">

                  {cart.map((item) => {

                    const price =
                      getDishPrice(item);

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border p-3 dark:border-gray-700"
                      >

                        <div className="flex gap-3">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />

                          <div className="flex-1">

                            <h3 className="font-semibold">
                              {item.name}
                            </h3>

                            <p className="mt-1 font-bold text-orange-500">
                              ₹{price}
                            </p>

                            <div className="mt-2 flex items-center gap-2">

                              <button
                                onClick={() =>
                                  decreaseQty(
                                    item.id
                                  )
                                }
                                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800"
                              >
                                −
                              </button>

                              <span>
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQty(
                                    item.id
                                  )
                                }
                                className="h-7 w-7 rounded-full bg-orange-500 text-white"
                              >
                                +
                              </button>

                            </div>

                          </div>

                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="mt-3 text-sm font-semibold text-red-500"
                        >
                          Remove
                        </button>

                      </div>
                    );
                  })}

                </div>
              )}

            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-5 dark:border-gray-700">

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span className="text-orange-500">
                    ₹{cartTotal.toFixed(0)}
                  </span>

                </div>

                <Link
                  to="/cart"
                  onClick={onClose}
                  className="mt-4 block rounded-xl border border-orange-500 py-3 text-center font-semibold text-orange-500"
                >
                  View Cart
                </Link>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="mt-3 block rounded-xl bg-orange-500 py-3 text-center font-bold text-white"
                >
                  Proceed to Checkout
                </Link>

              </div>
            )}

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;