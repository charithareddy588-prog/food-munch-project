import { Link } from "react-router-dom";

import FoodCard from "../components/FoodCard";

import { useApp } from "../context/AppContext";

function Favorites() {
  const {
    recipes,
    wishlist,
    restaurants,
    loading,
  } = useApp();

  const favouriteDishes =
    recipes.filter((recipe) =>
      wishlist.includes(recipe.id)
    );

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <p className="font-bold text-orange-500">
          FOOD MUNCH
        </p>

        <h1 className="mt-2 text-4xl font-extrabold">
          My Favourites ❤️
        </h1>

        <p className="mt-2 text-gray-500">
          Your saved favourite dishes
        </p>

        {loading ? (
          <div className="mt-10 text-center">
            Loading...
          </div>
        ) : favouriteDishes.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center dark:bg-gray-900">

            <div className="text-6xl">
              ♡
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No favourites yet
            </h2>

            <p className="mt-2 text-gray-500">
              Click the heart on a dish to save it.
            </p>

            <Link
              to="/restaurants"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
            >
              Explore Food
            </Link>

          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {favouriteDishes.map((dish) => {

              const restaurant =
                restaurants.find(
                  (item) =>
                    item.cuisine ===
                    dish.cuisine
                );

              return (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  restaurant={restaurant}
                />
              );
            })}

          </div>
        )}

      </div>

    </main>
  );
}

export default Favorites;