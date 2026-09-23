import { Link, useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { useApp } from "../context/AppContext";

function RestaurantDetails() {
  const { id } = useParams();

  const {
    restaurants,
    loading,
  } = useApp();

  const restaurant = restaurants.find(
    (item) => item.id === id
  );

  if (loading) {
    return (
      <div className="min-h-screen p-10 text-center">
        Loading restaurant...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen p-10 text-center">

        <h1 className="text-3xl font-bold">
          Restaurant not found
        </h1>

        <Link
          to="/restaurants"
          className="mt-5 inline-block rounded-xl bg-orange-500 px-6 py-3 text-white"
        >
          Back to Restaurants
        </Link>

      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Restaurant Header */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">

          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-72 w-full object-cover md:h-96"
          />

          <div className="p-6 md:p-8">

            <div className="flex flex-col justify-between gap-5 md:flex-row">

              <div>

                <p className="font-semibold text-orange-500">
                  {restaurant.cuisine}
                </p>

                <h1 className="mt-2 text-4xl font-extrabold">
                  {restaurant.name}
                </h1>

                <p className="mt-3 text-gray-500">
                  Delicious food prepared fresh for
                  you.
                </p>

              </div>

              <div className="flex gap-3">

                <div className="rounded-xl bg-green-100 px-5 py-3 text-center text-green-700">
                  <div className="font-bold">
                    ⭐ {restaurant.rating}
                  </div>

                  <div className="text-sm">
                    Rating
                  </div>
                </div>

                <div className="rounded-xl bg-orange-100 px-5 py-3 text-center text-orange-700">
                  <div className="font-bold">
                    🕒
                  </div>

                  <div className="text-sm">
                    {restaurant.deliveryTime}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Dishes */}
        <section className="mt-12">

          <h2 className="text-3xl font-bold">
            Menu
          </h2>

          <p className="mt-2 text-gray-500">
            {restaurant.dishes.length} dishes available
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {restaurant.dishes.map(
              (dish) => (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  restaurant={restaurant}
                />
              )
            )}

          </div>

        </section>

      </div>
    </main>
  );
}

export default RestaurantDetails;