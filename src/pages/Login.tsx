import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';

type LoginMethod = 'password' | 'otp';

export default function Login() {
  const [method, setMethod] = useState<LoginMethod>('password');
  const [identifier, setIdentifier] = useState(''); // Email or Phone
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login network request
    setTimeout(() => {
      setIsLoading(false);
      
      const cleanIdentifier = identifier.replace(/\s+/g, '');
      const adminPhone = '+919986751341';
      
      // Check if the user is logging in with the specific admin phone number
      if (cleanIdentifier === adminPhone || cleanIdentifier === '9986751341') {
        // Bypass the second admin OTP challenge since they logged in here
        sessionStorage.setItem('is_admin_auth', 'true');
        navigate('/admin');
      } else {
        // For customer logins, redirect to the landing page
        navigate('/');
      }
    }, 1500);
  };

  const handleSendOtp = () => {
    if (!identifier) return;
    setIsLoading(true);
    // Simulate OTP network request
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface flex flex-col md:flex-row shadow-2xl overflow-hidden">
      
      {/* Left side: Branding & Hero Image */}
      <div className="relative hidden md:flex md:w-1/2 bg-primary-container p-12 flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container rounded-full blur-[100px] opacity-30 -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <span className="material-symbols-outlined text-amber-800 text-3xl">local_drink</span>
            <span className="text-amber-900 font-black text-2xl font-headline tracking-tight">Liquid</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-poppins font-black text-on-primary-container leading-tight">
            Dive into<br/>pure taste.
          </h1>
          <p className="mt-6 text-xl text-amber-900/80 font-medium max-w-md">
            Sign in to your account and continue your liquid gastronomy journey with us.
          </p>
        </div>

        <div className="relative z-10 bg-white/30 backdrop-blur-xl border border-white/50 p-6 rounded-3xl w-max">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-amber-600">stars</span>
            </div>
            <div>
              <p className="font-bold text-amber-950">Join the Elite Club</p>
              <p className="text-sm font-medium text-amber-900">Get 20% off your first order!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 w-full max-w-2xl mx-auto">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-2 mb-10 self-start">
          <span className="material-symbols-outlined text-amber-600 text-3xl">local_drink</span>
          <span className="text-amber-800 font-black text-2xl font-headline tracking-tight">Liquid</span>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface">Welcome back</h2>
            <p className="text-stone-500 font-medium">Please enter your details to sign in.</p>
          </div>

          {/* Method Toggle */}
          <div className="bg-surface-container-low p-1.5 rounded-2xl flex max-w-full relative shadow-inner">
            <div 
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out z-0"
              style={{ transform: method === 'password' ? 'translateX(0)' : 'translateX(100%)' }}
            />
            <button 
              onClick={() => { setMethod('password'); setOtpSent(false); }}
              className={`flex-1 py-3 text-sm font-bold relative z-10 transition-colors ${method === 'password' ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800'}`}
            >
              Password
            </button>
            <button 
              onClick={() => { setMethod('otp'); setOtpSent(false); }}
              className={`flex-1 py-3 text-sm font-bold relative z-10 transition-colors ${method === 'otp' ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800'}`}
            >
              Get OTP
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 px-1">Email or Phone Number</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-amber-500 transition-colors">person</span>
                <input 
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={otpSent && method === 'otp'}
                  placeholder="Enter email or 10-digit phone" 
                  className="w-full bg-surface-container-lowest border-2 border-surface-container hover:border-surface-container-high focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-medium placeholder:text-stone-400 disabled:opacity-50"
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {method === 'password' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} 
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-stone-700">Password</label>
                    <a href="#" className="text-xs font-bold text-amber-600 hover:text-amber-700">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-amber-500 transition-colors">lock</span>
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-surface-container-lowest border-2 border-surface-container hover:border-surface-container-high focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-medium placeholder:text-stone-400"
                    />
                  </div>
                </motion.div>
              )}

              {method === 'otp' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} 
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  className="space-y-4"
                >
                  {!otpSent ? (
                    <button 
                      type="button" 
                      onClick={handleSendOtp}
                      disabled={!identifier || isLoading}
                      className="w-full bg-surface-container text-stone-700 font-bold py-4 rounded-full transition-all hover:bg-surface-container-high active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      ) : (
                        <>Send OTP <span className="material-symbols-outlined text-lg">send</span></>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-bold text-stone-700">Enter OTP</label>
                        <button type="button" onClick={() => setOtpSent(false)} className="text-xs font-bold text-amber-600 hover:text-amber-700">Change number</button>
                      </div>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-amber-500 transition-colors">pin</span>
                        <input 
                          type="text"
                          required
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="6-digit code" 
                          className="w-full bg-surface-container-lowest border-2 border-emerald-100 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-black tracking-[0.5em] text-center placeholder:text-stone-300 placeholder:tracking-normal placeholder:font-medium"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={isLoading || (method === 'otp' && !otpSent)}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-full shadow-lg shadow-amber-900/20 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none flex items-center justify-center gap-2 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin relative z-10">progress_activity</span>
              ) : (
                <span className="relative z-10">Sign In</span>
              )}
            </button>
          </form>

          <p className="text-center text-sm font-semibold text-stone-500">
            Don't have an account? <a href="#" className="text-amber-600 hover:text-amber-700">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
