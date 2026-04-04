import { motion } from 'framer-motion';

const AnimationRibbon = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      <motion.svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full opacity-20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: [0, 50, 0],
          y: [0, 20, 0],
          opacity: 0.3
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path
          d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500 L1000,1000 L0,1000 Z"
          fill="url(#ribbon-gradient)"
        />
        <defs>
          <linearGradient id="ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default AnimationRibbon;
