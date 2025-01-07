import  { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import axios from 'axios';
import { Phone, RefreshCw, ShieldCheck } from 'lucide-react';



const LoginPage = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();
    const {  setLoggedIn } = useUserContext();
    const {error, setError} = useUserContext();

    const handleLoginClick = async() => {
      
        if (mobile.length === 10) {

            try {
                
                const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/login`, { mobile },{withCredentials:true});
                alert(`${response.data.message+ "\n"+ response.data.otp}`);          
                localStorage.setItem('token',response.data.token);
                setError(null);
                setShowOtpInput(true);

            } catch (error:any) {
                if(error.response.status === 400){
                    setError(error.response.data);
                }
                else{
                    console.log(error.response.data);
                }
            }

        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    };

    const handleOtpVerify = async() => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/verifyOtp`, { mobile, otp },{withCredentials:true});
           
            if (response.status === 200) {
                alert('Login Successful!');
                setLoggedIn(true);
                setError(null)
                window.location.href = '/menu';
            } 
        } catch (error:any) {
            
            if(error.response.status === 400){
               
                setError(error.response.data);
            }
            else{
                console.log(error.response.data);
            }
        }   
    };

    const handleResend=()=>{
        handleLoginClick();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-100">
  <div className="w-full max-w-xl p-8">
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-primary to-primary/80">
        <div className="text-center">
          <img
            src="/logos/android-chrome-512x512.png"
            alt="Logo"
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-white p-2"
          />
          <h1 className="text-3xl font-playfair text-white mb-2">Welcome Back!</h1>
          <p className="text-white/80">Login to explore our delicious menu</p>
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Mobile Number Field */}
          {!showOtpInput && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* OTP Verification Section */}
          {showOtpInput && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleOtpVerify}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>


              <button
                type="button"
                onClick={handleResend}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Resend OTP
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {!showOtpInput && (
            <button
              type="button"
              onClick={handleLoginClick}
              className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
            >
              Login
            </button>
          )}

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-primary font-semibold hover:text-primary/80"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>

    );
};

export default LoginPage;
