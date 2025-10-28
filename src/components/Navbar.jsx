import { ShoppingCart, MapPin, Search } from "lucide-react";

export default function Navbar({ cartCount = 0, onCartClick, onSearch, query, setQuery }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">🍽️</span>
          <span className="tracking-tight">SwiftyEats</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-gray-700">
          <MapPin size={18} className="text-orange-600" />
          <span className="text-sm">Deliver to</span>
          <button className="font-medium hover:text-gray-900">Current Location</button>
        </div>

        <div className="flex-1" />

        <div className="relative hidden md:block w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery?.(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search for restaurants, cuisines or dishes"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          onClick={onCartClick}
          className="ml-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
