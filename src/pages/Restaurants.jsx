import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";
import SkeletonCard from "../components/SkeletonCard";

import { useApp } from "../context/AppContext";

function Restaurants() {
  const {
    restaurants,
    recipes,
    loading,
  } = useApp();

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [cuisine, setCuisine] =
    useState("All");

  const [rating, setRating] =
    useState("All");

  const [sort, setSort] =
    useState("Popular");

  const cuisines = useMemo(() => {
    return [
      "All",
      ...new Set(
        restaurants.map(
          (restaurant) =>
            restaurant.cuisine
        )
      ),
    ];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = restaurants.filter(
      (restaurant) => {
        const searchText =
          search.toLowerCase().trim();

        const matchesSearch =
          !searchText ||
          restaurant.name
            .toLowerCase()
            .includes(searchText) ||
          restaurant.cuisine
            .toLowerCase()
            .includes(searchText) ||
          restaurant.dishes.some(
            (dish) =>
              dish.name
                .toLowerCase()
                .includes(searchText)
          );

        const matchesCuisine =
          cuisine === "All" ||
          restaurant.cuisine === cuisine;

        const matchesRating =
          rating === "All" ||
          (rating === "4+" &&
            restaurant.rating >= 4) ||
          (rating === "4.5+" &&
            restaurant.rating >= 4.5);

        return (
          matchesSearch &&
          matchesCuisine &&
          matchesRating
        );
      }
    );

    if (sort === "Rating") {
      result.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    if (sort === "Fastest") {
      result.sort(
        (a, b) =>
          parseInt(a.deliveryTime) -
          parseInt(b.deliveryTime)
      );
    }

    return result;
  }, [
    restaurants,
    search,
    cuisine,
    rating,
    sort,
  ]);

  const popularDishes = recipes.filter(
    (dish) =>
      !search ||
      dish.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <p className="font-bold text-orange-500">
          FOOD MUNCH
        </p>

        <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
          Restaurants & Food
        </h1>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Discover restaurants and delicious
          dishes dynamically loaded from our food API.
        </p>

        {/* Search */}
        <div className="mt-8">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search restaurants, dishes or cuisines..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900"
          />

        </div>

        {/* Cuisine */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-3">

          {cuisines.map((item) => (
            <button
              key={item}
              onClick={() =>
                setCuisine(item)
              }
              className={`whitespace-nowrap rounded-full px-6 py-3 ${
                cuisine === item
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Rating + Sort */}
        <div className="mt-4 flex flex-wrap gap-3">

          {["All", "4+", "4.5+"].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setRating(item)
                }
                className={`rounded-xl border px-5 py-2.5 ${
                  rating === item
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {item === "All"
                  ? "All Ratings"
                  : `${item} Rating`}
              </button>
            )
          )}

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="Popular">
              Popular
            </option>

            <option value="Rating">
              Highest Rating
            </option>

            <option value="Fastest">
              Fastest Delivery
            </option>
          </select>

        </div>

        {/* Restaurants */}
        <section className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Restaurants
            </h2>

            <span className="text-gray-500">
              {filteredRestaurants.length} restaurants
            </span>

          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map(
                (_, index) => (
                  <SkeletonCard
                    key={index}
                  />
                )
              )}
            </div>
          ) : filteredRestaurants.length ===
            0 ? (
            <div className="rounded-2xl bg-white p-10 text-center dark:bg-gray-900">
              No restaurants found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredRestaurants.map(
                (restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                )
              )}

            </div>
          )}

        </section>

        {/* Dishes */}
        <section className="mt-16">

          <h2 className="text-2xl font-bold">
            All Dishes
          </h2>

          <p className="mt-2 text-gray-500">
            Explore dishes from the API.
          </p>

          {!loading && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {popularDishes.map(
                (dish) => {

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
                }
              )}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default Restaurants;