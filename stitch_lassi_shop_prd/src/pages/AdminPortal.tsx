import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AdminPortal() {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const navigate = useNavigate();


  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem('is_admin_auth')) {
      navigate('/', { replace: true });
      return;
    }

    const loadOrders = () => {
      const stored = JSON.parse(localStorage.getItem('active_orders') || '[]');
      setOrders(stored);
    };
    
    // Load initially
    loadOrders();
    
    // Listen for storage events exactly like a real-time connection from customer tabs
    window.addEventListener('storage', loadOrders);
    
    // Optionally poll every few seconds just in case of same-window updates lacking events
    const interval = setInterval(loadOrders, 2000);
    
    return () => {
      window.removeEventListener('storage', loadOrders);
      clearInterval(interval);
    };
  }, []);

  const showToast = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const updateOrderStatus = (id: string, newStatus: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('active_orders', JSON.stringify(updated));
    showToast();
  };

  const totalSales = orders.reduce((acc, o) => acc + (o.amount || 0), 4500); // Base value + active order total



  return (
    <div className="pt-8 px-4 pb-32 max-w-7xl mx-auto space-y-8 w-full">
      {/* Stats Banner (Mobile) */}
      <div className="md:hidden bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-xl text-white shadow-xl shadow-amber-900/10">
        <p className="text-amber-100 font-medium text-sm">Today's Performance</p>
        <h2 className="text-3xl font-black font-headline tracking-tighter">₹{totalSales}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span className="text-xs font-bold">+12% from yesterday</span>
        </div>
      </div>

      {/* Active Orders Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-headline text-on-surface">Active Orders</h2>
          <div className="flex gap-2">
            <span className="bg-amber-100 text-amber-800 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{orders.length} Orders</span>
          </div>
        </div>

        {/* Bento Grid for Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length === 0 && (
            <p className="text-stone-400 font-medium col-span-full">No active orders right now. They will appear here immediately when a customer orders.</p>
          )}

          {orders.map((order, idx) => (
            <article key={order.id} className="bg-white rounded-lg p-6 shadow-[0_20px_40px_rgba(112,93,0,0.05)] border border-outline-variant/5 flex flex-col gap-4 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 ${idx % 2 === 0 ? 'bg-amber-50' : 'bg-emerald-50'} rounded-bl-[4rem] -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500`}></div>
              <div className="flex justify-between items-start relative">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase">Order ID</span>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                </div>
                <div className="bg-surface-container-low p-2 rounded-xl text-primary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>restaurant</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase">Customer</span>
                <p className="font-semibold text-on-surface">{order.customer}</p>
              </div>
              
              <div className="bg-surface-container-lowest p-4 rounded-xl space-y-2 border border-stone-100">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-stone-500">{item.quantity}x {item.name}</span>
                    <span className="font-medium text-on-surface">₹{item.price}</span>
                  </div>
                ))}
                
                <div className="pt-2 border-t border-outline-variant/10 flex justify-between">
                  <span className="font-bold text-on-surface">Total</span>
                  <span className="font-bold text-primary">₹{order.amount}</span>
                </div>
              </div>
              
              <div className="mt-2 space-y-3">
                <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  Status: <span className="font-bold text-secondary ml-1">{order.status}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateOrderStatus(order.id, 'Preparing')} className="bg-primary text-on-primary py-3 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-lg shadow-amber-900/10">Preparing</button>
                  <button onClick={() => updateOrderStatus(order.id, 'Out for Delivery')} className="bg-surface-container text-stone-500 py-3 rounded-full text-xs font-bold hover:bg-stone-100 transition-colors">Out</button>
                  <button onClick={() => updateOrderStatus(order.id, 'Delivered')} className="bg-secondary text-on-secondary py-3 rounded-full text-xs font-bold hover:bg-stone-100 transition-colors">Delivered</button>
                  <button onClick={() => updateOrderStatus(order.id, 'Cancelled')} className="bg-error-container text-on-error-container py-3 rounded-full text-xs font-bold hover:opacity-80 transition-opacity">Cancel</button>
                </div>
              </div>
            </article>
          ))}

          {/* Manual Order Card */}
          <article className="bg-surface-container-low rounded-lg p-6 flex flex-col justify-center items-center gap-4 text-center border-2 border-dashed border-outline-variant/30">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-stone-300 text-3xl">add</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface-variant">Manual Order</h3>
              <p className="text-xs text-on-surface-variant/60">Create a walk-in order</p>
            </div>
            <button className="px-6 py-2 bg-white text-on-surface font-bold text-sm rounded-full shadow-sm hover:bg-stone-50 transition-colors">Add New</button>
          </article>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white/50 rounded-xl p-6 backdrop-blur-sm border border-outline-variant/5 shadow-sm">
        <h2 className="text-xl font-bold font-headline mb-4">Live Updates</h2>
        <div className="space-y-4">
          {orders.slice(0, 3).map((order) => (
             <div key={"update-" + order.id} className="flex gap-4 items-center p-3 bg-white rounded-2xl shadow-sm border border-stone-50">
               <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                 <span className="material-symbols-outlined text-on-primary-container text-sm">notifications_active</span>
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium">Order <b>{order.id}</b> from <b>{order.customer}</b> is <span className="text-primary font-bold">{order.status}</span></p>
                 <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">Recently</p>
               </div>
             </div>
          ))}
          {orders.length === 0 && <p className="text-xs text-stone-400 font-medium">Waiting for incoming orders...</p>}
        </div>
      </section>

      {/* simulated toast block */}
      <div 
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-on-surface text-surface py-4 px-6 rounded-full shadow-2xl shadow-amber-900/40 pointer-events-none transition-all duration-300 ${isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[100%]'}`}
      >
        <span className="material-symbols-outlined text-secondary-container">verified</span>
        <p className="font-bold text-sm tracking-tight">Status Updated &amp; Synced!</p>
      </div>

    </div>
  );
}
