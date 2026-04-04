import React from 'react';
import { NavLink } from 'react-router-dom';

export function BottomNavBar() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[85%] md:w-[360px] h-16 px-3 bg-white/70 dark:bg-stone-900/70 backdrop-blur-2xl rounded-full shadow-[0_15px_30px_rgba(112,93,0,0.1)] flex justify-around items-center z-50">
      
      <NavLink to="/" className={({isActive}) => 
        isActive 
          ? "flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full p-2.5 scale-105 -translate-y-1.5 bouncy-interaction" 
          : "flex flex-col items-center justify-center text-stone-400 p-1.5 hover:text-amber-500 bouncy-interaction"
      }>
        <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
        <span className="font-medium text-[9px] font-label">Home</span>
      </NavLink>

      <NavLink to="/menu" className={({isActive}) => 
        isActive 
          ? "flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full p-2.5 scale-105 -translate-y-1.5 bouncy-interaction" 
          : "flex flex-col items-center justify-center text-stone-400 p-1.5 hover:text-amber-500 bouncy-interaction"
      }>
        <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
        <span className="font-medium text-[9px] font-label">Menu</span>
      </NavLink>

      <NavLink to="/track" className={({isActive}) => 
        isActive 
          ? "flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full p-2.5 scale-105 -translate-y-1.5 bouncy-interaction" 
          : "flex flex-col items-center justify-center text-stone-400 p-1.5 hover:text-amber-500 bouncy-interaction"
      }>
        <span className="material-symbols-outlined text-[22px]">search</span>
        <span className="font-medium text-[9px] font-label">Search</span>
      </NavLink>

      <NavLink to="/account" className={({isActive}) => 
        isActive 
          ? "flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full p-2.5 scale-105 -translate-y-1.5 bouncy-interaction" 
          : "flex flex-col items-center justify-center text-stone-400 p-1.5 hover:text-amber-500 bouncy-interaction"
      }>
        <span className="material-symbols-outlined text-[22px]">person</span>
        <span className="font-medium text-[9px] font-label">Account</span>
      </NavLink>
      
    </nav>
  );
}
