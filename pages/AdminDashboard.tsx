import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { generateProductDescription } from '../services/geminiService';
import { SparklesIcon, TrashIcon, BarChartIcon, PlusIcon } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SALES_DATA = [
  { name: 'Mon', sales: 4000, visitors: 2400 },
  { name: 'Tue', sales: 3000, visitors: 1398 },
  { name: 'Wed', sales: 2000, visitors: 9800 },
  { name: 'Thu', sales: 2780, visitors: 3908 },
  { name: 'Fri', sales: 1890, visitors: 4800 },
  { name: 'Sat', sales: 2390, visitors: 3800 },
  { name: 'Sun', sales: 3490, visitors: 4300 },
];

export const AdminDashboard: React.FC = () => {
  const { products, addProduct, deleteProduct } = useShop();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory'>('overview');
  
  // New Product State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Accessories',
    features: ''
  });
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!newProduct.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category, newProduct.features);
    setGeneratedDesc(desc);
    setIsGenerating(false);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    addProduct({
      id: Date.now().toString(),
      name: newProduct.name,
      description: generatedDesc || 'No description provided.',
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: `https://picsum.photos/400/400?random=${Date.now()}`,
      stock: 10,
      rating: 0
    });

    // Reset form
    setNewProduct({ name: '', price: '', category: 'Accessories', features: '' });
    setGeneratedDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Manage inventory and view sales insights.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'overview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'inventory' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Inventory
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-slate-900">$24,592.00</p>
              <span className="text-emerald-500 text-sm font-medium">+12% from last week</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-slate-900">456</p>
              <span className="text-emerald-500 text-sm font-medium">+5% from last week</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Low Stock Items</h3>
              <p className="text-3xl font-bold text-amber-500">3</p>
              <span className="text-slate-400 text-sm font-medium">Requires attention</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-indigo-600" />
                Weekly Sales
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                    />
                    <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Visitor Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                       contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={3} dot={{fill: '#8b5cf6', strokeWidth: 2}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-6">
            <h3 className="text-lg font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Summer Linen Shirt"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Accessories</option>
                    <option>Electronics</option>
                    <option>Apparel</option>
                    <option>Home</option>
                    <option>Travel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Key Features (for AI)</label>
                <input
                  type="text"
                  value={newProduct.features}
                  onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. lightweight, blue, cotton"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating || !newProduct.name}
                    className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1"
                  >
                    <SparklesIcon className="w-3 h-3" />
                    {isGenerating ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
                <textarea
                  value={generatedDesc}
                  onChange={(e) => setGeneratedDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  rows={4}
                  placeholder="Click AI Generate to create a description automatically."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold">Current Inventory</h3>
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{product.name}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1">{product.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                    <span>{product.category}</span>
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 p-2 mt-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};