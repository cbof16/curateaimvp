import React, { useState } from 'react';
import { BrainCircuit, Menu, X, Gavel, Home, Users, Info } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', icon: Home, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'Auctions', icon: Gavel, action: () => scrollToSection('auctions') },
    { name: 'Artists', icon: Users, action: () => scrollToSection('trending-artists') },
    { name: 'About', icon: Info, action: () => scrollToSection('about') }
  ];

  return (
    <header className="bg-black/90 border-b border-red-900/50 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8 text-red-500 animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
              CurateAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="text-gray-300 hover:text-red-500 transition-colors duration-200 flex items-center space-x-1 group"
              >
                <item.icon className="w-4 h-4 group-hover:animate-pulse" />
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-200"></span>
                </span>
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('auctions')}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center space-x-2"
            >
              <Gavel className="w-4 h-4" />
              <span>Start Bidding</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-red-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-900/50">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-200 flex items-center space-x-2 px-2 py-1"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('auctions')}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Gavel className="w-4 h-4" />
                <span>Start Bidding</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;