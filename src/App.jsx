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
    popularItem: { name: "Chicken Biryani", price: 220 },
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
    popularItem: { name: "Cheese Burger", price: 180 },
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
    popularItem: { name: "Salmon Nigiri", price: 320 },
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
    popularItem: { name: "Margherita", price: 260 },
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
      r.popularItem.name.toLowerCase().includes(q)
    );
  }, [query]);

  const addToCart = (restaurant) => {
    setCart((prev) => {
      const id = `${restaurant.id}-${restaurant.popularItem.name}`;
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          id,
          name: `${restaurant.popularItem.name} • ${restaurant.name}`,
          price: restaurant.popularItem.price,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
