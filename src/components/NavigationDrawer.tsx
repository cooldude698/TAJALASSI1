import React from 'react';

export function NavigationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-[55] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg rounded-r-[3rem] shadow-2xl shadow-stone-900/20 transform transition-transform duration-300 z-[60] lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col p-8 h-full">
          <div className="flex items-center gap-2 mb-12">
            <span className="text-amber-600 font-black text-2xl font-headline">LIQUID</span>
          </div>
          <h2 className="font-bold text-xl font-headline text-stone-900 mb-6">Menu Categories</h2>
          <div className="flex flex-col gap-4">
            <a className="bg-emerald-100 text-emerald-800 font-bold rounded-2xl flex items-center gap-4 px-6 py-4 transition-all" href="#">
              <span className="material-symbols-outlined">local_drink</span>
              <span>Lassi</span>
            </a>
            <a className="text-stone-600 hover:bg-stone-100 rounded-2xl flex items-center gap-4 px-6 py-4 transition-all" href="#">
              <span className="material-symbols-outlined">liquor</span>
              <span>Juices</span>
            </a>
            <a className="text-stone-600 hover:bg-stone-100 rounded-2xl flex items-center gap-4 px-6 py-4 transition-all" href="#">
              <span className="material-symbols-outlined">lunch_dining</span>
              <span>Sandwiches</span>
            </a>
            <a className="text-stone-600 hover:bg-stone-100 rounded-2xl flex items-center gap-4 px-6 py-4 transition-all" href="#">
              <span className="material-symbols-outlined">fastfood</span>
              <span>Fries</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
