import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function RestaurantCard({ restaurant }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900"
    >

      <Link
        to={`/restaurants/${restaurant.id}`}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-52 w-full object-cover"
        />

        <div className="p-5">

          <div className="flex items-start justify-between gap-3">

            <div>
              <h2 className="text-xl font-bold dark:text-white">
                {restaurant.name}
              </h2>

              <p className="mt-1 text-gray-500">
                {restaurant.cuisine}
              </p>
            </div>

            <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-bold text-green-700">
              ⭐ {restaurant.rating}
            </span>

          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-500">

            <span>
              🕒 {restaurant.deliveryTime}
            </span>

            <span>
              {restaurant.dishes.length} dishes
            </span>

          </div>

        </div>
      </Link>

    </motion.div>
  );
}

export default RestaurantCard;