import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RestaurantCard from "./components/RestaurantCard";
import CartDrawer from "./components/CartDrawer";

const MOCK_RESTAURANTS = [
  {
    id: "res1",
    name: "Spice Route Biryani",
    rating: 4.5,
    time: 30,
    priceForTwo: 400,
    cuisines: ["Biryani", "North Indian", "Mughlai"],
    image:
      "https://images.unsplash.com/photo-1604908554049-1d995b80a21b?q=80&w=1470&auto=format&fit=crop",
    menu: [
      { id: "res1-1", name: "Chicken Biryani", price: 220, veg: false },
      { id: "res1-2", name: "Mutton Biryani", price: 280, veg: false },
      { id: "res1-3", name: "Veg Dum Biryani", price: 200, veg: true },
      { id: "res1-4", name: "Paneer 65", price: 180, veg: true },
      { id: "res1-5", name: "Raita", price: 40, veg: true },
    ],
  },
  {
    id: "res2",
    name: "Urban Burger Co.",
    rating: 4.3,
    time: 25,
    priceForTwo: 350,
    cuisines: ["Burgers", "Fast Food"],
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1470&auto=format&fit=crop",
    menu: [
      { id: "res2-1", name: "Classic Cheese Burger", price: 180, veg: false },
      { id: "res2-2", name: "Crispy Veg Burger", price: 140, veg: true },
      { id: "res2-3", name: "Peri Peri Fries", price: 120, veg: true },
      { id: "res2-4", name: "Chicken Nuggets (6)", price: 160, veg: false },
      { id: "res2-5", name: "Chocolate Shake", price: 150, veg: true },
    ],
  },
  {
    id: "res3",
    name: "Little Tokyo Sushi",
    rating: 4.7,
    time: 40,
    priceForTwo: 800,
    cuisines: ["Japanese", "Sushi"],
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1470&auto=format&fit=crop",
    menu: [
      { id: "res3-1", name: "Salmon Nigiri (6)", price: 320, veg: false },
      { id: "res3-2", name: "Avocado Maki (8)", price: 260, veg: true },
      { id: "res3-3", name: "Chicken Katsu Roll (8)", price: 340, veg: false },
      { id: "res3-4", name: "Edamame", price: 180, veg: true },
      { id: "res3-5", name: "Miso Soup", price: 120, veg: true },
    ],
  },
  {
    id: "res4",
    name: "La Pizzeria Napoletana",
    rating: 4.6,
    time: 35,
    priceForTwo: 600,
    cuisines: ["Italian", "Pizza"],
    image:
      "https://images.unsplash.com/photo-1548365328-8b6dbfaa1b9a?q=80&w=1470&auto=format&fit=crop",
    menu: [
      { id: "res4-1", name: "Margherita", price: 260, veg: true },
      { id: "res4-2", name: "Pepperoni", price: 320, veg: false },
      { id: "res4-3", name: "Four Cheese", price: 340, veg: true },
      { id: "res4-4", name: "Garlic Bread", price: 140, veg: true },
      { id: "res4-5", name: "Tiramisu", price: 180, veg: true },
    ],
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const filtered = useMemo(() => {
    if (!query.trim()) return MOCK_RESTAURANTS;
    const q = query.toLowerCase();
    return MOCK_RESTAURANTS.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisines.join(", ").toLowerCase().includes(q) ||
      r.menu.some((m) => m.name.toLowerCase().includes(q))
    );
  }, [query]);

  const addToCart = (item, restaurant) => {
    setCart((prev) => {
      const id = `${restaurant.id}-${item.id}`;
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          id,
          name: `${item.name} • ${restaurant.name}`,
          price: item.price,
          image: restaurant.image,
          qty: 1,
        },
      ];
    });
  };

  const increase = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decrease = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/40">
      <Navbar
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)}
        onCartClick={() => setCartOpen(true)}
        query={query}
        setQuery={setQuery}
        onSearch={setQuery}
      />

      <Hero query={query} setQuery={setQuery} onSearch={setQuery} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Popular near you</h2>
          <p className="text-sm text-gray-600">{filtered.length} restaurants</p>
        </div>

        <div className="space-y-6">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} data={r} onAdd={addToCart} />
          ))}
        </div>
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        total={total}
        onClose={() => setCartOpen(false)}
        onIncrease={increase}
        onDecrease={decrease}
        onRemove={remove}
      />

      <footer className="border-t bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} SwiftyEats • Built for quick food ordering</p>
          <p className="text-gray-500">Not affiliated with Swiggy. Demo UI only.</p>
        </div>
      </footer>
    </div>
  );
}
