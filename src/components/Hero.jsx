import { Search } from "lucide-react";

export default function Hero({ query, setQuery, onSearch }) {
  const tags = ["Pizza", "Burger", "Biryani", "Sushi", "Salad", "Desserts"]; 
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="rounded-2xl bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 p-6 md:p-10 border border-orange-100">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Hungry? Order from the best restaurants near you
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Swift delivery, real ratings, and the widest choice of cuisines.
          </p>

          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery?.(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Search dishes, restaurants, cuisines..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setQuery?.(t);
                  onSearch?.(t);
                }}
                className="px-3 py-1.5 text-sm rounded-full border border-orange-200 bg-white hover:bg-orange-50 text-orange-700"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
