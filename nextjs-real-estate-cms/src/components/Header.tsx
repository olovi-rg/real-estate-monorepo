// components/Header.tsx
'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "PROPERTIES", href: "/properties" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href) || (href.startsWith("#") && false); // Hash links handled separately
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isSticky ? "bg-white shadow-lg py-4" : "bg-white/80 py-6 shadow-none"} 
        backdrop-blur-lg border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center font-bold text-2xl text-blue-600">
          <span className="mr-2">🏡</span> RealEstate
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 ml-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ scale: 1.1 }}
                className={`transition-all duration-200 font-medium relative
                  ${active 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                {link.name}
                {/* Active underline indicator */}
                {active && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Get Started Button - Desktop */}
        <Link
          href="/get-started"
          className="hidden md:block ml-8 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold transition hover:bg-blue-700 active:scale-95 shadow-lg"
        >
          Get Started
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 space-y-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2 px-4 rounded-lg font-medium transition
                      ${active 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <Link
                href="/get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-4 rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
