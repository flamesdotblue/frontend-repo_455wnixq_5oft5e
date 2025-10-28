export default function CartDrawer({ open, items, total, onClose, onIncrease, onDecrease, onRemove }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">Close</button>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-600">Your cart is empty</div>
        ) : (
          <div className="flex h-[calc(100%-64px)] flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <img src={it.image} alt={it.name} className="h-14 w-14 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{it.name}</p>
                    <p className="text-sm text-gray-600">₹{it.price} • Qty {it.qty}</p>
                    <div className="mt-2 inline-flex items-center gap-2">
                      <button onClick={() => onDecrease(it.id)} className="h-7 w-7 rounded border hover:bg-gray-50">-</button>
                      <span className="min-w-[1.5rem] text-center">{it.qty}</span>
                      <button onClick={() => onIncrease(it.id)} className="h-7 w-7 rounded border hover:bg-gray-50">+</button>
                      <button onClick={() => onRemove(it.id)} className="ml-2 text-sm text-red-600 hover:underline">Remove</button>
                    </div>
                  </div>
                  <div className="font-semibold">₹{it.price * it.qty}</div>
                </div>
              ))}
            </div>
            <div className="border-t p-4 space-y-3">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">₹{total}</span>
              </div>
              <button className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
