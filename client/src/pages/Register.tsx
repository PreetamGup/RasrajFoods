import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [address, setAddress] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const navigate = useNavigate();
   

    const handleSendOtp = async() => {

        try {
            if (mobile.length === 10) {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/generateOtp`,{ mobile });
                console.log(response.data.message, response.data.otp);
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
               setIsOtpVerified(true)
               setShowOtpInput(false)
                
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-500">
            <div className="w-full max-w-md rounded-lg shadow-xl bg-white bg-opacity-20 p-8">
                <div className="text-center">
                    <img
                        src='/logos/android-chrome-512x512.png'
                        alt="Food logo"
                        className="w-24 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
                    <p className="text-gray-500 mb-6">Join us and start your journey!</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                        required
                    />

                    <label className="block text-gray-700 mb-2 font-semibold">Mobile Number</label>
                    <input
                        type="text"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                        required
                    />

                    { isOtpVerified &&
                        <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            maxLength={4}
                            value={otp}
                            placeholder="Enter the OTP sent to your number"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            disabled
                        />
                        <button
                            type="button"
                            onClick={handleOtpVerify}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            disabled
                        >
                            Otp Verified
                        </button>
                    </div>
                
                
                    }
                    {!showOtpInput && !isOtpVerified && (
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mb-4"
                        >
                            Send OTP
                        </button>
                    )}

                    {showOtpInput && (
                        <>
                            <label className="block text-gray-700 mb-2 font-semibold">Verify OTP</label>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    maxLength={4}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter the OTP sent to your number"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleOtpVerify}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Verify OTP
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleResend}
                                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 mb-4"
                            >
                                Resend OTP
                            </button>
                        </>
                    )}

                    <label className="block text-gray-700 mb-2 font-semibold">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                        required
                    />

                    <button
                        type="button"
                        onClick={handleRegiter}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
