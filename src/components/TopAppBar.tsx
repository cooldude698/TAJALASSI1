import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function TopAppBar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl shadow-sm shadow-amber-900/5 flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-4">
        <span 
          onClick={() => navigate('/')} 
          className="text-2xl tracking-tighter liquid-gradient-text chewy-regular cursor-pointer hover:opacity-80 transition-opacity"
        >
          TAJA.
        </span>
        <div className="h-6 w-[1px] bg-stone-200 dark:bg-stone-700 hidden sm:block"/>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-sm">location_on</span>
          <span className="font-bold text-xs tracking-tight font-headline text-stone-500 dark:text-stone-400 max-w-[200px] truncate sm:max-w-none">
            Delivering: Jain Uni. ↔ Dayananda Uni.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div onClick={() => navigate('/checkout')} className="relative hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors p-2 rounded-full cursor-pointer bouncy-interaction">
          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">shopping_cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm leading-none">
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
