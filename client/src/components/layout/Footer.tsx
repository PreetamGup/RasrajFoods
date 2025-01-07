import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Footer() {

  const location = useLocation();
  

  if (["/menu", "/cart","/checkout","/login","/register"].includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-playfair text-secondary mb-4">Rasraj Foods</h2>
            <p className="text-gray-700 text-sm max-w-sm leading-relaxed">
              Indulge in the finest sweets, snacks, and cakes handcrafted with love and tradition. 
              Rasraj Foods is dedicated to bringing smiles to every celebration with our irresistible delicacies.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-6 mt-6 md:mt-0">
            <a
              href="https://www.instagram.com/rasrajfoods"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/rasrajfoods"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/rasrajfoods/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/menu" className="hover:text-primary">Menu</a></li>
              <li><a href="/about" className="hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Address: 123 Sweet Street, Foodie Town, India</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: contact@rasrajfoods.com</li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Operating Hours</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
              <li>Saturday: 10:00 AM - 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Rasraj Foods. All Rights Reserved.
          </p>
          <ul className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-600">
            <li><a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
