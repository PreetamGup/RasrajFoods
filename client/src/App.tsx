import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Banquets from './pages/Banquets';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/shared/ScrollToTop';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Cart from './pages/Cart';
import ManageProduct from './pages/admin/ManageProduct';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import UserManage from './pages/admin/UserManage';
import CheckOut from './pages/CheckOut';
import SuccessPayment from './pages/SuccessPayment';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/users/Profile';
import OrderHistory from './pages/users/OrderHistory';
import OrdersManage from './pages/admin/OrdersManage';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <ScrollToTop/>
       
        <Routes>
          <Route path="/" element={<UserLayout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/banquets" element={<Banquets />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path ="/checkout" element={<CheckOut />} />
            <Route path ="/success" element={<SuccessPayment />} />
          </Route>

          <Route path="/user" element={<PrivateRoute><UserLayout /></PrivateRoute>}>
            <Route path="/user" element={<Profile />} />
            <Route path="/user/order-history" element={<OrderHistory />} />
            <Route path="/user/cart" element={<Cart />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path="/admin/manageproducts" element={<ManageProduct />} />
            <Route path="/admin/usermanagement" element={<UserManage />} />
            <Route path="/admin/orders" element={<OrdersManage />} />
          </Route>         
        </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;