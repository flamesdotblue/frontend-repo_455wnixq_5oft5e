import { Star, Clock, Bike, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function RestaurantCard({ data, onAdd }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={data.image}
            alt={data.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute bottom-2 left-2 inline-flex items-center rounded-md bg-black/70 px-2 py-1 text-xs text-white gap-1">
            <Bike size={14} /> {data.time} mins
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{data.name}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-1">{data.cuisines.join(", ")}</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-md bg-green-600/10 px-2 py-1 text-xs font-medium text-green-700">
              <Star size={14} className="fill-green-600 text-green-600" />
              {data.rating}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
            <span className="inline-flex items-center gap-1">
              <Clock size={16} /> {data.time} mins
            </span>
            <span className="font-medium">₹{data.priceForTwo} for two</span>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-2 text-sm text-orange-700 hover:text-orange-800"
          >
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {open ? "Hide menu" : "Show menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-orange-50/30">
          <ul className="divide-y">
            {data.menu.map((item) => (
              <li key={item.id} className="flex items-center gap-3 p-4">
                <span
                  className={`h-3 w-3 rounded-sm border ${item.veg ? "border-green-600 bg-green-600/10" : "border-red-600 bg-red-600/10"}`}
                  aria-label={item.veg ? "Veg" : "Non-veg"}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-sm text-gray-700">₹{item.price}</p>
                </div>
                <button
                  onClick={() => onAdd?.(item, data)}
                  className="rounded-lg border border-orange-300 bg-white px-3 py-1.5 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
