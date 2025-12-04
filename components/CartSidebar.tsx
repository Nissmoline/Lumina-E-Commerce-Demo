import React from 'react';
import { useShop } from '../context/ShopContext';
import { XIcon, TrashIcon } from './Icons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, total } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-slideIn">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Shopping Cart</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button 
                          className="px-2 py-1 hover:bg-slate-50 text-slate-600"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >-</button>
                        <span className="px-2 text-sm text-slate-900">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 hover:bg-slate-50 text-slate-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 p-6 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
            </div>
            <button 
              disabled={cart.length === 0}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
              onClick={() => alert("Simulating checkout... In a real app, this would connect to Stripe.")}
            >
              Checkout
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              Secure checkout powered by Stripe (Mock)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};