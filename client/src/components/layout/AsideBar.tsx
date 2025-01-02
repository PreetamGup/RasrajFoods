import { Link, useNavigate } from 'react-router-dom';
import { adminMenu } from '../../utils/navUserMenu';
import Logo from './Logo';
import { useUserContext } from '../../context/user.context';
import axios from 'axios';
import { LogOut } from 'lucide-react';

const AsideBar = () => {
  const { setUser, setLoggedIn } = useUserContext();
  const  navigate  = useNavigate();
 
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

  return (
    <aside className="container sticky px-4 py-3  w-64 bg-gray-500 bg-opacity-80  font-semibold h-screen">
       <Link to="/" className="flex-shrink-0 ">
          <Logo />
        </Link>
      <nav className='py-5'>
        <ul className='flex flex-col gap-5'>
          {adminMenu.map((item, index) => {
            const Icon = item.icon;
            return (
                <li key={index}>
                <Link to={item.href} className=' flex gap-2 cursor-pointer'><Icon/>{item.label}</Link>
                </li>
            )
            })}
          <li> <button onClick={handleLogout} className='flex gap-2  bg-[#FFA500] rounded-md text-white text-center w-full font-semibold hover:text-white hover:bg-orange-500  px-4 py-2 text-sm transition-colors duration-200'><LogOut/>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default AsideBar;