import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>

      {/* Hero */}
      <section className="overflow-hidden bg-orange-50 dark:bg-gray-900">

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <p className="font-bold uppercase tracking-widest text-orange-500">
              Welcome to Food Munch
            </p>

            <h1 className="mt-5 text-5xl font-extrabold leading-tight sm:text-6xl">
              Good food.
              <br />

              <span className="text-orange-500">
                Good mood.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover delicious dishes from
              restaurants around you and get
              your favorite food delivered to
              your doorstep.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/restaurants"
                className="rounded-xl bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Order Now
              </Link>

              <Link
                to="/restaurants"
                className="rounded-xl border border-orange-500 px-7 py-3 font-bold text-orange-500"
              >
                Explore Food
              </Link>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="flex justify-center"
          >
            <div className="text-[180px] sm:text-[240px]">
              🍔
            </div>
          </motion.div>

        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="text-center">
          <p className="font-semibold text-orange-500">
            EXPLORE
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            What are you craving?
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">

          {[
            ["🍕", "Pizza"],
            ["🍔", "Burgers"],
            ["🍗", "Biryani"],
            ["🍜", "Noodles"],
            ["🍰", "Desserts"],
            ["🥗", "Healthy"],
          ].map(
            ([icon, name]) => (
              <Link
                key={name}
                to="/restaurants"
                className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="text-5xl">
                  {icon}
                </div>

                <h3 className="mt-4 font-bold">
                  {name}
                </h3>
              </Link>
            )
          )}

        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800">

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">
            <p className="font-semibold text-orange-500">
              WHY FOOD MUNCH
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Everything you need
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {[
              [
                "⚡",
                "Fast Delivery",
                "Get your favorite food delivered quickly."
              ],
              [
                "🍽️",
                "Huge Selection",
                "Explore restaurants and dishes dynamically."
              ],
              [
                "❤️",
                "Easy Ordering",
                "Save favorites and manage your cart easily."
              ],
            ].map(
              ([icon, title, text]) => (
                <motion.div
                  key={title}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-2xl bg-white p-8 text-center shadow dark:bg-gray-900"
                >
                  <div className="text-5xl">
                    {icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {title}
                  </h3>

                  <p className="mt-3 text-gray-500">
                    {text}
                  </p>
                </motion.div>
              )
            )}

          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;