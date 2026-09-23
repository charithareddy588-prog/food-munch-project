import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext(null);

const CART_KEY = "foodMunchCartV2";
const WISHLIST_KEY = "foodMunchWishlist";
const USER_KEY = "foodMunchUser";
const THEME_KEY = "foodMunchTheme";
const ORDERS_KEY = "foodMunchOrders";

/* --------------------------------
   Price for every API recipe
--------------------------------- */
export function getDishPrice(dish) {
  const existingPrice = Number(dish?.price);

  if (Number.isFinite(existingPrice) && existingPrice > 0) {
    return existingPrice;
  }

  const id = Number(dish?.id) || 1;

  return 149 + ((id * 37) % 350);
}

/* --------------------------------
   Safe localStorage
--------------------------------- */
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/* --------------------------------
   Create restaurants dynamically
--------------------------------- */
function createRestaurants(recipes) {
  const grouped = {};

  recipes.forEach((recipe) => {
    const cuisine = recipe.cuisine || "International";

    if (!grouped[cuisine]) {
      grouped[cuisine] = [];
    }

    grouped[cuisine].push({
      ...recipe,
      price: getDishPrice(recipe),
    });
  });

  const types = ["Kitchen", "Express", "House"];

  return Object.entries(grouped).flatMap(([cuisine, dishes]) =>
    types.map((type, index) => ({
      id: `${cuisine
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,

      name: `${cuisine} ${type}`,

      cuisine,

      rating: Number((4.2 + index * 0.2).toFixed(1)),

      deliveryTime:
        index === 0
          ? "20-25 min"
          : index === 1
          ? "25-30 min"
          : "30-35 min",

      image:
        dishes[index % dishes.length]?.image ||
        dishes[0]?.image,

      dishes,
    }))
  );
}

/* --------------------------------
   Provider
--------------------------------- */
export function AppProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  /* --------------------------------
     Cart
  --------------------------------- */
  const [cart, setCart] = useState(() => {
    const oldCart = readStorage(CART_KEY, []);

    return oldCart.map((item) => ({
      ...item,
      price: getDishPrice(item),
      quantity:
        Number(item.quantity) > 0
          ? Number(item.quantity)
          : 1,
    }));
  });

  /* --------------------------------
     Wishlist
  --------------------------------- */
  const [wishlist, setWishlist] = useState(() =>
    readStorage(WISHLIST_KEY, [])
  );

  /* --------------------------------
     User
  --------------------------------- */
  const [user, setUser] = useState(() =>
    readStorage(USER_KEY, null)
  );

  /* --------------------------------
     Theme
  --------------------------------- */
  const [darkMode, setDarkMode] = useState(() =>
    readStorage(THEME_KEY, false)
  );

  /* --------------------------------
     Cart Sidebar
  --------------------------------- */
  const [cartOpen, setCartOpen] = useState(false);

  /* --------------------------------
     Orders
  --------------------------------- */
  const [orders, setOrders] = useState(() =>
    readStorage(ORDERS_KEY, [])
  );

  /* --------------------------------
     Fetch API
  --------------------------------- */
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://dummyjson.com/recipes?limit=0"
        );

        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to load restaurants and food"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  /* --------------------------------
     Save cart
  --------------------------------- */
  useEffect(() => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );
  }, [cart]);

  /* --------------------------------
     Save favourites
  --------------------------------- */
  useEffect(() => {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  /* --------------------------------
     Save user
  --------------------------------- */
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  /* --------------------------------
     Save orders
  --------------------------------- */
  useEffect(() => {
    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(orders)
    );
  }, [orders]);

  /* --------------------------------
     Dark mode
  --------------------------------- */
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      THEME_KEY,
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  /* --------------------------------
     Restaurants
  --------------------------------- */
  const restaurants = useMemo(() => {
    return createRestaurants(recipes);
  }, [recipes]);

  /* --------------------------------
     Add to cart
  --------------------------------- */
  function addToCart(dish, restaurant) {
    const price = getDishPrice(dish);

    setCart((current) => {
      const existing = current.find(
        (item) => item.id === dish.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                price,
                quantity: Number(item.quantity) + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          id: dish.id,
          name: dish.name,
          image: dish.image,
          price,
          quantity: 1,
          cuisine: dish.cuisine,
          restaurantId: restaurant?.id || "",
          restaurantName:
            restaurant?.name || "Food Munch",
        },
      ];
    });

    toast.success("Added to cart");
  }

  /* --------------------------------
     Increase quantity
  --------------------------------- */
  function increaseQty(id) {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity) + 1,
            }
          : item
      )
    );
  }

  /* --------------------------------
     Decrease quantity
  --------------------------------- */
  function decreaseQty(id) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Number(item.quantity) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  /* --------------------------------
     Remove from cart
  --------------------------------- */
  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );

    toast.success("Removed from cart");
  }

  /* --------------------------------
     Clear cart
  --------------------------------- */
  function clearCart() {
    setCart([]);
  }

  /* --------------------------------
     Wishlist
  --------------------------------- */
  function toggleWishlist(id) {
    setWishlist((current) => {
      if (current.includes(id)) {
        toast.success("Removed from favourites");

        return current.filter(
          (itemId) => itemId !== id
        );
      }

      toast.success("Added to favourites");

      return [...current, id];
    });
  }

  function isWishlisted(id) {
    return wishlist.includes(id);
  }

  /* --------------------------------
     Login
  --------------------------------- */
  function login(userData) {
    setUser(userData);

    toast.success(
      `Welcome ${userData.name || "User"}!`
    );
  }

  /* --------------------------------
     Logout
  --------------------------------- */
  function logout() {
    setUser(null);

    toast.success("Logged out successfully");
  }

  /* --------------------------------
     Cart count
  --------------------------------- */
  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /* --------------------------------
     Cart total
  --------------------------------- */
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = getDishPrice(item);
      const quantity = Number(item.quantity) || 0;

      return total + price * quantity;
    }, 0);
  }, [cart]);

  /* --------------------------------
     PLACE ORDER
  --------------------------------- */
  function placeOrder(orderDetails) {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return null;
    }

    const newOrder = {
      id: `FM${Date.now()}`,

      orderDate: new Date().toISOString(),

      status: "Order Placed",

      items: cart.map((item) => ({
        ...item,
        price: getDishPrice(item),
        quantity: Number(item.quantity) || 1,
      })),

      total: Number(cartTotal),

      deliveryDetails: {
        name: orderDetails.name,
        phone: orderDetails.phone,
        address: orderDetails.address,
        city: orderDetails.city,
        pincode: orderDetails.pincode,
      },

      paymentMethod: orderDetails.payment,

      tracking: {
        placed: true,
        confirmed: false,
        preparing: false,
        outForDelivery: false,
        delivered: false,
      },
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    setCart([]);

    toast.success("Order placed successfully!");

    return newOrder;
  }

  /* --------------------------------
     UPDATE ORDER STATUS
     
     IMPORTANT:
     This function must be INSIDE
     AppProvider because it uses setOrders.
  --------------------------------- */
  function updateOrderStatus(
    orderId,
    status,
    step
  ) {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        return {
          ...order,

          status,

          tracking: {
            placed: step >= 0,
            confirmed: step >= 1,
            preparing: step >= 2,
            outForDelivery: step >= 3,
            delivered: step >= 4,
          },
        };
      })
    );
  }

  /* --------------------------------
     Value
  --------------------------------- */
  const value = {
    recipes,
    restaurants,
    loading,

    cart,
    cartCount,
    cartTotal,

    wishlist,
    wishlistCount: wishlist.length,

    user,

    darkMode,
    setDarkMode,

    cartOpen,
    setCartOpen,

    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,

    toggleWishlist,
    isWishlisted,

    login,
    logout,

    /* ORDERS */
    orders,
    placeOrder,
    updateOrderStatus,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/* --------------------------------
   useApp
--------------------------------- */
export function useApp() {
  return useContext(AppContext);
}