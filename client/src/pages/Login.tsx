import  { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import axios from 'axios';



const LoginPage = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();
    const {  setLoggedIn } = useUserContext();

    const handleLoginClick = async() => {
      
        if (mobile.length === 10) {

            try {
                
                const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/login`, { mobile },{withCredentials:true});
                console.log(response.data.message, response.data.otp);          
                localStorage.setItem('token',response.data.token);
                setShowOtpInput(true);

            } catch (error:any) {
                if(error.response.status === 400){
                    alert(`${error.response.data}`);
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
                window.location.href = '/menu';
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

    const handleResend=()=>{
        handleLoginClick();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-red-500">
            <div className="w-full max-w-md  rounded-lg shadow-xl bg-white bg-opacity-20 p-8">
                <div className="text-center">
                    <img
                        src='/logos/android-chrome-512x512.png'
                        alt="Food logo"
                        className="w-24 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-500 mb-6">Login to explore our delicious menu</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    {!showOtpInput ? (
                        <>
                            <label className="block text-gray-700 mb-2 font-semibold">Mobile Number</label>
                            <input
                                type="text"
                                maxLength={10}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter your mobile number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                type="button"
                                onClick={handleLoginClick}
                                className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={()=>navigate("/register")}
                                className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            >
                                Register
                            </button>


                        </>
                    ) : (
                        <>
                            <label className="block text-gray-700 font-semibold mb-2">Enter OTP</label>
                            <input
                                type="text"
                                maxLength={4}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter the OTP sent to your number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                type="button"
                                onClick={handleOtpVerify}
                                className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            >
                                Verify OTP
                            </button>

                            <button
                                type="button"
                                onClick={handleResend}
                                className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            >
                               Resend
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
