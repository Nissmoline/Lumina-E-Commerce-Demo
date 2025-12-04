import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingCartIcon, StarIcon, PlusIcon } from '../components/Icons';

const categories = ['All', 'Accessories', 'Electronics', 'Apparel', 'Home', 'Travel'];

export const Storefront: React.FC = () => {
  const { products, addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-indigo-900 text-white mb-12 h-64 sm:h-80 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-800 to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/1200/400?grayscale" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="relative z-20 px-8 sm:px-12 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Summer Collection 2025</h1>
          <p className="text-indigo-200 text-lg mb-8">Discover our latest arrivals curated by AI for your unique style.</p>
          <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
            <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-slate-700 shadow-sm">
                <StarIcon className="w-3 h-3 text-amber-400" fill />
                {product.rating}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-2">
                <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">{product.category}</span>
                <h3 className="font-semibold text-slate-900 text-lg leading-tight mt-1 mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{product.description}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-indigo-600 transition-colors active:scale-95"
                  aria-label="Add to cart"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};