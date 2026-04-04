"use client";

import {
  Home01Icon,
  Search01Icon,
  Menu01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";
import { NavLink, useLocation } from "react-router-dom";

const MAIN_NAV = [
  { icon: Home01Icon, name: "home", path: "/" },
  { icon: Menu01Icon, name: "menu", path: "/menu" },
  { icon: Search01Icon, name: "search", path: "/track" },
  { icon: UserCircleIcon, name: "account", path: "/account" },
];

// Magnet effect for "motion sensors" feel
const Magnet = ({ children }: { children: React.ReactNode }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      // Multiplier reduced for subtle move
      mouseX.set((e.clientX - centerX) * 0.4);
      mouseY.set((e.clientY - centerY) * 0.4);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

export function BottomMenu() {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-auto">
        {/* Toolbar */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1.5 bg-white/80 backdrop-blur-2xl border border-amber-100 rounded-[28px] p-2 shadow-xl"
        >
          {MAIN_NAV.map(({ icon: Icon, name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Magnet key={name}>
                <NavLink
                  to={path}
                  className={cn(
                    "relative p-3.5 rounded-full transition-all duration-300 flex items-center justify-center",
                    isActive 
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200" 
                      : "text-stone-400 hover:bg-amber-50 hover:text-amber-500"
                  )}
                >
                  <HugeiconsIcon
                    icon={Icon}
                    size={22}
                    className="relative z-20"
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-transparent rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </NavLink>
              </Magnet>
            );
          })}
        </motion.div>
    </div>
  );
}
