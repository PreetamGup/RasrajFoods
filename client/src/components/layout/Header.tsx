import React,  { useEffect, useState } from 'react';
import {  ShoppingCart, User, Menu, LogIn, LogOut} from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import {useUserContext} from '../../context/user.context.js';
import { adminMenu, userMenu, MenuItem } from '../../utils/navUserMenu.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, SetMenu] = useState<MenuItem[]>([]);
  const {user, cart, loggedIn,setLoggedIn, setUser} = useUserContext();
  const navigate = useNavigate()


  const handleLogout = async()=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/logout`,{},{withCredentials: true});

      if(response.status === 200){
        localStorage.removeItem('token');
        setUser({ fullName: '', mobile: 0, address: '', role: '', _id: '', orderHistory: [] })
        setLoggedIn(false);
        navigate('/login');
        alert('Logged Out Successfully!');
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    user.role==='User'? SetMenu([...userMenu]) : SetMenu([...adminMenu]);

  },[user])


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="text-secondary hover:text-primary transition-colors duration-200">
              Menu
            </Link>
            <Link to="/banquets" className="text-secondary hover:text-primary transition-colors duration-200">
              Banquets
            </Link>
            <Link to="/about" className="text-secondary hover:text-primary transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-secondary hover:text-primary transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* User and Shopping Cart (Visible in both Desktop and Mobile Views) */}
          <div className="flex items-center space-x-6">
            <div className="relative userIcon text-gray-600 hover:text-primary transition-colors duration-200" aria-label="User Account">
              <User className="w-6 h-6" />
              
             
              <div className='userMenu absolute shadow-xl -left-12 md:-left-20 lg:-right-12 min-w-48 w-auto h-auto text-center bg-white border-1 rounded-md p-2'>
                {!loggedIn && <button className="flex gap-2 bg-[#FFA500] mt-5 mb-2 mx-auto text-white font-semibold px-4 py-1 rounded-md" onClick={()=>navigate("/login")}><LogIn/>Login</button>}
                
                {loggedIn && 
                  <ul className='text-left w-40'>
                    {

                        menu.map((menuItem, index) => {
                        const Icon = menuItem.icon
                        
                        return (<li key={index}>
                          <Link to={menuItem.href} className={`flex gap-2 ${menuItem.label==='Logout'? 'bg-[#FFA500] rounded-md text-white text-center font-semibold hover:bg-orange-500 hover:text-white':''} px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary transition-colors duration-200`}>
                           <Icon />{menuItem.label}
                          </Link>
                        </li>
                      )})
                    }
                    <li> <button onClick={handleLogout} className='flex gap-2  bg-[#FFA500] rounded-md text-white text-center w-full font-semibold hover:text-white hover:bg-orange-500  px-4 py-2 text-sm transition-colors duration-200'><LogOut/>Logout</button></li>
                  </ul>
                }
              
              </div>
            </div>
            <button
              className="text-gray-600 hover:text-primary transition-colors duration-200 relative"
              aria-label="Shopping Cart"
              onClick={()=>navigate("/cart")}
            >
              <ShoppingCart  className="w-6 h-6" />
              {/* Cart Badge */}
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length >0 ? cart.length : ''}
              </span>
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary transition-colors duration-200 md:hidden"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 right-0 w-3/4 z-20 max-w-sm h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 hover:text-primary transition-colors duration-200"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/menu"
            className="text-secondary hover:text-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/banquets"
            className="text-secondary hover:text-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Banquets
          </Link>
          <Link
            to="/about"
            className="text-secondary hover:text-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-secondary hover:text-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
        />
      )}
    </header>
  );
}
