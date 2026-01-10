"use client"

import React, { useState } from 'react'
import NavHeader from './NavHeader'
import Navitems from './Navitems'
import { Menu, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <NavHeader />
      
      {/* Desktop Navigation */}
      <div className="hidden lg:block border-t">
        <Navitems />
      </div>

      {/* Mobile Navigation Toggle Bar */}
      <div className="lg:hidden border-t bg-gray-50/50">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full py-3 text-gray-700"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex items-center gap-2">
              <Menu size={20} className="text-primary" />
              <span className="font-semibold text-sm uppercase tracking-wide">Browse Menu</span>
            </div>
            <ChevronDown 
              size={18} 
              className={`text-gray-500 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Content */}
      <div 
        className={`lg:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Navitems />
      </div>
    </header>
  )
}

export default Navbar