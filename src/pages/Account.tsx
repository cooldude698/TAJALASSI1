import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  
  // Settings State
  const [settings, setSettings] = useState({
    notifications: true,
    offers: true,
    darkMode: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedPhone = localStorage.getItem('user_phone');
    const savedName = localStorage.getItem('user_name');
    if (savedPhone) {
      setIsLoggedIn(true);
      setPhone(savedPhone);
      setName(savedName || '');
      calculateOrders(savedPhone);
    }

    const savedSettings = localStorage.getItem('user_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const calculateOrders = (userPhone: string) => {
    const allOrders = JSON.parse(localStorage.getItem('active_orders') || '[]');
    const count = allOrders.filter((o: any) => o.phone === userPhone).length;
    setOrderCount(count);
  };

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const cleanPhone = phone.replace(/\s+/g, '');
      if (cleanPhone === '+919986751341' || cleanPhone === '9986751341') {
        sessionStorage.setItem('is_admin_auth', 'true');
        navigate('/admin');
        return;
      }

      setIsLoggedIn(true);
      localStorage.setItem('user_phone', phone);
      localStorage.setItem('user_name', name);
      calculateOrders(phone);
      navigate('/');
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_phone');
    localStorage.removeItem('user_name');
    setIsLoggedIn(false);
    setName('');
    setOtpSent(false);
    setOtp('');
  };

  const handleSupport = () => {
    const whatsappNumber = "+919986751341";
    const message = `*Hi Taja Lassi team!*%0A%0AI need help with my account.%0A%0A*Name:* ${name || 'N/A'}%0A*Phone:* +91 ${phone || 'N/A'}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const toggleSetting = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('user_settings', JSON.stringify(newSettings));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(112,93,0,0.1)] border border-white/50 space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 bg-amber-100 rounded-full mb-2">
                <span className="material-symbols-outlined text-amber-600 text-3xl">account_circle</span>
            </div>
            <h1 className="text-3xl font-headline font-black text-on-surface">Customer Login</h1>
            <p className="text-on-surface-variant font-medium">Enter your phone to access your Taja rewards.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-4">Full Name</label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 font-bold">person</span>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={otpSent}
                  className="w-full bg-surface-container-lowest border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-lg placeholder:text-stone-300 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-4">Phone Number</label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 font-bold">+91</span>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="00000 00000"
                  disabled={otpSent}
                  className="w-full bg-surface-container-lowest border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-lg placeholder:text-stone-300 disabled:opacity-50"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.button
                  key="send-otp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={handleSendOtp}
                  disabled={phone.length < 10 || isLoading}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-headline font-bold text-lg shadow-lg shadow-amber-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Send OTP'}
                </motion.button>
              ) : (
                <motion.div 
                    key="verify-otp"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                  <div className="space-y-2 text-center">
                    <label className="text-xs font-black uppercase tracking-widest text-stone-400">Enter 6-digit OTP</label>
                    <input 
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="w-full bg-surface-container-lowest border-none rounded-2xl py-5 px-6 text-center text-3xl font-black tracking-[0.5em] focus:ring-2 focus:ring-primary/20 transition-all placeholder:tracking-normal placeholder:font-medium placeholder:text-stone-300"
                    />
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length < 6 || isLoading}
                    className="w-full py-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl font-headline font-bold text-lg shadow-lg shadow-emerald-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Verify & Login'}
                  </button>
                  <button onClick={() => setOtpSent(false)} className="w-full text-sm font-bold text-stone-400 hover:text-primary transition-colors">Change Phone Number</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-32 px-6 max-w-2xl mx-auto space-y-8 w-full">
      {/* Profile Header */}
      <section className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl mb-2">
                <span className="material-symbols-outlined text-5xl">person</span>
            </div>
            <div>
                <h2 className="text-3xl font-black font-headline tracking-tight">Welcome, {name || 'Elite Member'}</h2>
                <p className="text-white/80 font-medium">+91 {phone}</p>
            </div>
            <div className="flex gap-4 pt-4">
                <div className="bg-white/20 backdrop-blur-xl px-6 py-4 rounded-3xl flex flex-col items-center">
                    <span className="text-2xl font-black">{orderCount}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Orders Done</span>
                </div>
                <div className="bg-white/20 backdrop-blur-xl px-6 py-4 rounded-3xl flex flex-col items-center">
                    <span className="text-2xl font-black">240</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Reward Pts</span>
                </div>
            </div>
        </div>
      </section>

      {/* Settings Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-headline font-black text-on-surface px-2">Account Settings</h3>
        <div className="bg-surface-container-low rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(112,93,0,0.05)] border border-stone-100 overflow-hidden">
            <SettingItem 
                icon="notifications" 
                title="Order Notifications" 
                desc="Get real-time updates on your lassi delivery"
                isActive={settings.notifications} 
                onToggle={() => toggleSetting('notifications')}
            />
            <div className="h-[1px] bg-stone-100 mx-6"></div>
            <SettingItem 
                icon="local_fire_department" 
                title="Exclusive Offers" 
                desc="Deals and discounts on your favorites"
                isActive={settings.offers} 
                onToggle={() => toggleSetting('offers')}
            />
            <div className="h-[1px] bg-stone-100 mx-6"></div>
            <SettingItem 
                icon="dark_mode" 
                title="Dark Mode" 
                desc="Easier on your eyes during late night snacks"
                isActive={settings.darkMode} 
                onToggle={() => toggleSetting('darkMode')}
            />
        </div>
      </section>

      {/* Help & Logout */}
      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleSupport}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-stone-100 shadow-sm hover:bg-stone-50 transition-colors group"
        >
            <span className="material-symbols-outlined text-primary text-3xl mb-2 group-hover:scale-110 transition-transform">support_agent</span>
            <span className="font-bold text-sm text-stone-700">Help Support</span>
        </button>
        <button 
           onClick={handleLogout}
           className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-error/5 shadow-sm hover:bg-error/5 transition-colors group"
        >
            <span className="material-symbols-outlined text-error text-3xl mb-2 group-hover:scale-110 transition-transform">logout</span>
            <span className="font-bold text-sm text-error">Logout</span>
        </button>
      </section>

      <p className="text-center text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] pt-8">Version 1.0.4 • Taja Lassi</p>
    </div>
  );
}

function SettingItem({ icon, title, desc, isActive, onToggle }: any) {
    return (
        <div className="flex items-center gap-4 p-6 hover:bg-stone-50/50 transition-colors rounded-[1.5rem]">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isActive ? 'bg-primary text-white' : 'bg-surface-container text-stone-400'}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div className="flex-grow">
                <h4 className="font-bold text-on-surface">{title}</h4>
                <p className="text-xs text-on-surface-variant line-clamp-1">{desc}</p>
            </div>
            <button 
                onClick={onToggle}
                className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${isActive ? 'bg-primary' : 'bg-stone-200'}`}
            >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
        </div>
    );
}
