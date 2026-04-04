import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
 
  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedPhone = localStorage.getItem('user_phone');
    if (savedName) setName(savedName);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleWhatsAppOrder = () => {
    if (!name || !phone) {
      alert("Please enter both Name and Phone Number to complete the order.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderId = "#TG-" + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      customer: name,
      phone: phone, // Added phone for order history tracking
      amount: total,
      items: items.map(item => ({ name: item.name, quantity: item.quantity, price: item.price * item.quantity })),
      status: "Pending",
      timestamp: Date.now()
    };

    const existingOrders = JSON.parse(localStorage.getItem('active_orders') || '[]');
    localStorage.setItem('active_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    // Notify other windows (admin panel)
    window.dispatchEvent(new Event('storage'));

    // Format WhatsApp Message
    const whatsappNumber = "+919986751341"; // Updated with requested number
    const itemsList = items.map(item => `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`).join('%0A');
    const message = `*New Order from Taja Lassi Website*%0A%0A*Order ID:* ${orderId}%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Amount:* ₹${total}%0A%0A_I have placed my order and am paying via QR code. Please confirm!_`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, '_blank');
    alert("Order recorded! We're redirecting you to WhatsApp to confirm.");
    navigate('/track');
  };

  return (
    <div className="pt-8 pb-48 px-6 max-w-2xl mx-auto space-y-8 w-full">
      {/* Delivery Info Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-2xl text-on-surface tracking-tight">Delivery Info</h2>
          <span className="text-secondary font-semibold text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">verified</span> Verified Zone
          </span>
        </div>
        <div className="grid gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant ml-4">Full Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-bright transition-all placeholder:text-outline" 
              placeholder="Enter your name" 
              type="text"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant ml-4">Phone Number</label>
            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-bright transition-all placeholder:text-outline" 
              placeholder="+91 00000 00000" 
              type="tel"
            />
            <label className="text-xs font-bold text-on-surface-variant ml-4">Address / Hostel Number</label>
            <input 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-bright transition-all placeholder:text-outline" 
              placeholder="e.g. Hostel 4, Room 302" 
              type="text"
            />
          </div>
        </div>

        {/* Delivery Estimation Card */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-emerald-600 animate-pulse">speed</span>
          </div>
          <div>
            <p className="text-emerald-900 font-bold text-sm">Lightning Fast Delivery</p>
            <p className="text-emerald-700 text-xs font-medium">Estimated arrival in <span className="font-bold underline">15-20 mins</span></p>
          </div>
          <div className="ml-auto bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Live</div>
        </div>
      </section>

      {/* Order Summary Bento */}
      <section className="bg-surface-container-low rounded-xl p-8 space-y-6 shadow-[0_20px_40px_rgba(112,93,0,0.08)]">
        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
          <h2 className="font-headline text-xl text-on-surface">Order Summary</h2>
          <div className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            FREE Delivery
          </div>
        </div>
        
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                <img className="h-full w-full object-cover" src={item.imageUrl} alt={item.name} />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-on-surface">{item.name}</p>
                <p className="text-xs text-on-surface-variant">Qty: {item.quantity} • {item.description || 'Fresh'}</p>
              </div>
              <p className="font-bold text-primary">₹{item.price * item.quantity}</p>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-4 text-center text-on-surface-variant italic text-sm">
              Your cart is empty. Please add items from the menu.
            </div>
          )}
        </div>
        
        <div className="pt-6 border-t border-outline-variant/10">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant font-medium">Subtotal</span>
            <span className="font-bold text-on-surface">₹{total}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-on-surface-variant font-medium">Delivery</span>
            <span className="font-bold text-secondary text-sm">₹0.00</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary/10">
            <span className="font-headline text-lg">Total Amount</span>
            <span className="font-headline text-2xl text-primary tracking-tight">₹{total}</span>
          </div>
        </div>
      </section>

      {/* Payment Section: Glassmorphic QR */}
      <section className="space-y-6">
        <h2 className="font-headline text-2xl text-on-surface tracking-tight">Payment</h2>
        <div className="relative overflow-hidden bg-white/40 backdrop-blur-2xl rounded-xl p-8 shadow-[0_20px_40px_rgba(112,93,0,0.08)] flex flex-col items-center text-center space-y-4">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-br from-[#705D00] to-[#FFD93D]"></div>
          <div className="p-4 bg-white rounded-lg shadow-inner">
            <img className="w-48 h-48 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwxftDKnxvWJlF-aU88bDVdLPdpHoXK17xye6wSJjeMKn1ZjdwoWufh7U3pzOD9sNTG1UjMQaG0tgy-N3hYcafJnDbdXNKIaxmxI-qJMd5WZqlO0C547rS0aEJ6fVdVEoQw9-vjqhhAUncjXfCywTMEZ1ZavZziHTUDAoEUrJdTx1PjGHZZr8oCen34KNPASJ3KRY6uIwpIYyPdG1xO4AkIxYcp0mq8DL6Mc5XWdmWB73khmO23X4MdfrLxeQV1BKkDRt_-o3VFzYI" alt="QR Code" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-on-surface">Scan to Pay via any UPI App</p>
            <p className="text-xs text-on-surface-variant max-w-[200px]">GPay, PhonePe, Paytm or any other banking app</p>
          </div>
          <div className="flex gap-4 opacity-40 grayscale pt-2">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="material-symbols-outlined">credit_card</span>
            <span className="material-symbols-outlined">payments</span>
          </div>
        </div>
      </section>

      {/* Primary Action Button */}
      <section className="space-y-4">
        <button 
          onClick={handleWhatsAppOrder} 
          className="w-full py-5 rounded-lg bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-headline text-lg shadow-[0_20px_40px_rgba(37,211,102,0.2)] hover:scale-[0.98] transition-transform flex items-center justify-center gap-3">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>chat</span>
          Confirm Order via WhatsApp
        </button>
      </section>

      {/* Footer */}
      <footer className="pb-12 pt-4 px-6 text-center space-y-4">
        <div className="flex justify-center gap-6">
          <a className="text-xs font-bold text-outline hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-xs font-bold text-outline hover:text-primary transition-colors" href="#">Terms</a>
        </div>
        <p className="text-[10px] text-outline uppercase tracking-[0.2em]">© 2026 Taja Lassi • Fluid Market</p>
      </footer>
    </div>
  );
}
