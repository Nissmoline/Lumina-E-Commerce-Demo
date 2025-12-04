import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Storefront } from './pages/Storefront';
import { AdminDashboard } from './pages/AdminDashboard';
import { CartSidebar } from './components/CartSidebar';
import { ChatAssistant } from './components/ChatAssistant';
import { ShoppingCartIcon, MenuIcon, UserIcon } from './components/Icons';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'store' | 'admin'>('store');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useShop();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('store')}>
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Lumina</span>
              </div>
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <button 
                  onClick={() => setCurrentPage('store')}
                  className={`hover:text-indigo-600 transition-colors ${currentPage === 'store' ? 'text-indigo-600' : ''}`}
                >
                  Shop
                </button>
                <button className="hover:text-indigo-600 transition-colors">Collections</button>
                <button className="hover:text-indigo-600 transition-colors">About</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage('admin')}
                className={`p-2 rounded-full hover:bg-slate-100 transition-colors hidden sm:block ${currentPage === 'admin' ? 'bg-slate-100 text-indigo-600' : 'text-slate-600'}`}
                title="Admin Dashboard"
              >
                <UserIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-slate-100 transition-colors relative text-slate-600"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button className="sm:hidden p-2 text-slate-600">
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50">
        {currentPage === 'store' ? <Storefront /> : <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">&copy; 2025 Lumina E-Commerce. Built with React, Tailwind.</p>
        </div>
      </footer>

      {/* Components */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ChatAssistant />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}