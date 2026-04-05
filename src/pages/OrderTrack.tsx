import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OrderTrack() {
  const [order, setOrder] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {
    const loadOrder = () => {
      const orders = JSON.parse(localStorage.getItem('active_orders') || '[]');
      if (orders.length > 0) {
        setOrder(orders[0]); // Load latest order
      }
    };
    loadOrder();
    window.addEventListener('storage', loadOrder);
    
    // Poll just in case the Admin changes status in the same browser session
    const interval = setInterval(loadOrder, 2000);
    return () => {
      window.removeEventListener('storage', loadOrder);
      clearInterval(interval);
    };
  }, []);

  const handleHelp = () => {
    const whatsappNumber = "+919986751341";
    const message = `*Hi Taja Lassi team!*%0A%0AI need help with my Order ID: *${order?.id}*.%0A%0A*Name:* ${order?.customer}%0A*Status:* ${order?.status}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (!order) {
    return (
      <div className="pt-40 px-6 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold text-on-surface">No Active Orders Yet!</h2>
        <p className="text-on-surface-variant">Once you place an order, you can track it here.</p>
      </div>
    );
  }

  // Derive UI state from order status
  const isPending = order.status === 'Pending';
  const isPreparing = order.status === 'Preparing';
  const isOut = order.status === 'Out for Delivery';
  const isDelivered = order.status === 'Delivered';

  // Highlight step based on progress
  const progressPercent = isDelivered ? '100%' : isOut ? '75%' : isPreparing ? '50%' : '25%';
  
  let statusMessage = "Waiting for confirmation";
  let statusTime = "Evaluating...";
  if (isPreparing) {
    statusMessage = "Chefs are packing your crisp order.";
    statusTime = "25-30 mins";
  } else if (isOut) {
    statusMessage = "Our rider Ravi is navigating through traffic to bring you the freshest chill.";
    statusTime = "15-20 mins";
  } else if (isDelivered) {
    statusMessage = "Order has been safely delivered!";
    statusTime = "Delivered";
  }

  return (
    <div className="pt-8 pb-32 max-md:pb-60 px-6 max-w-2xl mx-auto space-y-8 w-full">
      {/* Hero Delivery Status */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-sm font-medium">
          <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>
            {isDelivered ? 'celebration' : isOut ? 'pedal_bike' : isPreparing ? 'restaurant' : 'schedule'}
          </span>
          {order.status}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-on-background">
          {isDelivered ? <span className="text-primary">Enjoy Your Meal!</span> : <>Arriving in <span className="text-primary">{statusTime}</span></>}
        </h2>
        <p className="text-on-surface-variant max-w-xs mx-auto">{statusMessage}</p>
      </section>

      {/* Status Progress Bar (Liquid Style) */}
      <section className="relative py-12">
        <div className="relative flex justify-between items-center w-full min-h-[4rem]">
          {/* Track Background */}
          <div className="absolute top-1/2 left-0 w-full h-3 bg-surface-container rounded-full -translate-y-1/2"></div>
          {/* Active Track */}
          <div className="absolute top-1/2 left-0 h-3 bg-gradient-to-br from-[#705D00] to-[#FFD93D] rounded-full -translate-y-1/2 shadow-lg shadow-primary/20 transition-all duration-1000" style={{ width: progressPercent }}></div>
          
          {/* Steps */}
          <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity ${isPending||isPreparing||isOut||isDelivered ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Ordered</span>
          </div>
          <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity ${isPreparing||isOut||isDelivered ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>restaurant</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Preparing</span>
          </div>
          <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity ${isOut||isDelivered ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <div className={`w-10 h-10 rounded-full ${isOut||isDelivered ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: isOut||isDelivered ? "'FILL' 1" : ""}}>pedal_bike</span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isOut||isDelivered ? 'text-primary' : 'text-on-surface-variant'}`}>Delivery</span>
          </div>
          <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity ${isDelivered ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <div className={`w-10 h-10 rounded-full ${isDelivered ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-xl">celebration</span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isDelivered ? 'text-primary' : 'text-on-surface-variant'}`}>Enjoying</span>
          </div>
        </div>
      </section>

      {/* Simulated Interactive Map */}
      <section className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl shadow-stone-900/10 group bg-stone-200">
        <motion.div 
           className="absolute inset-0 w-full h-full"
           animate={{ scale: mapZoom }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
           style={{ originX: 0.5, originY: 0.5 }}
        >
          <div className="absolute inset-0 bg-stone-200">
            <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7nmHztS44eOILGAIqWjpP_pcdCuSF9TODItmG9uO2tIfzr9E0s-EEF9fFZOSj2OYrSFeLFhVrOmnpP0pSqdfMj70y7kmIxZaWcHFPoFhKY02IGg2c3_w9cEX32bUcGQjaFqWR-zPYMTaJY_Jadh8rEf27X53qr6781pQkegdFj-Cev7dgrRu5HbevV4S5ysHnJCEAxZeHQ3i14SwT3tHFrAi0YwKb-EYLOnAktBbN4Fi1xKZj79K_xJwSUNWGoKTT2mVZUHobSZd5" alt="Map view" />
          </div>
          
          {/* Map Decorative Elements */}
          <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
          
          {/* Delivery Path (SVG Path Simulation) */}
          {!isDelivered && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              <path d="M 50 250 Q 150 200 200 150 T 350 50" fill="none" opacity="0.4" stroke="#705d00" strokeDasharray="8 8" strokeWidth="4"></path>
            </svg>
          )}

          {/* Destination Pin */}
          <div className="absolute flex flex-col items-center" style={{ top: '16.66%', left: '87.5%', transform: 'translate(-50%, -50%)' }}>
            <div className="bg-white p-2 rounded-lg shadow-lg mb-2 text-[10px] whitespace-nowrap font-bold">{order.customer}'s Location</div>
            <div className="w-4 h-4 bg-primary border-4 border-white rounded-full shadow-lg ring-4 ring-primary/20"></div>
          </div>

          {/* Moving Rider */}
          {!isDelivered && (
            <motion.div 
              initial={false}
              animate={{ 
                top: isOut ? '16.66%' : '83.33%', 
                left: isOut ? '87.5%' : '12.5%',
                x: '-50%',
                y: '-50%'
              }}
              transition={{ duration: isOut ? 300 : 1, ease: 'linear' }}
              className="absolute flex flex-col items-center z-10"
            >
              {isOut && (
                <div className="bg-white px-3 py-1 rounded-full shadow-xl flex items-center gap-2 mb-2 animate-pulse whitespace-nowrap">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW-_XCTTwDM8_AwZoayUdEoejnebVuWzoCV0CHbdkYUXiGcK4WBSiLgUEYny_t-O6AbVzuGMf5GceewPu4fwtpCbnXt2ss0--lb9a3Lm8atmiPsbEgdH9k4dwNh4sgahfyYGjxkajvtw3YFg4h1WCMBvNDllE81BToU1FuL6dgVqx_RNHLSlA3HuFitJo-VLOv1csC7-ygRGgwTc30teEn61Ou1v6KGJRQJ0KUq3vi0c0jFaZWdZOBGZR3JJJX8DyR_YvyZweImuXI" alt="Rider" />
                  </div>
                  <span className="text-xs font-bold">Ravi is {isOut ? 'on the way' : 'waiting at shop'}</span>
                </div>
              )}
              <div className={`w-12 h-12 bg-primary-container rounded-full flex items-center justify-center shadow-lg border-2 border-white ${isOut ? 'animate-bounce' : ''}`}>
                <span className="material-symbols-outlined text-on-primary-container text-xl" style={{fontVariationSettings: "'FILL' 1"}}>pedal_bike</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Map Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <button 
             onClick={() => setMapZoom(z => Math.min(z + 0.3, 2.5))}
             className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-on-surface hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <button 
             onClick={() => setMapZoom(z => Math.max(z - 0.3, 0.5))}
             className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-on-surface hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
      </section>

      {/* Order Summary Card */}
      <section className="bg-surface-container-low rounded-lg p-6 space-y-4 shadow-sm">
        <h3 className="font-bold font-headline text-lg">Order Details</h3>
        
        {/* Render items dynamically */}
        {order.items?.map((item: any, idx: number) => (
           <div key={idx} className="flex justify-between items-center py-2">
             <div>
               <p className="font-bold text-on-surface text-sm">{item.quantity}x {item.name}</p>
             </div>
             <p className="font-bold text-primary text-sm">₹{item.price}</p>
           </div>
        ))}
        
        <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-stone-400 text-sm">receipt_long</span>
            <span className="text-xs text-stone-500 font-medium">ID: {order.id}</span>
          </div>
          <button 
            onClick={() => setShowReceipt(true)}
            className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline hover:text-secondary-container transition-colors p-2 -my-2 rounded-lg"
          >
            View Receipt
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Floating Action WhatsApp */}
      <div className="fixed bottom-28 right-6 z-50">
        <div className="flex flex-col items-end gap-3">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl shadow-stone-900/5 text-xs font-bold text-on-surface border border-white/50">
                Need Help?
            </div>
            <button 
              onClick={handleHelp}
              className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/20 active:scale-90 transition-transform duration-200 hover:scale-105"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
              </svg>
            </button>
        </div>
      </div>

      {/* Rich Receipt Modal Overlay */}
      {showReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowReceipt(false)}></div>
          <div className="relative w-full max-w-sm bg-surface rounded-2xl shadow-2xl p-6 flex flex-col pt-10 px-8 border border-outline-variant/30 animate-in fade-in zoom-in duration-300">
            {/* Modal Close Button */}
            <button onClick={() => setShowReceipt(false)} className="absolute top-4 right-4 text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors">
               <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center mb-6">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">storefront</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Liquid Gastronomy</h3>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Order E-Receipt</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm py-2 border-b border-dashed border-outline-variant/40">
                <span className="text-on-surface-variant font-medium">Order ID</span>
                <span className="font-bold">{order.id}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-dashed border-outline-variant/40">
                <span className="text-on-surface-variant font-medium">Date</span>
                <span className="font-bold">{new Date(order.timestamp).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-dashed border-outline-variant/40">
                <span className="text-on-surface-variant font-medium">Customer</span>
                <span className="font-bold">{order.customer}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-dashed border-outline-variant/40">
                <span className="text-on-surface-variant font-medium">Status</span>
                <span className="font-bold text-secondary">{order.status}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-400">Items</h4>
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{item.quantity}x {item.name}</span>
                  <span className="font-medium">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t-2 border-stone-800 flex justify-between items-center bg-stone-50 -mx-8 -mb-6 p-6 rounded-b-2xl">
              <span className="font-headline font-bold text-lg text-on-surface">Total Paid</span>
              <span className="font-headline font-black text-2xl text-stone-800 tracking-tight">₹{order.amount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
