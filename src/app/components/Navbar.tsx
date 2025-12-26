"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2 } from "lucide-react";
import { getStaticContent } from "@/content";
import type { Locale } from "@/types/locale";

// Flag Components
const UzbekFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    aria-hidden="true" 
    role="img" 
    className={className}
    width="1.34em" 
    height="1em" 
    viewBox="0 0 32 24"
  >
    <g fill="none">
      <path fill="#14dc5a" fillRule="evenodd" d="M0 16h32v8H0z" clipRule="evenodd"></path>
      <path fill="#0099b5" fillRule="evenodd" d="M0 0h32v10H0z" clipRule="evenodd"></path>
      <path fill="#f7fcff" stroke="#c51918" d="M-2 9.5h-.5v7h37v-7z"></path>
      <path fill="#f7fcff" fillRule="evenodd" d="m14.541 3.006l-.673.374l.192-.76l-.644-.558h.842l.282-.72l.331.72h.718l-.564.558l.271.76zm-3.608 2.291l.673-.374l.755.374l-.27-.76l.563-.558h-.718l-.33-.72l-.283.72h-.842l.644.558zM8.428 6.961l-.673.374l.192-.76l-.645-.559h.842l.283-.719l.33.72h.719l-.564.558l.27.76zm3.178 0l-.673.374l.192-.76l-.644-.559h.842l.282-.719l.331.72h.718l-.564.558l.271.76zm2.98 0l-.673.374l.192-.76l-.644-.559h.842l.282-.719l.331.72h.718l-.564.558l.271.76zm-.673-1.664l.673-.374l.755.374l-.27-.76l.563-.558h-.718l-.33-.72l-.283.72h-.842l.644.558zm3 2.038l.672-.374l.756.374l-.271-.76l.564-.559h-.718l-.332-.719l-.282.72h-.842l.645.558zm.672-2.412l-.673.374l.193-.76l-.645-.558h.842l.282-.72l.332.72h.718l-.564.558l.27.76zm-.717-1.543l.673-.374l.755.374l-.271-.76l.564-.558h-.718l-.331-.72l-.283.72h-.842l.645.558zm3.748 3.581l-.673.374l.192-.76l-.645-.559h.842l.283-.719l.33.72h.719l-.564.558l.27.76zm-.673-1.664l.673-.374l.755.374l-.271-.76l.564-.558h-.718l-.331-.72l-.283.72h-.842l.645.558zm.628-2.29l-.673.373l.192-.76l-.645-.558h.842l.283-.72l.331.72h.718l-.564.558l.271.76zM5.885 8.24s-2.416-.656-2.37-3.08S6 2.11 6 2.11c-.997-.377-3.945.13-4 3.028c-.054 2.9 2.956 3.47 3.885 3.104" clipRule="evenodd"></path>
    </g>
  </svg>
);

const RussianFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    aria-hidden="true" 
    role="img" 
    className={className}
    width="1.34em" 
    height="1em" 
    viewBox="0 0 32 24"
  >
    <g fill="none">
      <path fill="#3d58db" fillRule="evenodd" d="M0 0v24h32V0z" clipRule="evenodd"></path>
      <mask id="iconifyReact16" width="32" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}>
        <path fill="#fff" fillRule="evenodd" d="M0 0v24h32V0z" clipRule="evenodd"></path>
      </mask>
      <g fillRule="evenodd" clipRule="evenodd" mask="url(#iconifyReact16)">
        <path fill="#f7fcff" d="M0 0v8h32V0z"></path>
        <path fill="#c51918" d="M0 16v8h32v-8z"></path>
      </g>
    </g>
  </svg>
);

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const languages = [
    { code: "uz", path: "uz", name: "Uzbek", flag: <UzbekFlag className="w-5 h-4" /> },
    { code: "uz-cyrl", path: "kr", name: "Ўзбек", flag: <UzbekFlag className="w-5 h-4" /> },
    { code: "ru", path: "ru", name: "Русский", flag: <RussianFlag className="w-5 h-4" /> },
  ];

  // Get current language from pathname
  const getCurrentLanguage = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const locale = pathSegments[0];
    
    if (locale === 'kr') return languages.find(l => l.path === 'kr') || languages[1];
    if (locale === 'ru') return languages.find(l => l.path === 'ru') || languages[2];
    if (locale === 'uz') return languages.find(l => l.path === 'uz') || languages[0];
    
    return languages[0]; // default to uz (no path = /)
  };

  const currentLanguage = getCurrentLanguage();
  // Use path instead of code, as path directly maps to locale ('uz', 'kr', 'ru')
  const locale: Locale = currentLanguage.path as Locale;
  const content = getStaticContent(locale);

  const navLinks = [
    { name: content.navbar.about, path: "about" },
    { name: content.navbar.clients, path: "clients" },
    { name: content.navbar.team, path: "team" },
  ];

  // Build full path with locale
  const getNavPath = (path: string) => {
    const basePath = locale === 'uz' ? '' : `/${locale}`;
    return `${basePath}/${path}`;
  };

  // Handle navigation to path
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const fullPath = getNavPath(path);
    router.push(fullPath);
  };

  // Check if link is active based on current pathname
  const isActiveLink = (path: string) => {
    const fullPath = getNavPath(path);
    return pathname === fullPath || pathname.endsWith(`/${path}`);
  };

  const handleLanguageChange = (lang: typeof languages[0]) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Remove existing locale if present
    if (['uz', 'kr', 'ru'].includes(pathSegments[0])) {
      pathSegments.shift();
    }
    
    // Build new path
    // Default (uz) - no path prefix, others have /kr or /ru
    const basePath = pathSegments.length > 0 ? '/' + pathSegments.join('/') : '';
    const newPath = lang.path === 'uz' 
      ? basePath || '/'
      : `/${lang.path}${basePath}`;
    
    router.push(newPath);
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    const handleNavbarScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleNavbarScroll);
    return () => window.removeEventListener("scroll", handleNavbarScroll);
  }, []);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageMenuOpen && !target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLanguageMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: (isScrolled || isMobileMenuOpen) ? "rgba(15, 23, 42, 0.5)" : "transparent", // Visible on scroll or mobile menu open, transparent by default
        backdropFilter: (isScrolled || isMobileMenuOpen) ? "blur(12px)" : "none", // Blur on scroll or mobile menu open
        boxShadow: "none" // No shadow
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href={currentLanguage.path === 'uz' ? '/' : `/${currentLanguage.path}`}
            className="flex items-center gap-2 text-2xl font-bold flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Building2 
              className="w-6 h-6 text-white"
            />
            <span className="text-white">
              Bazaar Admin
            </span>
          </motion.a>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link, index) => {
              const isActive = isActiveLink(link.path);
              const fullPath = getNavPath(link.path);
              return (
                <motion.a
                  key={link.name}
                  href={fullPath}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 hover:text-blue-300"
                      : isScrolled
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-white hover:text-blue-200"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile/iPad Navigation Links - Show in navbar, clicking opens sidebar */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.path);
              return (
                <button
                  key={link.name}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : isScrolled
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-white"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
          
          {/* Language Selector - Right (Desktop) */}
          <div className="hidden lg:block relative language-selector flex-shrink-0">
              <motion.button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  width="25" 
                  height="24" 
                  viewBox="0 0 25 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <circle cx="12.5518" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"></circle>
                  <ellipse cx="12.5518" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5"></ellipse>
                  <path d="M2.55176 12H22.5518" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-semibold">{currentLanguage.name}</span>
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden"
                    style={{
                      backgroundColor: "rgba(15, 23, 42, 0.5)",
                      backdropFilter: "blur(12px)",
                      zIndex: 9999,
                      isolation: "isolate",
                    }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors ${
                          currentLanguage.code === lang.code
                            ? "bg-white/20 text-white"
                            : "text-white/90 hover:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center justify-center rounded-sm overflow-hidden" style={{ borderRadius: '4px', width: '20px', height: '15px' }}>
                          {lang.flag}
                        </span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
          </div>

          {/* Mobile/iPad: Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile/iPad Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 h-screen w-full z-50 lg:hidden shadow-2xl"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.98)",
                backdropFilter: "blur(12px)"
              }}
            >
              <div className="flex flex-col h-screen">
                {/* Header: Logo and Close Button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                  <motion.a
                    href={currentLanguage.path === 'uz' ? '/' : `/${currentLanguage.path}`}
                    className="flex items-center gap-2 text-2xl font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                    <span className="text-white">Bazaar Admin</span>
                  </motion.a>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Nav Links - Centered */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 px-6 overflow-y-auto">
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.path);
                    const fullPath = getNavPath(link.path);
                    return (
                      <motion.a
                        key={link.name}
                        href={fullPath}
                        onClick={(e) => {
                          handleNavClick(e, link.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block py-3 text-lg font-semibold transition-colors cursor-pointer text-center w-full ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-white hover:text-blue-400"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Languages - Bottom Row */}
                <div className="px-6 py-6 border-t border-white/10 flex-shrink-0">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          currentLanguage.code === lang.code
                            ? "bg-white/20 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center justify-center rounded-sm overflow-hidden" style={{ borderRadius: '4px', width: '20px', height: '15px' }}>
                          {lang.flag}
                        </span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

