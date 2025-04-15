import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteStore } from "@/lib/store";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const quoteItems = useQuoteStore((state) => state.items);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-500">Amaris</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-orange-400 transition-colors">Products</Link>
          <Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/quote-request" className="relative">
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Quote Cart
              {quoteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {quoteItems.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-2">
          <nav className="flex flex-col space-y-3 py-3">
            <Link to="/" className="hover:text-orange-400 transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="hover:text-orange-400 transition-colors" onClick={toggleMenu}>Products</Link>
            <Link to="/about" className="hover:text-orange-400 transition-colors" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" className="hover:text-orange-400 transition-colors" onClick={toggleMenu}>Contact</Link>
            <Link to="/quote-request" className="flex items-center" onClick={toggleMenu}>
              <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Quote Cart ({quoteItems.length})
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}