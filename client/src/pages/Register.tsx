import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { User, Phone, MapPin, ShieldCheck, Send, RefreshCw } from 'lucide-react';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [address, setAddress] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const {error,setError}= useUserContext()
    const navigate = useNavigate();
   

    const handleSendOtp = async() => {

        try {
            if (mobile.length === 10) {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/generateOtp`,{ mobile });
                // console.log(response.data.message, response.data.otp);
                alert(`${response.data.message+'\n'+response.data.otp}`)
                setShowOtpInput(true);
            } else {
                alert('Please enter a valid 10-digit mobile number.');
            }

        } catch (error:any) {
            if(error.response.status === 400){
                alert(`${error.response.data}`);
            }
            else{
                console.log(error.response.data);
            }
        }
    };

    const handleOtpVerify = async() => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/verifyOtp`, { mobile, otp },{withCredentials: true});
            console.log(response);
            if (response.status === 200) {
                alert('Mobile Verified!');
                setError(null)
               setIsOtpVerified(true)
               setShowOtpInput(false)
                
            } 
        } catch (error:any) {
            
            if(error.response.status === 400){
                
                setError(error.response.data)
            }
            else{
                console.log(error.response.data);
            }

        }

        
    };

    const handleResend = () => {
        handleSendOtp();
        alert('OTP resent successfully!');
    };

    const handleRegiter =async()=>{

        try {
            if(isOtpVerified){
                const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/register`,{fullName, mobile, address});
               
                if(response.status === 200){
                    alert("User registration successfully!");
                    navigate("/login")
                    
                }
            }else{
                alert("Verfiy mobile first")
            }
            
        } catch (error:any) {
            if(error.response.status === 400){
                alert(`${error.response.data}`);
            }
            else{
                console.log(error.response.data);
            }
        }
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
              <h1 className="text-3xl font-playfair text-white mb-2">Create Account</h1>
              <p className="text-white/80">Join us and start your culinary journey!</p>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
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

              {/* OTP Verification Section */}
              {!showOtpInput && !isOtpVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send OTP
                </button>
              )}

              {showOtpInput && !isOtpVerified && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verify OTP</label>
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

                  {error && (
                    <p className="text-red-500 text-sm text-center font-medium">{error}</p>
                  )}

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

              {isOtpVerified && (
                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">Mobile number verified successfully!</span>
                </div>
              )}

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="button"
                onClick={handleRegiter}
                className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
              >
                Complete Registration
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary font-semibold hover:text-primary/80"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default RegisterPage;
