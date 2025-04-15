import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Amaris</h3>
            <p className="text-slate-300 mb-4">
              Your trusted partner for heavy machinery and generators for building, mining, and manufacturing industries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-orange-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-orange-400">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=generators" className="text-slate-300 hover:text-orange-400">Generators</Link></li>
              <li><Link to="/products?category=excavators" className="text-slate-300 hover:text-orange-400">Excavators</Link></li>
              <li><Link to="/products?category=loaders" className="text-slate-300 hover:text-orange-400">Loaders</Link></li>
              <li><Link to="/products?category=cranes" className="text-slate-300 hover:text-orange-400">Cranes</Link></li>
              <li><Link to="/products?category=drilling" className="text-slate-300 hover:text-orange-400">Drilling Equipment</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-orange-400">Home</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-orange-400">About Us</Link></li>
              <li><Link to="/products" className="text-slate-300 hover:text-orange-400">Products</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-orange-400">Contact</Link></li>
              <li><Link to="/quote-request" className="text-slate-300 hover:text-orange-400">Request Quote</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-orange-500" />
                <span className="text-slate-300">123 Industrial Way, Business Park, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-orange-500" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-orange-500" />
                <span className="text-slate-300">info@amaris.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Amaris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}