import { motion } from "framer-motion";
import {
  getDishPrice,
  useApp,
} from "../context/AppContext";

function FoodCard({ dish, restaurant }) {
  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    toggleWishlist,
    isWishlisted,
  } = useApp();

  const cartItem = cart.find(
    (item) => item.id === dish.id
  );

  const price = getDishPrice(dish);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900"
    >

      <div className="relative">

        <img
          src={dish.image}
          alt={dish.name}
          className="h-52 w-full object-cover"
        />

        <button
          onClick={() =>
            toggleWishlist(dish.id)
          }
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow dark:bg-gray-900"
        >
          {isWishlisted(dish.id)
            ? "♥"
            : "♡"}
        </button>

      </div>

      <div className="p-5">

        <p className="text-sm font-medium text-orange-500">
          {dish.cuisine}
        </p>

        <h3 className="mt-1 line-clamp-2 text-lg font-bold dark:text-white">
          {dish.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xl font-bold text-orange-500">
            ₹{price}
          </span>

          {cartItem ? (
            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  decreaseQty(dish.id)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg dark:bg-gray-800"
              >
                −
              </button>

              <span className="font-bold dark:text-white">
                {cartItem.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQty(dish.id)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-lg text-white"
              >
                +
              </button>

            </div>
          ) : (
            <button
              onClick={() =>
                addToCart(dish, restaurant)
              }
              className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Add
            </button>
          )}

        </div>

      </div>
    </motion.div>
  );
}

export default FoodCard;