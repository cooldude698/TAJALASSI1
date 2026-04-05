import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TopAppBar } from './components/TopAppBar';
import { BottomMenu } from './components/BottomMenu';
import { NavigationDrawer } from './components/NavigationDrawer';
import BackgroundParticles from './components/BackgroundParticles';
import AnimationRibbon from './components/AnimationRibbon';
import { CartProvider } from './context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import LaunchHero from './pages/LaunchHero';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import OrderTrack from './pages/OrderTrack';
import Login from './pages/Login';
import Account from './pages/Account';
import AdminPortal from './pages/AdminPortal';

// Layout for the main consumer app
function MainLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/menu' && (
        <>
          <BackgroundParticles />
          <AnimationRibbon />
        </>
      )}
      <TopAppBar />
      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-screen w-full flex flex-col pt-20"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      <BottomMenu />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function ProtectedAdminRoute() {
  const isAuth = sessionStorage.getItem('is_admin_auth');
  return isAuth ? <AdminPortal /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <div className="selection:bg-primary-container">
          <Routes>
            {/* Consumer App Routes wrapped in MainLayout */}
            <Route path="/" element={<MainLayout><LaunchHero /></MainLayout>} />
            <Route path="/menu" element={<MainLayout><Menu /></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
            <Route path="/track" element={<MainLayout><OrderTrack /></MainLayout>} />
            <Route path="/account" element={<MainLayout><Account /></MainLayout>} />

            {/* Standalone Routes - No NavBar/AppBar */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedAdminRoute />} />
            
            {/* Catch-all and Legacy Route Redirects */}
            <Route path="/admin.html" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
