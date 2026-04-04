import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'Milkshakes', icon: 'milkshake', color: 'from-orange-400 to-amber-500', count: '20+ Shakes', img: 'https://saltandbaker.com/wp-content/uploads/2020/12/oreo-milkshake-recipe.jpg' },
  { name: 'Fresh Juices', icon: 'local_drink', color: 'from-yellow-400 to-orange-500', count: '15+ Juices', img: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-1296x728-feature.jpg' },
  { name: 'Sizzling Snacks', icon: 'restaurant', color: 'from-red-400 to-rose-600', count: '10+ Snacks', img: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2024/02/paneer-kathi-roll-recipe.jpg' },
  { name: 'Desserts', icon: 'ice_cream', color: 'from-pink-400 to-fuchsia-600', count: '8+ Sundaes', img: 'https://www.babsprojects.com/wp-content/uploads/2021/06/gadbad-thumbnail.jpg' },
  { name: 'Signature Lassi', icon: 'glass_cup', color: 'from-blue-400 to-indigo-600', count: '6+ Varieties', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEF5xuF_FrNirgBsRdUgDKzZwubPGlh-T_QQ&s' },
  { name: 'Royal Falooda', icon: 'layers', color: 'from-purple-400 to-violet-600', count: '3+ Faloodas', img: 'https://5.imimg.com/data5/SELLER/Default/2022/1/IH/YO/JL/49073197/kesar-falooda-mix.jpg' },
];

export default function LaunchHero() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-surface">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, 15, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-[25rem] h-[25rem] bg-primary/10 rounded-full blur-[60px] will-change-transform"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              x: [0, -30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 -right-24 w-[30rem] h-[30rem] bg-secondary-container/15 rounded-full blur-[80px] will-change-transform"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Hero Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-3/5 space-y-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                }
              }}
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)', 
                    scale: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="text-7xl lg:text-[140px] chewy-regular leading-[0.8] tracking-tighter selection:bg-primary-container"
              >
                <span className="block text-on-surface oswald">TAJA</span>
                <span className="liquid-gradient-text block oswald">LASSI.</span>
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-8 text-on-surface-variant text-xl lg:text-2xl max-w-xl font-medium leading-relaxed"
              >
                Beyond just Lassi. Discover <span className="text-primary font-black scale-110 inline-block">60+ handcrafted</span> refreshments, from vibrant juices to sizzling snacks, all made with pure love.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <NavLink 
                to="/menu" 
                className="bg-primary text-white px-12 py-6 rounded-2xl font-headline font-bold text-xl shadow-[0_20px_40px_rgba(112,93,0,0.25)] hover:bg-surface-tint hover:shadow-[0_25px_50px_rgba(112,93,0,0.35)] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                Explore Menu
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </NavLink>
            </motion.div>
          </div>

          {/* Hero Visual - Floating Mosaic */}
          <div className="relative lg:w-2/5 w-full flex items-center justify-center h-[500px] lg:h-[600px]">
             <motion.div
                initial={{ opacity: 0, rotate: -5, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, rotate: { duration: 1.2 }, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full h-full p-4"
                whileHover={{ scale: 1.02 }}
             >
                <motion.div 
                  initial={{ x: "-50%", y: "-50%" }}
                  whileHover={{ 
                    rotateY: 10, 
                    rotateX: -10,
                    scale: 1.05,
                    x: "-50%",
                    y: "-50%"
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute top-1/2 left-1/2 w-[80%] lg:w-[350px] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-[12px] border-white z-20 group perspective-1000"
                >
                   <img 
                    src="/mango_lassi_hero.png" 
                    alt="Signature Mango Lassi" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                      <span className="text-white font-bold text-2xl italic font-headline mb-2">The OG Lassi.</span>
                      <p className="text-white/70 text-sm">Crafted fresh every single morning.</p>
                   </div>
                </motion.div>

                {/* Floating "Variety" Chips */}
                <motion.div 
                  animate={{ 
                    y: [0, -40, 0], 
                    rotate: [-10, 5, -10],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[5%] left-[-10%] bg-white p-6 rounded-[2.5rem] shadow-2xl z-30 border border-amber-100 flex flex-col items-center"
                >
                   <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined font-variation-fill text-3xl">sparkles</span>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Pure Joy</span>
                </motion.div>

                <motion.div 
                   animate={{ 
                     y: [0, 40, 0], 
                     rotate: [15, -5, 15],
                     scale: [1, 0.9, 1]
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-[5%] right-[-10%] bg-stone-900 p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30 flex items-center gap-4 border border-white/10"
                >
                   <div className="flex flex-col">
                      <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">New Arrival</span>
                      <span className="text-white font-headline font-bold text-lg">Oreo Mud Shakes</span>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-white text-xl animate-pulse">trending_up</span>
                   </div>
                </motion.div>
             </motion.div>

             {/* Background Decorative Rings */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border-[1px] border-primary/10 rounded-full -z-10"/>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square border-[1px] border-primary/5 rounded-full -z-20 animate-[spin_20s_linear_infinite]"/>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-24 bg-surface-container-lowest relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
          >
             <div className="flex flex-col max-w-2xl">
                <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">Taste the Catalog</span>
                <h2 className="text-5xl lg:text-7xl font-bold text-on-surface leading-[1.1]">
                   Unending Variety. <br/>
                   <span className="text-stone-400">Pure Craftsmanship.</span>
                </h2>
             </div>
             <p className="text-on-surface-variant text-lg md:text-xl font-medium max-w-sm">
                From Royal Faloodas to Sizzling Paneer Rolls—we have something for every mood.
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: idx * 0.1, 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -20, transition: { duration: 0.4 } }}
                className="group relative h-[450px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-2xl"
              >
                <div className="absolute inset-0 z-0">
                   <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[2s] ease-out"/>
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/20 to-stone-900/90 group-hover:via-stone-900/40 transition-all duration-700"/>
                </div>
                
                <div className="absolute top-10 left-10 z-10">
                   <motion.div 
                     whileHover={{ rotate: 360 }}
                     transition={{ duration: 1, ease: "easeInOut" }}
                     className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-[0_15px_30px_rgba(0,0,0,0.3)]`}
                   >
                      <span className="material-symbols-outlined text-4xl font-variation-fill">{cat.icon}</span>
                   </motion.div>
                </div>

                <div className="absolute bottom-12 left-12 z-10 right-12">
                   <span className="text-amber-400 text-xs font-black uppercase tracking-[0.3em] block mb-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{cat.count}</span>
                   <h3 className="text-white text-4xl font-black mb-4 tracking-tight">{cat.name}</h3>
                   <div className="w-0 h-1.5 bg-amber-400 group-hover:w-full transition-all duration-700 rounded-full"/>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Commitment Section */}
      <section className="py-24 bg-on-background text-white relative">
         <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-4xl lg:text-5xl leading-tight italic">
               "Freshness isn't an option at <span className="text-primary-container italic">Taja Lassi</span> . It's our heartbeat."
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
               <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl font-black text-primary-container">100%</span>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest underline decoration-2 decoration-primary-container underline-offset-8">Organic Curd</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl font-black text-primary-container">60+</span>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest underline decoration-2 decoration-primary-container underline-offset-8">Menu Items</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl font-black text-primary-container">Fresh</span>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest underline decoration-2 decoration-primary-container underline-offset-8">Hand Picked</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl font-black text-primary-container">Daily</span>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest underline decoration-2 decoration-primary-container underline-offset-8">Crafted</span>
               </div>
            </div>
         </div>
         {/* Background noise texture or grid */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"/>
      </section>

      {/* Delivery Zone Section */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined text-primary text-3xl animate-bounce">local_shipping</span>
              </div>
              <div>
                 <h4 className="text-xl font-headline font-black text-on-surface">Now Serving All of Jakkasandra</h4>
                 <p className="text-on-surface-variant font-medium">Delivering your favorites from Jain University to Dayananda University.</p>
              </div>
           </div>
           <NavLink to="/menu" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
              Order Now to Your Campus
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
           </NavLink>
        </div>
      </section>

      <div className="h-20 bg-on-background"/>
    </div>
  );
}
