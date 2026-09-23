import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Orders() {
  const { orders } = useApp();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <p className="font-bold text-orange-500">
          FOOD MUNCH
        </p>

        <h1 className="mt-2 text-4xl font-extrabold">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View your previous orders and track
          your current delivery.
        </p>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">

            <div className="text-6xl">
              📦
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your placed orders will appear here.
            </p>

            <Link
              to="/restaurants"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
            >
              Order Food
            </Link>

          </div>
        ) : (
          <div className="mt-10 space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      #{order.id}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(
                        order.orderDate
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-sm text-gray-500">
                      Order Status
                    </p>

                    <p className="mt-1 font-bold text-orange-500">
                      {order.status}
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      ₹{Number(order.total).toFixed(0)}
                    </p>

                  </div>

                </div>

                {/* Items */}
                <div className="mt-6 border-t pt-5 dark:border-gray-700">

                  <div className="flex flex-wrap gap-4">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex items-center gap-3"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />

                        <div>

                          <p className="font-semibold">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Track */}
                <Link
                  to={`/track-order/${order.id}`}
                  className="mt-6 block rounded-xl bg-orange-500 py-3 text-center font-bold text-white hover:bg-orange-600"
                >
                  Track Order
                </Link>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}

export default Orders;