import { Star, Clock, Bike } from "lucide-react";

export default function RestaurantCard({ data, onAdd }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
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
          <h3 className="font-semibold text-gray-900 line-clamp-1">{data.name}</h3>
          <div className="inline-flex items-center gap-1 rounded-md bg-green-600/10 px-2 py-1 text-xs font-medium text-green-700">
            <Star size={14} className="fill-green-600 text-green-600" />
            {data.rating}
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-1">{data.cuisines.join(", ")}</p>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
          <span className="inline-flex items-center gap-1">
            <Clock size={16} /> {data.time} mins
          </span>
          <span className="font-medium">₹{data.priceForTwo} for two</span>
        </div>
        <button
          onClick={() => onAdd?.(data)}
          className="mt-4 w-full rounded-lg bg-orange-600 text-white py-2 text-sm font-semibold hover:bg-orange-700"
        >
          Add popular item
        </button>
      </div>
    </div>
  );
}
