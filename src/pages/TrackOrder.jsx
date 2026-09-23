import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

function TrackOrder() {
  const { id } = useParams();

  const { orders, updateOrderStatus } = useApp();

  const order = orders.find(
    (item) => item.id === id
  );

  const [currentStep, setCurrentStep] = useState(0);

  const trackingSteps = [
    {
      title: "Order Placed",
      description: "Your order has been received.",
      icon: "📝",
    },
    {
      title: "Confirmed",
      description: "Restaurant has confirmed your order.",
      icon: "✅",
    },
    {
      title: "Preparing",
      description: "Your food is being prepared.",
      icon: "👨‍🍳",
    },
    {
      title: "Out for Delivery",
      description: "Your order is on its way.",
      icon: "🛵",
    },
    {
      title: "Delivered",
      description: "Your order has been delivered.",
      icon: "🎉",
    },
  ];

  /*
   * Automatically move to the next status
   * every 5 seconds.
   */
  useEffect(() => {
    if (!order) {
      return;
    }

    const savedStep =
      Number(
        localStorage.getItem(
          `orderStep_${order.id}`
        )
      ) || 0;

    setCurrentStep(savedStep);

    if (savedStep >= trackingSteps.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      const nextStep = savedStep + 1;

      setCurrentStep(nextStep);

      localStorage.setItem(
        `orderStep_${order.id}`,
        nextStep.toString()
      );

      updateOrderStatus(
        order.id,
        trackingSteps[nextStep].title,
        nextStep
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [order, currentStep]);

  if (!order) {
    return (
      <main className="min-h-screen px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow dark:bg-gray-900">

          <div className="text-5xl">
            📦
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Order Not Found
          </h1>

          <Link
            to="/orders"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
          >
            My Orders
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to="/orders"
          className="font-semibold text-orange-500"
        >
          ← Back to My Orders
        </Link>

        {/* Heading */}
        <div className="mt-6">

          <p className="font-bold text-orange-500">
            FOOD MUNCH
          </p>

          <h1 className="mt-2 text-4xl font-extrabold">
            Track Your Order
          </h1>

          <p className="mt-2 text-gray-500">
            Order #{order.id}
          </p>

        </div>

        {/* Current Status */}
        <div className="mt-8 rounded-3xl bg-orange-500 p-7 text-white shadow-lg">

          <p className="text-sm opacity-80">
            Current Status
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            {trackingSteps[currentStep].title}
          </h2>

          <p className="mt-2">
            {trackingSteps[currentStep].description}
          </p>

          {currentStep < trackingSteps.length - 1 && (
            <p className="mt-4 text-sm opacity-80">
              Next update in 5 seconds...
            </p>
          )}

          {currentStep === trackingSteps.length - 1 && (
            <p className="mt-4 font-semibold">
              🎉 Your order has been delivered!
            </p>
          )}

        </div>

        {/* Progress Bar */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

          <h2 className="text-2xl font-bold">
            Order Progress
          </h2>

          <div className="mt-8">

            {trackingSteps.map(
              (step, index) => {

                const completed =
                  index <= currentStep;

                const active =
                  index === currentStep;

                return (
                  <div
                    key={step.title}
                    className="relative flex gap-5 pb-10 last:pb-0"
                  >

                    {/* Connecting Line */}
                    {index <
                      trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-5 top-11 h-full w-1 transition-all duration-1000 ${
                          index < currentStep
                            ? "bg-orange-500"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    )}

                    {/* Circle */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-all duration-700 ${
                        completed
                          ? "scale-110 bg-orange-500 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                      } ${
                        active
                          ? "ring-4 ring-orange-200 dark:ring-orange-900"
                          : ""
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Text */}
                    <div className="pt-1">

                      <h3
                        className={`text-lg font-bold transition-colors ${
                          completed
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {step.description}
                      </p>

                      {active && (
                        <p className="mt-2 text-sm font-semibold text-orange-500">
                          ● Current Status
                        </p>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* Delivery Details */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

          <h2 className="text-2xl font-bold">
            Delivery Details
          </h2>

          <div className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

            <p>
              <strong>Name:</strong>{" "}
              {order.deliveryDetails.name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.deliveryDetails.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.deliveryDetails.address}
            </p>

            <p>
              <strong>City:</strong>{" "}
              {order.deliveryDetails.city}
            </p>

            <p>
              <strong>Pincode:</strong>{" "}
              {order.deliveryDetails.pincode}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

          </div>

        </div>

        {/* Ordered Items */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

          <h2 className="text-2xl font-bold">
            Ordered Items
          </h2>

          <div className="mt-5 space-y-4">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-3">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>

                    <p className="font-bold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>

                  </div>

                </div>

                <p className="font-bold">
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(0)}
                </p>

              </div>
            ))}

          </div>

          <div className="mt-6 flex justify-between border-t pt-5 text-xl font-bold dark:border-gray-700">

            <span>
              Total
            </span>

            <span className="text-orange-500">
              ₹{Number(order.total).toFixed(0)}
            </span>

          </div>

        </div>

      </div>

    </main>
  );
}

export default TrackOrder;